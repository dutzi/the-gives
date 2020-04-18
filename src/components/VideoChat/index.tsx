import React, { useEffect, useState, useCallback, useRef } from 'react';
import styles from './index.module.scss';
import { IRoom, IRoomParams } from '../../types';
import { useRouteMatch } from 'react-router-dom';
import { roomDocRef } from '../../firestore-refs';
import { getCurrentUserUID } from '../../utils';
import useRoomId from '../../hooks/use-room-id';

const configuration = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

export default ({ room }: { room?: IRoom }) => {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [hasInitialized, setHasInitialized] = useState(false);
  const roomId = useRoomId();

  const registerPeerConnectionListeners = useCallback(
    (peerConnection) => {
      peerConnection.addEventListener('icegatheringstatechange', () => {
        console.log(
          `ICE gathering state changed: ${peerConnection.iceGatheringState}`
        );
      });

      peerConnection.addEventListener('connectionstatechange', () => {
        console.log(
          `Connection state change: ${peerConnection.connectionState}`
        );

        if (peerConnection.connectionState === 'disconnected') {
          roomDocRef(roomId).set({ answer: null } as IRoom, { merge: true });
        }
      });

      peerConnection.addEventListener('signalingstatechange', () => {
        console.log(`Signaling state change: ${peerConnection.signalingState}`);
      });

      peerConnection.addEventListener('iceconnectionstatechange ', () => {
        console.log(
          `ICE connection state change: ${peerConnection.iceConnectionState}`
        );
      });
    },
    [roomId]
  );

  const createRoom = useCallback(async () => {
    if (!localStream) {
      throw new Error('localStream is missing');
    }

    if (!remoteStream) {
      throw new Error('remoteStream is missing');
    }

    console.log('createPeerConnection');

    const peerConnection = new RTCPeerConnection(configuration);

    registerPeerConnectionListeners(peerConnection);

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    const callerCandidatesCollection = roomDocRef(roomId).collection(
      'callerCandidates'
    );

    peerConnection.addEventListener('icecandidate', (event) => {
      if (!event.candidate) {
        console.log('Got final candidate!');
        return;
      }
      console.log('Got candidate: ', event.candidate);
      callerCandidatesCollection.add(event.candidate.toJSON());
    });

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    const room = {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
    } as IRoom;

    const roomRef = roomDocRef(roomId);

    await roomRef.set(room, { merge: true });

    peerConnection.addEventListener('track', (event) => {
      console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach((track) => {
        console.log('Add a track to the remoteStream:', track);
        remoteStream.addTrack(track);
      });
    });

    roomRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data && data.answer) {
        console.log('Got remote description: ', data.answer);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(rtcSessionDescription);
      }
    });

    roomRef.collection('calleeCandidates').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          let data = change.doc.data();
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    setPeerConnection(peerConnection);

    return peerConnection;
  }, [roomId, localStream, remoteStream]);

  const joinRoom = useCallback(async () => {
    console.log('join room');
    if (!room) {
      throw new Error('room is missing');
    }

    if (!room.offer) {
      throw new Error('offer is missing');
    }

    if (!localStream) {
      throw new Error('localStream is missing');
    }

    if (!remoteStream) {
      throw new Error('remoteStream is missing');
    }

    const peerConnection = new RTCPeerConnection(configuration);

    registerPeerConnectionListeners(peerConnection);

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    const roomRef = roomDocRef(roomId);
    // Code for collecting ICE candidates below
    const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
    peerConnection.addEventListener('icecandidate', (event) => {
      if (!event.candidate) {
        console.log('Got final candidate!');
        return;
      }
      console.log('Got candidate: ', event.candidate);
      calleeCandidatesCollection.add(event.candidate.toJSON());
    });
    // Code for collecting ICE candidates above

    peerConnection.addEventListener('track', (event) => {
      console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach((track) => {
        console.log('Add a track to the remoteStream:', track);
        remoteStream.addTrack(track);
      });
    });

    // Code for creating SDP answer below
    const offer = room.offer;

    if (!offer.type) {
      throw new Error('offer is missing');
    }
    console.log('Got offer:', offer);
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription({ type: room.offer.type!, sdp: room.offer.sdp })
    );
    const answer = await peerConnection.createAnswer();
    console.log('Created answer:', answer);
    await peerConnection.setLocalDescription(answer);

    const roomWithAnswer = {
      answer: {
        type: answer.type,
        sdp: answer.sdp,
      },
    };
    await roomRef.update(roomWithAnswer);
    // Code for creating SDP answer above

    // Listening for remote ICE candidates below
    roomRef.collection('callerCandidates').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          let data = change.doc.data();
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });

    setPeerConnection(peerConnection);
  }, [
    room,
    roomId,
    localStream,
    remoteStream,
    registerPeerConnectionListeners,
  ]);

  useEffect(() => {
    if (!localStream) {
      return;
    }

    if (!remoteStream) {
      return;
    }

    if (!room) {
      return;
    }

    if (hasInitialized) {
      return;
    }

    setHasInitialized(true);

    if (room.host !== getCurrentUserUID()) {
      joinRoom();
    } else {
      createRoom();
    }
  }, [room, createRoom, joinRoom, hasInitialized, localStream, remoteStream]);

  const openUserMedia = useCallback(async () => {
    if (
      !navigator.mediaDevices &&
      window.location.host === 'the-gives-local:3050'
    ) {
      console.error('Cannot access camera on insecure domains');
      console.info(
        'Navigate to chrome://flags/#unsafely-treat-insecure-origin-as-secure ' +
          'and add "http://the-gives-local:3050" to the list of trusted domains'
      );
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setLocalStream(stream);
    setRemoteStream(new MediaStream());
  }, []);

  useEffect(() => {
    if (!remoteVideoRef.current || !localVideoRef.current) {
      return;
    }

    localVideoRef.current.srcObject = localStream;
    remoteVideoRef.current.srcObject = remoteStream;
  }, [remoteVideoRef, localVideoRef, remoteStream, localStream]);

  useEffect(() => {
    openUserMedia();
  }, [openUserMedia]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.localVideoWrapper}>
        <video ref={localVideoRef} muted autoPlay playsInline></video>
      </div>
      <div className={styles.remoteVideoWrapper}>
        <video ref={remoteVideoRef} autoPlay playsInline></video>
      </div>
    </div>
  );
};
