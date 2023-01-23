
import classes from './Navbar.module.css';
const Navbar = () => {
  return (
    <div className={classes.navbarContainer}>
        <h3>AI Image Generator</h3>
        <button className={classes.btn}>Create Image</button>
    </div>
  )
}

export default Navbar