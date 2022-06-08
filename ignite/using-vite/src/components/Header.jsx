import styles from './Header.module.css';

import igniteLogoSVG from '../assets/ignite-logo.svg';

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={igniteLogoSVG} alt="Ignite Feed logo" />
      <strong>Ignite Feed</strong>
    </header>
  )
};