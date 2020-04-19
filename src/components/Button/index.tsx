import React from 'react';
import cx from 'classnames';
import styles from './index.module.scss';

export default ({
  children,
  onClick,
  className,
  size,
  showSpinner,
  color,
}: {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSpinner?: boolean;
  color?: 'primary' | 'secondary';
}) => {
  let bgColor;
  let fgColor;

  if (color === 'primary') {
    bgColor = '#000000';
    fgColor = '#ffffff';
  } else {
    bgColor = '#ffffff';
    fgColor = '#000000';
  }
  return (
    <button
      style={{ color: fgColor, background: bgColor }}
      className={cx(styles.wrapper, className)}
      onClick={onClick}
    >
      {showSpinner && <div className={styles.spinner}>...</div>}
      <div className={styles.children}>{children}</div>
    </button>
  );
};
