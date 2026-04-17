import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li><button><span className={`fa-solid fa-pen`}></span><p>記録する</p></button></li>
        <li><button><span className={`fa-solid fa-pen`}></span><p>記録する</p></button></li>
      </ul>
    </div>
  )
}

export default Sidebar;