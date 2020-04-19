import { IRoom } from './../../types';
import { useEffect, useState, useCallback } from 'react';
import { roomDocRef, playbackStateDocRef } from '../../firestore-refs';
import useRoomId from '../../hooks/use-room-id';
import { getCurrentUserUID } from '../../utils';

export default function ({
  // roomId,
  onCurrentTimeChange,
  onStateChange,
}: {
  // roomId: string;
  onCurrentTimeChange: (currentTime: number) => void;
  onStateChange: (isPlaying: boolean) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const roomId = useRoomId();
  const playbackStateRef = playbackStateDocRef(roomId);
  const [room, setRoom] = useState<IRoom>();

  useEffect(() => {
    return roomDocRef(roomId).onSnapshot((roomSnapshot) => {
      setRoom(roomSnapshot.data());
    });
  }, [roomId]);

  const handleStateChange = useCallback((isPlaying: boolean) => {
    setIsPlaying(isPlaying);
  }, []);

  const handleCurrentTimeChange = useCallback((currentTime: number) => {
    setCurrentTime(currentTime);
  }, []);

  useEffect(() => {
    return playbackStateRef.onSnapshot((playbackStateSnapshot) => {
      if (room?.remoteOwner === getCurrentUserUID()) {
        return;
      }

      const playbackState = playbackStateSnapshot.data();

      onCurrentTimeChange(playbackState?.currentTime ?? 0);
      onStateChange(playbackState?.isPlaying ?? false);
    });
  }, [playbackStateRef, room, onCurrentTimeChange, onStateChange]);

  useEffect(() => {
    if (!room) {
      return;
    }

    if (room.remoteOwner !== getCurrentUserUID()) {
      return;
    }
    playbackStateRef.set({ isPlaying, currentTime });
  }, [playbackStateRef, room, isPlaying, currentTime]);

  return {
    handleStateChange,
    handleCurrentTimeChange,
  };
}
