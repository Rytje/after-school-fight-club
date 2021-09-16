import React, { useRef, useState } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext';
import { firestore } from '../../firebase-config';

export default function SignUp() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const nameRef = useRef();
    const { signUp } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match.")
        }

        try {
            setError("");
            setLoading(true);
            await signUp(emailRef.current.value, passwordRef.current.value);
            createUser();
            history.push("/");
        } catch {
            setError("Failed to create an account.");
        }
        setLoading(false);
    }

    function createUser() {
        firestore.collection("users").add({
            firstName: nameRef.current.value,
            email: emailRef.current.value
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }


    let match = useRouteMatch();

    return (
        <div>
            <div className="row mb-5">
                <div className="card text-white bg-dark col-6 mx-auto mb-3">
                    <h1 className="card-header">Create an account</h1>
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
                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingPasswordConfirm" placeholder="Password Confirm" ref={passwordConfirmRef} required />
                                    <label htmlFor="floatingPassword">Password confirm</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control" id="floatingName" placeholder="Name" ref={nameRef} required />
                                    <label htmlFor="floatingName">Name</label>
                                </div>
                                <div className="card-body d-flex justify-content-end px-0">
                                    <Link to="/">
                                        <button type="button" className="btn btn-secondary me-3">Back</button>
                                    </Link>
                                    <button type="submit" className="btn btn-primary" disabled={loading} >Submit</button>
                                </div>
                            </div>

                            <div className="card-footer">
                                Already have an account? <Link to="/account/signin" className="ms-1">Log in</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
