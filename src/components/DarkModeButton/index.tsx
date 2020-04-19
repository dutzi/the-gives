import React from 'react';
import styles from './index.module.scss';
import { ReactComponent as UmbrellaIcon } from '../../svgs/umbrella.svg';

export default () => {
  function handleClick() {
    localStorage.setItem(
      'darkMode',
      localStorage.getItem('darkMode') === 'true' ? 'false' : 'true'
    );
    document.body.classList.toggle('dark');
  }

  return (
    <button onClick={handleClick} className={styles.wrapper}>
      <UmbrellaIcon />
    </button>
  );
};
