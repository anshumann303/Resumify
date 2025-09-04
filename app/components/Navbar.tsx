import {Link} from "react-router";

const navbar = () => {
  return (
    <nav className="navbar">
        <Link to ="/">
        <p className="tetx-2xl font-bold text-gradient">RESUMIFY</p>
        
        </Link>
        <Link to="/upload" className="primary-button w-fit">
         Upload Resume
        </Link>
    </nav>
  )
}

export default navbar