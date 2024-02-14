import './App.css';
import Gallery from './Gallery';
import React, { useRef } from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import Home from './pages/Home.js';
import Exhibition from './pages/Exhibition.js';
import DetailsPage from './pages/DetailsPage.js';


function App() {
  return (
    <BrowserRouter>
              <Routes>
                  <Route path={"/"} element={<Home />} />
                  <Route path="/Exhibition/:sheetTitle" element={<Exhibition />} /> 
                  <Route path="/details/:imageId" element={<DetailsPage/>} /> 
              </Routes> 
      </BrowserRouter>
  );
}

export default App;
