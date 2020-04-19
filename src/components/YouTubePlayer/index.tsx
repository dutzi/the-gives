import React, {
  useEffect,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { isMobile } from '../../utils';

let youtubeIframeAPIReady = false;

(window as any).onPlayerReady = (e: any) => {
  console.log('youtube ready');
};

(window as any).onYouTubeIframeAPIReady = (e: any) => {
  console.log('sss');
  youtubeIframeAPIReady = true;
};

const YouTubePlayer = (
  {
    videoId,
    onStateChange,
    onCurrentTimeChange,
    width,
    height,
  }: {
    videoId?: string;
    onStateChange: (playing: boolean) => void;
    onCurrentTimeChange: (currentTime: number) => void;
    width: number;
    height: number;
  },
  ref: any
) => {
  const [isPlayerReady, setIsPlayerReady] = useState(youtubeIframeAPIReady);
  const [player, setPlayer] = useState<YT.Player>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useImperativeHandle(ref, () => ({
    setState: (isPlaying: boolean) => {
      if (!player?.playVideo) {
        return;
      }

      if (isPlaying) {
        player?.playVideo();
      } else {
        player?.pauseVideo();
      }
    },
    setCurrentTime: (currentTime: number) => {
      if (!player?.seekTo) {
        return;
      }

      if (Math.abs(player.getCurrentTime() - currentTime) < 1) {
        return;
      }

      player.seekTo(currentTime, true);
    },
  }));

  useEffect(() => {
    if (!youtubeIframeAPIReady) {
      (window as any).onYouTubeIframeAPIReady = (e: any) => {
        setIsPlayerReady(true);
      };
    } else {
      setIsPlayerReady(true);
    }
  }, []);

  const registerListeners = useCallback((player: YT.Player) => {
    if (!player) {
      throw new Error('player missing');
    }

    console.log('reg listeners');

    player.addEventListener('onStateChange', (e) => {
      setIsPlaying(player.getPlayerState() === 1 /*YT.PlayerState.PLAYING*/);
    });

    setInterval(() => {
      if (typeof player.getCurrentTime === 'function') {
        // if (player.getCurrentTime() === currentTime) {
        //   return;
        // }

        setCurrentTime(player.getCurrentTime());
      }
    }, 1000);
  }, []);

  useEffect(() => {
    onStateChange(isPlaying);
  }, [isPlaying, onStateChange]);

  useEffect(() => {
    onCurrentTimeChange(currentTime);
  }, [currentTime, onCurrentTimeChange]);

  useEffect(() => {
    if (!isPlayerReady) {
      return;
    }

    if (!videoId) {
      return;
    }

    if (player) {
      return;
    }

    let newPlayer = new YT.Player('player', {
      height,
      width,
      videoId: videoId,
      playerVars: {
        fs: 0,
        playsinline: 1,
      },
      events: {
        onReady: (window as any).onPlayerReady,
        // onStateChange: onPlayerStateChange,
      },
    });

    setPlayer(newPlayer);

    registerListeners(newPlayer);
  }, [isPlayerReady, videoId, registerListeners, width, height, player]);

  useEffect(() => {
    player?.setSize(width, height);
  }, [width, height, player]);

  if (!isPlayerReady) {
    return null;
  }

  return <div id="player"></div>;
};

export default forwardRef(YouTubePlayer);
