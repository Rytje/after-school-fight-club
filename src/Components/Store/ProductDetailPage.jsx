import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { firestore, auth } from '../../firebase-config';

export default function ProductDetailPage({ brand, model, edition, description, price }) {

    let { product, category } = useParams();
    const [productData, setProductData] = useState();
    
    useEffect(() => {
        getProductData(category, product);
        return () => {

        }
    }, []);

    function getProductData(collectionId, docId) {
        if (collectionId !== "featured") collectionId = "products";
        console.log(collectionId);
        let docRef = firestore.collection(collectionId).doc(docId);

        docRef.get().then((doc) => {
            if (doc.exists) {
                setProductData(doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }

    function addToCart() {
        if (auth.currentUser == null) {
            console.log("not logged in");
            return;
        }
        console.log(auth.currentUser.email);
        let userDocId;
        firestore.collection("users")
            .where("email", "==", auth.currentUser.email).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    userDocId = doc.id;

                    let tempCategory = "featured";
                    if (category !== "featured") tempCategory = "products";

                    firestore.collection("users").doc(userDocId).collection("cart").add({
                        product: `${product}`,
                        quantity: 1,
                        collection: `${tempCategory}`
                    })
                        .then((docRef) => {
                            console.log("Document written with ID: ", docRef.id);
                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });
                });
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    return (
        <div>
            <div className="row mb-5">
                <h1 className="mb-5">Product detail page</h1>
                <div className="row d-flex justify-content-around mb-5">
                    <div className="col-4">
                        <img className="img-fluid" src={productData?.Image} alt="" />
                    </div>
                    <div className="card border-primary mb-3 me-3 col-3">
                        <h2 className="card-header">{productData?.Brand}</h2>
                        <div className="card-body">
                            <h3 className="card-title fs-5">{productData?.Model}</h3>
                            <h4 className="card-subtitle fs-6 text-muted">{productData?.Edition}</h4>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{description}asdasdasd</p>
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item fs-5 text-center">${productData?.Price}</li>
                        </ul>
                        <div className="card-body d-flex justify-content-evenly">
                            <button type="button" className="btn btn-primary">Wishlist</button>
                            <button type="button" className="btn btn-success" onClick={addToCart}>Buy Now</button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <h2>More details</h2>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active fs-4" data-bs-toggle="tab" href="#home">Images</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fs-4" data-bs-toggle="tab" href="#profile">Specifications</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fs-4" data-bs-toggle="tab" href="#reviews">Reviews</a>
                        </li>
                    </ul>
                    <div id="myTabContent" className="tab-content col-8 bg-dark">
                        <div className="tab-pane fade active show" id="home">
                            <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
                        </div>
                        <div className="tab-pane fade" id="profile">
                            <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
                        </div>
                        <div className="tab-pane fade" id="reviews">
                            <p>This one hella good and pretty</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
