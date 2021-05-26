import classes from './SettingsButton.module.css';

const SettingsButton = () => {
  return (
    <div>
      <button className={classes.settingsButtonBtn}>+</button>
      <div>
        <button>Change Password</button>
        <button>Change Profile Picture</button>
        <button>Change Cover Photo</button>
      </div>
      <div className={classes.mainContent}></div>
    </div>
  )
}

export default SettingsButton
