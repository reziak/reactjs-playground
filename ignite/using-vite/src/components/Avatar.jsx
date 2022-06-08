import styles from './Avatar.module.css';

export const Avatar = ({ src, noBorder = false }) => {
  return (
    <img className={noBorder ? styles.avatar : styles.avatarWithBorder} src={src} />
  )
}