import React from 'react';
import styles from './index.module.scss';
import { ReactComponent as UmbrellaIcon } from '../../svgs/umbrella.svg';

export default () => {
  function handleClick() {
    localStorage.setItem(
      'colorSchema',
      localStorage.getItem('colorSchema') === 'light' ? 'dark' : 'light'
    );
    document.body.classList.toggle('dark');
  }

  return (
    <button onClick={handleClick} className={styles.wrapper}>
      <UmbrellaIcon />
    </button>
  );
};
