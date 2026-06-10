import styles from './Sidebar.module.scss';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <NavLink to='/'>
            <span className='fa-solid fa-pen'></span>
            <p className={styles.title}>記録する</p>
          </NavLink>
        </li>
        <li>
          <NavLink to='/report'>
            <span className='fa-solid fa-chart-bar'></span>
            <p className={styles.title}>レポート</p>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;