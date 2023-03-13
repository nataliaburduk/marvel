import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicPage } from "../pages";

const App = () => {
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/comics' element={<ComicPage/>}/>
                        {/* <Routes path=''>
                        {/* <SingleComic comicId={106616}/> 
                        </Route> */}
                    </Routes>
                </main>
            </div>
        </Router>
    )
}


export default App;
