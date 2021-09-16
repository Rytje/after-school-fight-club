import React from 'react'
import Footer from '../Layout/Footer';
import TopBar from '../Layout/TopBar';
import Navigation from '../Layout/Navigation';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ProductDetailPage from './ProductDetailPage';
import CategoryPage from './CategoryPage';

export default function StorePage() {

    let match = useRouteMatch();

    return (
        <div>
            <TopBar />
            <Navigation />
            <Switch>
                {/* <Route path={`${match.url}/fightsticks/:productId`}><ProductDetailPage /></Route>
                <Route path={`${match.url}/fightsticks`}><FightSticksPage /></Route>
                <Route path={`${match.url}/pads`}><PadsPage /></Route> */}
                <Route path="/store/:category/:product"><ProductDetailPage /></Route>
                <Route path="/store/:category"><CategoryPage /></Route>
            </Switch>
            <Footer />
        </div>
    )
}
