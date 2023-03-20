import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicPage, Page404, SingleComicPage, SingleCharacterPage } from "../pages";

const App = () => {
    
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/comics' element={<ComicPage/>}/>
                        <Route path='/comics' element={<ComicPage/>}/>
                        <Route path='/comics/:comicId' element={<SingleComicPage/>}/>
                        <Route path='/characters/:charId' element={<SingleCharacterPage/>}/>
                        <Route path='*' element={<Page404/>} />
                        
                    </Routes>
                </main>
            </div>
        </Router>
    )
}


export default App;
