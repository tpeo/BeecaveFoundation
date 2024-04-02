import React, { useState, useEffect } from "react";
import Gallery from "../Gallery";
import { useParams } from "react-router-dom";

const Exhibition = () => {
    const { sheetTitle } = useParams();
    return (
        <div className="container">
            <h1> {sheetTitle} </h1>
            <Gallery></Gallery>
        </div>
    );
};
export default Exhibition;
