import React, { useState, useEffect } from "react";
import ExhibitionLink from "../ExhibitionLink.js";
import NavigationBar from "../components/navbar.js";
import PastExhibitionIcon from "../components/PastExhibitionIcon.js";
import ArchiveCard from "../components/archiveCard.js";
//import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import { Box, Grid, Typography, Card, CardMedia } from "@mui/material";
//import BootstrapCard from "../components/BootstrapCard.js";

const spreadsheetId = "1FbaWozLti_PIm2oZWX8rrhWTEr5Ty5KY5Z9LwzFf27w"; //'14INJd2S6B9SOqxl2FnBZT1_EOp5NEe6tWvPaCsWDp0c';
const ranges = "B2:F3"; // might need to set this
const apiKey = process.env.REACT_APP_API_KEY;
const ROWS = "ROWS";
const sheetTitle = "Exhibitions";

const extractImageId = (imageUrl) => {
    const parts = imageUrl.split("id=");
    const id = parts[1];
    return id;
};

const AllExhibitions = () => {
    const [exhibitions, setExhibitions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=${sheetTitle}!${ranges}&key=${apiKey}&majorDimension=${ROWS}`
                );
                const data = await response.json();
                console.log(data.valueRanges[0].values);
                if (data.valueRanges[0].values.length > 0) {
                    const exhibitions = data.valueRanges[0].values.map((e, index) => {
                        return {
                            name: e[0],
                            start: e[1],
                            end: e[2],
                            image: extractImageId(e[3]),
                            description: e[4],
                        };
                    });
                    setExhibitions(exhibitions);
                } else {
                    console.log("No data found.");
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <NavigationBar />
            <Typography variant="h5" sx={{ paddingLeft: "5%", paddingY: "5%", fontFamily:"Inter" }} component="div">
                All Exhibition Archive
            </Typography>

            <Grid container spacing={2} direction="row" sx={{ paddingX: "5%" }}>
                {exhibitions &&
                    exhibitions.map(
                        (exhibition) => (
                            console.log(exhibition),
                            (
                                // <Button key={exhibition} onClick={() => navigate(`/Exhibition/${exhibition.name}` )} className="gallery-item">
                                //     <img
                                //     src={`https://drive.google.com/thumbnail?id=${exhibition.image}`}
                                //     alt={exhibition.description}
                                //     className="gallery-image"
                                //     />
                                // </Button>
                                <Grid item xs={4}>
                                   <ArchiveCard
                                    key={exhibition.name}
                                    title={exhibition.name}
                                    date={`${exhibition.start} - ${exhibition.end}`}
                                    image={exhibition.image}
                                ></ArchiveCard>
                                </Grid>
                            )
                        )
                    )}
            </Grid>
        </div>
    );
};
export default AllExhibitions;
