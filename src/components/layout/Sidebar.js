import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { auth } from '../../config/firebase'

const Sidebar = () => {
    return (
        <div>
            <div className="mt-4 mb-5">
                <Link to="/" className="text-decoration-none text-white">
                    <img 
                        src="/logo192.png"
                        alt=""
                        width="70"
                    />
                </Link>
            </div>
            <ul className="list-unstyled m-0">
                <li>
                    <NavLink 
                        to="/dashboard" 
                        className="text-decoration-none text-secondary" 
                        activeClassName="sidebar-active"
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/posts" 
                        className="text-decoration-none text-secondary"
                        activeClassName="sidebar-active"
                    >
                        Posts
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/categories" 
                        className="text-decoration-none text-secondary"
                        activeClassName="sidebar-active"
                    >
                        Categories
                    </NavLink>
                </li>
            </ul>
            <div className="my-5">
                <button
                    className="btn bg-secondary text-light"
                    onClick={() => auth.signOut()}
                >
                    Sign out
                </button>
            </div>
        </div>
    )
}

export default Sidebar
