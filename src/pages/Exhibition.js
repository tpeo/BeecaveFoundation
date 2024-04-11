import React, { useState, useEffect } from "react";
import Gallery from "../Gallery";
import { useParams } from "react-router-dom";
import { Box, Grid, Typography, Card, CardMedia } from "@mui/material";

const Exhibition = () => {
    const { sheetTitle } = useParams();
    return (
        <div className="container">
            <Typography variant='h5' sx={{paddingLeft: '5%', paddingY: '3%'}} component="div">
            {sheetTitle}
            </Typography>
            
            <Gallery></Gallery>
        </div>
    );
};
export default Exhibition;
