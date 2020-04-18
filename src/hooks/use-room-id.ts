import { IRoomParams } from './../types';
import { useRouteMatch } from 'react-router-dom';

export default function useRoomId() {
  const match = useRouteMatch<IRoomParams>();

  return match.params.roomId;
}
