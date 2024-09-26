import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">AtlasList</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" active to="/">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" active to="/signup">Sign Up</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" active to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" active to="/create_recipe">Create Recipe</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" active to="/get_recpe">Get Recipe</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="/">Action</Link>
                            <Link className="dropdown-item" href="#">Another action</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" href="#">Something else here</Link>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link disabled" href="#">Disabled</Link>
                    </li>
                </ul>
                {/* Add ml-auto to push the form to the far right */}
                <form className="form-inline d-flex ms-auto my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
};

export default NavBar;
