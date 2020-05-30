import React from 'react';
import styles from './index.module.scss';

export default () => {
  return (
    <a
      href="https://www.producthunt.com/posts/the-gives?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-the-gives"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.wrapper}
    >
      <img
        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=204267&theme=dark"
        alt="The Gives - Watch YouTube videos while video chatting with others | Product Hunt Embed"
        style={{ width: '250px', height: '54px' }}
        width="250px"
        height="54px"
      />
    </a>
  );
};
