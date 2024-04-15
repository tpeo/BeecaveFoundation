import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Box, Grid, Typography, Card, CardMedia } from "@mui/material";

const spreadsheetId = "1FbaWozLti_PIm2oZWX8rrhWTEr5Ty5KY5Z9LwzFf27w"; //'14INJd2S6B9SOqxl2FnBZT1_EOp5NEe6tWvPaCsWDp0c';
const ranges = `2:100`;
const apiKey = process.env.REACT_APP_API_KEY;
const ROWS = "ROWS";

const extractImageId = (imageUrl) => {
    const parts = imageUrl.split("id=");
    const id = parts[1];
    return id;
};

const Gallery = () => {
    const [artworks, setArtworks] = useState([]);
    const { sheetTitle } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(sheetTitle);
                const title = `${sheetTitle}!${ranges}`;
                console.log(title);
                const response = await fetch(
                    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=${sheetTitle}!${ranges}&key=${apiKey}&majorDimension=${ROWS}`
                );
                const data = await response.json();
                console.log(data);
                if (data.valueRanges && data.valueRanges[0].values) {
                    const fetchedArtworks = data.valueRanges[0].values.map((row, index) => ({
                        imageUrl: extractImageId(row[8]),
                        description: row[5],
                        price: row[6],
                        size: row[7],
                        imageId: extractImageId(row[8]),
                        type: row[9],
                        approved: row[10], // Adding the "Approved" column
                        key: index.toString(),
                    })).filter(artwork => artwork.approved === "Yes"); // Filter artworks based on "Approved" column
                    setArtworks(fetchedArtworks);
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
        <div className="gallery-container">
            <Grid container spacing={2} direction="row" sx={{ padding: "5%" }}>
                {artworks &&
                    artworks.map((artwork) => (
                        <Grid item xs={4} key={artwork.imageId}>
                            <Card
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "left",
                                    justifyContent: "center",
                                    paddingX: "5%",
                                    paddingY: "1%",
                                    border: "none",
                                    boxShadow: "none",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        pl: 1,
                                        pb: 1,
                                    }}
                                >
                                    
                                    <Link
                                    to={`/details/${artwork.imageId}?description=${encodeURIComponent(artwork.description)}&imageId=${encodeURIComponent(artwork.imageId)}&price=${encodeURIComponent(artwork.price)}&size=${encodeURIComponent(artwork.size)}&type=${encodeURIComponent(artwork.type)}`}
                                    className="gallery-item"
                                >
                                    <CardMedia
                                        component="img"
                                        image={`https://drive.google.com/thumbnail?id=${artwork.imageId}`}
                                        alt={artwork.description}
                                    />
                                </Link>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};

export default Gallery;
