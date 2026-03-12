"use client";

import { useEffect, useRef, useCallback } from "react";

// YouTube video ID extracted from: https://youtu.be/PyKz15V80S0
const YOUTUBE_VIDEO_ID = "PyKz15V80S0";

interface BackgroundMusicProps {
  enabled: boolean;
}

interface YouTubePlayer {
  destroy: () => void;
  pauseVideo: () => void;
  playVideo: () => void;
  setVolume: (volume: number) => void;
}

interface YouTubeStateChangeEvent {
  data: number;
}

interface YouTubePlayerConstructor {
  new (
    elementId: string,
    config: {
      videoId: string;
      playerVars: Record<string, number | string>;
      events: {
        onReady: () => void;
        onStateChange: (event: YouTubeStateChangeEvent) => void;
      };
    }
  ): YouTubePlayer;
}

interface YouTubeNamespace {
  Player: YouTubePlayerConstructor;
  PlayerState: {
    ENDED: number;
  };
}

declare global {
  interface Window {
    YT: YouTubeNamespace;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function BackgroundMusic({ enabled }: BackgroundMusicProps) {
  const playerRef = useRef<YouTubePlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(false);

  const initPlayer = useCallback(() => {
    if (!containerRef.current || playerRef.current) return;

    playerRef.current = new window.YT.Player("yt-bg-music", {
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 1,
        loop: 1,
        playlist: YOUTUBE_VIDEO_ID, // required for loop to work
        controls: 0,
        disablekb: 1,
        fs: 0,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
      },
      events: {
        onReady: () => {
          readyRef.current = true;
          if (playerRef.current) {
            playerRef.current.setVolume(30);
            if (enabled) {
              playerRef.current.playVideo();
            }
          }
        },
        onStateChange: (event: YouTubeStateChangeEvent) => {
          // If video ends, replay (backup for loop)
          if (event.data === window.YT.PlayerState.ENDED) {
            playerRef.current?.playVideo();
          }
        },
      },
    });
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScript = document.getElementsByTagName("script")[0];
    firstScript.parentNode?.insertBefore(tag, firstScript);

    window.onYouTubeIframeAPIReady = initPlayer;

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore
        }
        playerRef.current = null;
      }
    };
  }, [initPlayer]);

  // Toggle play/pause based on enabled prop
  useEffect(() => {
    if (!readyRef.current || !playerRef.current) return;

    try {
      if (enabled) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    } catch {
      // player not ready yet
    }
  }, [enabled]);

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-0 h-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div id="yt-bg-music" />
    </div>
  );
}
