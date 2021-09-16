import React from 'react'

export default function Footer() {

    let date = new Date();



    return (
        <div className="row bg-dark pt-3">
            <div className="col-6 col-sm-3 mb-5 mb-sm-0 ps-sm-5">
                <h5 className="text-white">Customer service</h5>
                <a className="d-block" href="#">Contact</a>
                <a className="d-block" href="#">Returns</a>
                <a className="d-block" href="#">Terms &amp; Conditions</a>
            </div>
            <div className="col-6 col-sm-3 mb-5 mb-sm-0">
                <h5 className="text-white">About After School Fight Club</h5>
                <a className="d-block" href="#">Work at ASFC</a>
                <a className="d-block" href="#">Blog</a>
                <a className="d-block" href="#">Opening times</a>
            </div>
            <div className="col-6 col-sm-3 mb-5 mb-sm-0 ps-sm-5">
                <h5 className="text-white">Business</h5>
                <a className="d-block" href="#">Business sales</a>
                <a className="d-block" href="#">Become a partner</a>
                <a className="d-block" href="#">API</a>
            </div>
            <div className="col-6 col-sm-3 mb-5 mb-sm-0 ps-sm-5">
                <h5 className="text-white">Shop locations</h5>
                <a className="d-block" href="#">Amsterdam</a>
                <a className="d-block" href="#">Tokyo</a>
                <a className="d-block" href="#">London</a>
            </div>
            <div className="col-12">
                <p className="text-center text-secondary bg-dark pt-3 mb-0">&copy; Made by Ryno {date.getFullYear()}</p>
            </div>
        </div>
    )
}
