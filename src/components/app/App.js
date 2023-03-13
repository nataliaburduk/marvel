import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicPage } from "../pages";

const App = () => {
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path='/'>
                            <MainPage/>
                        </Route>
                        <Route exact path='/comics'>
                            <ComicPage/>
                        </Route>
                        {/* <Route path=''>
                        {/* <SingleComic comicId={106616}/> 
                        </Route> */}
                    </Switch>
                </main>
            </div>
        </Router>
    )
}


export default App;
