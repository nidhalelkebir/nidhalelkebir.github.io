"use client";

import { useRef, useCallback } from "react";

// Simple sound manager using Web Audio API for lightweight click/type sounds
const audioContext =
  typeof window !== "undefined" ? new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)() : null;

function playBeep(frequency: number, duration: number, volume: number) {
  if (!audioContext) return;
  try {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = frequency;
    oscillator.type = "sine";
    gainNode.gain.value = volume;
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch {
    // Silently fail if audio context isn't available
  }
}

export function useSoundEffects(enabled: boolean) {
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const playHover = useCallback(() => {
    if (!enabledRef.current) return;
    playBeep(800, 0.05, 0.03);
  }, []);

  const playClick = useCallback(() => {
    if (!enabledRef.current) return;
    playBeep(600, 0.1, 0.05);
  }, []);

  const playType = useCallback(() => {
    if (!enabledRef.current) return;
    playBeep(1200, 0.03, 0.02);
  }, []);

  const playSuccess = useCallback(() => {
    if (!enabledRef.current) return;
    playBeep(523, 0.15, 0.04);
    setTimeout(() => playBeep(659, 0.15, 0.04), 150);
    setTimeout(() => playBeep(784, 0.2, 0.04), 300);
  }, []);

  return { playHover, playClick, playType, playSuccess };
}
