import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../../firebase-config';
import Navigation from '../Layout/Navigation';
import TopBar from '../Layout/TopBar';
import CartItem from './CartItem';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../Layout/Footer';

export default function Cart() {

    const [cartContent, setCartContent] = useState([]);
    const [cartItemDocRef, setCartItemDocRef] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        showCart();
        return () => {

        }
    }, [])

    function showCart() {
        console.log("show cart");

        firestore.collection("users").where("email", "==", auth.currentUser.email).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    let docRef = doc;
                    doc.ref.collection("cart").get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            setCartItemDocRef(prevState => {
                                let state = [doc.id, ...prevState];
                                return state;
                            });
                            setCartContent(prevState => {
                                let state = [doc.data(), ...prevState];
                                return state;
                            });

                        });
                    });

                });
            })
    }


    function showToast() {

    }

    return (
        <div>
            <TopBar />
            <Navigation />
            <div className="position-fixed bottom-0 end-0 p-3">
                <div id="toast" className="toast " role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <strong className="me-auto">Notification</strong>
                        <small>Just now</small>
                        <button type="button" className="btn-close ms-2 mb-1" data-bs-dismiss="toast" aria-label="Close">
                            <span aria-hidden="true"></span>
                        </button>
                    </div>
                    <div className="toast-body">
                        {errorMessage}
                    </div>
                </div>
            </div>

            <h1>Cart</h1>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="col-4 col-sm-3 fs-5" scope="col"></th>
                        <th className="col-5 col-sm-6 fs-5" scope="col">Product</th>
                        <th className="col-1 fs-5" scope="col">Quantity</th>
                        <th className="col-1 fs-5" scope="col">Action</th>
                        <th className="col-1 fs-5" scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartContent.length === 0? <h2 className="text-muted">Cart is empty</h2>:null}
                    {cartContent.map((cartItem, index) => {
                        return <CartItem key={uuidv4()} product={cartItem.product} collection={cartItem.collection} cartItemDocRefList= {cartItemDocRef} cartItemDocRef={cartItemDocRef[index]} setCartItemDocRef={setCartItemDocRef} cartContent={cartContent} setCartContent={setCartContent} cartItem={cartItem} setErrorMessage={setErrorMessage} showToast={showToast} />
                    })}
                </tbody>
            </table>
            <div className="d-flex justify-content-end">
                <button className="btn btn-lg btn-outline-primary me-3 my-5" type="button">Continue shopping</button>
                <button className="btn btn-lg btn-primary my-5" type="button">Go to checkout</button>
            </div>
            <Footer />
        </div>
    )
}
