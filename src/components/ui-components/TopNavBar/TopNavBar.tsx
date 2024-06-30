import React, { ReactNode } from 'react';
import styles from './TopNavBar.module.scss';

const TopNavBar: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles['top-nav-bar']}>{children}</div>;
};

export default TopNavBar;
