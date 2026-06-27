import styles from './Header.module.scss'

const Header = () => {

  return (
    <header className={styles.header}>
      <span className={styles.brand}>StudyRecord</span>
    </header>
  )
}

export default Header
