"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Helper: lat/lon to 3D position on sphere
function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// City nodes on the globe (major cyber hubs)
const CITIES = [
  { name: "New York", lat: 40.7, lon: -74.0 },
  { name: "London", lat: 51.5, lon: -0.12 },
  { name: "Tokyo", lat: 35.7, lon: 139.7 },
  { name: "Sydney", lat: -33.9, lon: 151.2 },
  { name: "Moscow", lat: 55.75, lon: 37.6 },
  { name: "Beijing", lat: 39.9, lon: 116.4 },
  { name: "São Paulo", lat: -23.5, lon: -46.6 },
  { name: "Berlin", lat: 52.5, lon: 13.4 },
  { name: "Dubai", lat: 25.2, lon: 55.3 },
  { name: "Mumbai", lat: 19.1, lon: 72.9 },
  { name: "Seoul", lat: 37.6, lon: 127.0 },
  { name: "Tunis", lat: 36.8, lon: 10.2 },
  { name: "Lagos", lat: 6.5, lon: 3.4 },
  { name: "Singapore", lat: 1.35, lon: 103.8 },
  { name: "Toronto", lat: 43.7, lon: -79.4 },
  { name: "Johannesburg", lat: -26.2, lon: 28.0 },
];

// Generate attack routes between random cities
function generateAttacks(count: number) {
  const attacks = [];
  for (let i = 0; i < count; i++) {
    const from = CITIES[Math.floor(Math.random() * CITIES.length)];
    let to = CITIES[Math.floor(Math.random() * CITIES.length)];
    while (to.name === from.name) {
      to = CITIES[Math.floor(Math.random() * CITIES.length)];
    }
    attacks.push({
      from,
      to,
      speed: 0.3 + Math.random() * 0.7,
      offset: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? "#ff0040" : "#00ff41",
    });
  }
  return attacks;
}

// Animated arc between two points with a traveling pulse
function AttackArc({
  from,
  to,
  speed,
  offset,
  color,
  globeRadius,
}: {
  from: { lat: number; lon: number };
  to: { lat: number; lon: number };
  speed: number;
  offset: number;
  color: string;
  globeRadius: number;
}) {
  const pulseRef = useRef<THREE.Mesh>(null);

  const { curve, points } = useMemo(() => {
    const start = latLonToVec3(from.lat, from.lon, globeRadius);
    const end = latLonToVec3(to.lat, to.lon, globeRadius);
    const mid = start.clone().add(end).multiplyScalar(0.5);
    const dist = start.distanceTo(end);
    mid.normalize().multiplyScalar(globeRadius + dist * 0.4);
    const c = new THREE.QuadraticBezierCurve3(start, mid, end);
    return { curve: c, points: c.getPoints(64) };
  }, [from, to, globeRadius]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  const lineObj = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.2 });
    const line = new THREE.Line(lineGeometry, mat);
    return line;
  }, [lineGeometry, color]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // Pulse travels along the arc
    const progress = ((t * speed + offset) % 2) / 2; // 0 to 1 loop
    if (pulseRef.current) {
      const pos = curve.getPoint(progress);
      pulseRef.current.position.copy(pos);
      // Pulse glow effect
      const scale = 0.8 + Math.sin(t * 8) * 0.4;
      pulseRef.current.scale.setScalar(scale);
    }
    // Fade arc
    const mat = lineObj.material as THREE.LineBasicMaterial;
    mat.opacity = 0.15 + Math.sin(t * 2 + offset) * 0.1;
  });

  return (
    <group>
      {/* Arc line */}
      <primitive object={lineObj} />
      {/* Traveling pulse */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

// Pulsing city node
function CityNode({
  lat,
  lon,
  globeRadius,
}: {
  lat: number;
  lon: number;
  globeRadius: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLonToVec3(lat, lon, globeRadius), [lat, lon, globeRadius]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      const s = 1 + Math.sin(t * 3 + lat) * 0.3;
      ref.current.scale.setScalar(s);
    }
    if (ringRef.current) {
      const s = 1 + Math.sin(t * 2 + lon) * 0.5;
      ringRef.current.scale.setScalar(s);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.3 - Math.sin(t * 2 + lon) * 0.2;
    }
  });

  return (
    <group position={pos}>
      {/* Core dot */}
      <mesh ref={ref}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshBasicMaterial color="#00ff41" />
      </mesh>
      {/* Pulse ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.08, 16]} />
        <meshBasicMaterial
          color="#00ff41"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// Floating data particles around the globe
function DataParticles({ count, globeRadius }: { count: number; globeRadius: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = globeRadius + 0.1 + Math.random() * 0.3;
      pos[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = r * Math.cos(phi);
      vel[i * 3] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    return { positions: pos, velocities: vel };
  }, [count, globeRadius]);

  useFrame(() => {
    if (!ref.current) return;
    const posArr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3] += velocities[i * 3];
      posArr[i * 3 + 1] += velocities[i * 3 + 1];
      posArr[i * 3 + 2] += velocities[i * 3 + 2];
      // Keep particles near the globe surface
      const x = posArr[i * 3], y = posArr[i * 3 + 1], z = posArr[i * 3 + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist > globeRadius + 0.5 || dist < globeRadius) {
        velocities[i * 3] *= -1;
        velocities[i * 3 + 1] *= -1;
        velocities[i * 3 + 2] *= -1;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00d4ff" size={0.02} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function CyberGlobe() {
  const wireframeRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const globeRadius = 2;

  const attacks = useMemo(() => generateAttacks(12), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = t * 0.08;
      wireframeRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = -t * 0.04;
    }
  });

  return (
    <group>
      {/* Soft atmospheric shell for a clean premium look */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[globeRadius + 0.02, 48, 48]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Wireframe globe */}
      <mesh ref={wireframeRef}>
        <sphereGeometry args={[globeRadius, 36, 36]} />
        <meshStandardMaterial color="#00ff41" wireframe transparent opacity={0.22} />
      </mesh>

      {/* Rotating group: cities, attacks, particles */}
      <group ref={groupRef}>
        {/* City nodes */}
        {CITIES.map((city) => (
          <CityNode
            key={city.name}
            lat={city.lat}
            lon={city.lon}
            globeRadius={globeRadius}
          />
        ))}

        {/* Attack arcs with traveling pulses */}
        {attacks.map((atk, i) => (
          <AttackArc
            key={i}
            from={atk.from}
            to={atk.to}
            speed={atk.speed}
            offset={atk.offset}
            color={atk.color}
            globeRadius={globeRadius}
          />
        ))}

        {/* Floating data particles */}
        <DataParticles count={150} globeRadius={globeRadius} />
      </group>

      {/* Outer rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.45, 0.007, 20, 160]} />
        <meshStandardMaterial color="#00ff41" transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.7, 0.006, 20, 160]} />
        <meshStandardMaterial color="#00d4ff" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

export default function CyberGlobe3D() {
  return (
    <div className="w-full h-[320px] sm:h-[420px] relative bg-transparent">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.42} />
        <pointLight position={[8, 10, 12]} color="#00ff41" intensity={0.42} />
        <pointLight position={[-8, -8, -10]} color="#00d4ff" intensity={0.25} />
        <CyberGlobe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.36}
        />
      </Canvas>
    </div>
  );
}
