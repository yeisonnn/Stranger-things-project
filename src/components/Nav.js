import {Link} from "react-router-dom"

const Nav = () => {
    return ( <nav className="navbar">
        <div className="navbar-logo">
            local Stanger Things
        </div>
        <div className="navbar-list">
            <ul className="navbar-links">
                <li><Link to="/Home">Home</Link></li>
                <li><Link to="/Post">post</Link></li>
                <li><Link to="/Profile">profile</Link></li>
                <li><Link to="/Logout">logout</Link></li>
            </ul>
        </div>
    </nav> );
}
 
export default Nav;