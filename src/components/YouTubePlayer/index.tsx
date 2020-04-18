import React, { useEffect, useState } from 'react';

let youtubeIframeAPIReady = false;

(window as any).onPlayerReady = (e: any) => {
  console.log('youtube ready');
};

(window as any).onYouTubeIframeAPIReady = (e: any) => {
  console.log('sss');
  youtubeIframeAPIReady = true;
};

const videoWidth = 640;
const videoHeight = (videoWidth * 9) / 16;

export default ({ videoId }: { videoId?: string }) => {
  const [isPlayerReady, setIsPlayerReady] = useState(youtubeIframeAPIReady);
  const [player, setPlayer] = useState<YT.Player>();

  useEffect(() => {
    if (!youtubeIframeAPIReady) {
      (window as any).onYouTubeIframeAPIReady = (e: any) => {
        setIsPlayerReady(true);
      };
    } else {
      setIsPlayerReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isPlayerReady) {
      return;
    }

    if (!videoId) {
      return;
    }

    let player = new YT.Player('player', {
      height: videoHeight,
      width: videoWidth,
      videoId: videoId,
      playerVars: {
        fs: 0,
      },
      events: {
        onReady: (window as any).onPlayerReady,
        // onStateChange: onPlayerStateChange,
      },
    });

    setPlayer(player);
  }, [isPlayerReady, videoId]);

  if (!isPlayerReady) {
    return null;
  }

  return <div id="player"></div>;
};
