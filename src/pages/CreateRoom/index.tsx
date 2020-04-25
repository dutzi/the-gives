import React, { useEffect } from 'react';
import styles from './index.module.scss';
import { useRouteMatch, useHistory } from 'react-router-dom';
import createRoom from '../../clients/create-room';
import { IVideo } from '../../types';

export default () => {
  const match = useRouteMatch<{ provider: string; videoId: string }>();
  const history = useHistory();

  useEffect(() => {
    if (!match.params.videoId || !match.params.provider) {
      history.replace('/');
      return;
    }

    createRoom({ id: match.params.videoId } as IVideo).then((room) => {
      history.replace(`/w/${room.id}`);
    });
  }, [match.params, history]);

  return <div className={styles.wrapper}></div>;
};
