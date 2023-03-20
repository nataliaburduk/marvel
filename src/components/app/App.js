import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicPage, SinglePage, SingleCharacterPage, SingleComicPage, Page404} from "../pages";

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
                        <Route exact path="/comics/:id" element={
                            <SinglePage Component={SingleComicPage} dataType='comic'/>
                        }/>
                        <Route exact path="/characters/:id" element={
                            <SinglePage Component={SingleCharacterPage} dataType='character'/>
                        }/>
                        <Route path='*' element={<Page404/>} />
                        
                    </Routes>
                </main>
            </div>
        </Router>
    )
}


export default App;
