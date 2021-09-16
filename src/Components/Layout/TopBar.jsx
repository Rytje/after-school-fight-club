import React from 'react'
import logo from '../../Assets/Images/asfclogo.png';
import { Link } from "react-router-dom";
import { useAuth } from '../../Contexts/AuthContext';

export default function TopBar() {

    const { currentUser } = useAuth();

    return (
        <header className="row mb-5">
            <nav className="navbar navbar-expand-lg navbar-light bg-light col-12">
                <Link className="navbar-brand ms-4" to="/"><img
                    src={logo}
                    width="150"
                    height="41"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"
                /></Link>
            </nav>

            <div className="row mx-0 px-0">
                <div className="col-12 d-md-flex justify-content-md-between px-0">
                    <form className="d-flex col-12 col-md-6 col-lg-4">
                        <input className="form-control" type="text" placeholder="Enter product name..."></input>
                        <button className="btn btn-secondary" type="submit">Search</button>
                    </form>
                    <div className="col-12 col-md-6 col-lg-6 d-flex justify-content-md-end pe-0">
                        <Link className="col-4 col-md-3 col-lg-2 p-0" to="/wishlist">
                            <button type="button" className="btn btn-primary col-12">Wishlist</button>
                        </Link>
                        <Link className="col-4 col-md-3 col-lg-2 p-0" to={currentUser ? "/account/dashboard" : "/account/signin"}>
                            <button type="button" className="btn btn-primary col-12">Account</button>
                        </Link>
                        <Link className="col-4 col-md-3 col-lg-2 p-0" to="/cart">
                            <button type="button" className="btn btn-primary col-12">Cart</button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
