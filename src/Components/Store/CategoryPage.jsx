import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import { firestore } from '../../firebase-config';
import { v4 as uuidv4 } from 'uuid';

export default function CategoryPage() {

    const [productsList, setProductsList] = useState([]);
    const [docList, setDocList] = useState([]);

    let { category } = useParams();

    function capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
    }

    function resetLists() {
        setProductsList([]);
        setDocList([]);
    }

    function getSearchCategory(urlSlug) {
        let searchCategory;

        switch (urlSlug) {
            case "fightsticks":
                searchCategory = "arcadestick";
                break;
            case "pads":
                searchCategory = "pad";
                break;
            case "buttons":
                searchCategory = "button";
                break;
            case "hitbox":
                searchCategory = "hitbox";
                break;
                case "parts":
                searchCategory = "part";
                break;

            default:
                searchCategory = null;
                break;
        }
        return searchCategory;
    }

    useEffect(() => {
        console.log("Load category page");
        resetLists();
        firestore.collection("products")
            .where("Category", "==", getSearchCategory(category)).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setProductsList(prevState => {
                        let state = [doc.data(), ...prevState];
                        return state;
                    });
                    setDocList(prevState => {
                        let state = [doc.id, ...prevState];
                        return state;
                    });
                });
            });
        return () => {

        }
    }, [category]);

    return (
        <div>
            <h2>{capitalizeFirstLetter(category)} category</h2>
            <div className="row d-flex justify-content-evenly mb-5">
                {productsList.map((product, index) => {
                    return <ProductCard key={uuidv4()} collectionId="products" docId={docList[index]} description="Some quick example text to build on the card title and make up the bulk of the card's content." to={`/store/${category}/${docList[index]}`} />
                })}
            </div>
        </div>
    )
}
