import React, { useState } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { useHistory } from 'react-router';

export default function Dashboard() {

    const [error, setError] = useState("");
    const { currentUser, signOut } = useAuth();
    const history = useHistory();

    async function handleSignOut() {
        try {
            await signOut();
            history.push("/account/signin");
        } catch {
            setError("Failed to sign out.");
        }
    }

    return (
        <div className="d-grid gap-2 mb-5">
            {error && <div className="alert alert-dismissible alert-danger">
                <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                {error}
            </div>}
            <p>Email: {currentUser.email}</p>
            <button className="btn btn-lg btn-danger" type="button" onClick={handleSignOut} >Sign out</button>
        </div>
    )
}
