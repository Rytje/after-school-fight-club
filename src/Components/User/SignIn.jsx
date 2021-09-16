import React, { useState, useRef } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';

export default function SignIn() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const { signIn } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await signIn(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            setError("Failed to sign in.");
        }

        setLoading(false);
    }

    let match = useRouteMatch();

    return (
        <div>
            <div className="row mb-5">
                <div className="card text-white bg-dark col-6 mx-auto mb-3">
                    <h1 className="card-header">Sign in</h1>
                    {error && <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                        {error}
                    </div>}
                    <div className="card-body">
                        <form action="" method="post" onSubmit={handleSubmit} >
                            <div className="form-group">
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" ref={emailRef} required />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" ref={passwordRef} required />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>
                                <div className="card-body d-flex justify-content-end px-0">
                                    <Link to="/">
                                        <button type="button" className="btn btn-secondary me-3">Back</button>
                                    </Link>
                                    <button type="submit" className="btn btn-primary" disabled={loading} >Submit</button>
                                </div>
                            </div>

                            <div className="card-footer">
                                Don't have an account? <Link to="/account/signup" className="ms-1">Sign up</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
