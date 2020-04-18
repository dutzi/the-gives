import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';

export default ({
  children,
  onClick,
  className,
  size,
  showSpinner,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSpinner?: boolean;
}) => {
  return (
    <button className={cx(styles.wrapper, className)} onClick={onClick}>
      {showSpinner && <div className={styles.spinner}>...</div>}
      <div className={styles.children}>{children}</div>
    </button>
  );
};
