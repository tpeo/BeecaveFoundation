import React, { useState, useEffect, useRef } from "react";
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
    // const [hovered, setHovered] = useState(null);
    const [hoverX, setHoverX] = useState({});
    const elementRef = useRef([]);

    const handleMouseEnter = (event, index) => {
        const rect = elementRef.current.getBoundingClientRect();
        console.log(rect)
        setHoverX({
            index: index,
            width: rect.width,
            height: rect.height
        });

        // setHovered(index);
    };

    const handleMouseLeave = () => {
        // setHoverX({
        //     index: -1,
        //     x: 0,
        //     y: 0,
        //     width: 0,
        //     height: 0
        // });  
    }

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
                        title: row[5],
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
                    artworks.map((artwork, index) => (
                        <Grid item xs={4} key={`${artwork.imageId}_${index}`}>
                            <Card
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "left",
                                    justifyContent: "center",
                                    textAlign: "center",
                                    paddingX: "5%",
                                    paddingY: "1%",
                                    border: "none",
                                    boxShadow: "none",
                                }}
                            >
                                <Box
                                    className="gallery-item"
                                    sx={{
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                        pl: 1,
                                        pb: 1,
                                    }}
                                >
                                    
                                    <Link
                                    to={`/details/${artwork.imageId}?title=${encodeURIComponent(artwork.title)}&imageId=${encodeURIComponent(artwork.imageId)}&price=${encodeURIComponent(artwork.price)}&size=${encodeURIComponent(artwork.size)}&type=${encodeURIComponent(artwork.type)}`}
                                    style={{textDecoration:'none', color:'black'}}
                                >
                                        <CardMedia
                                            component="img"
                                            image={`https://drive.google.com/thumbnail?id=${artwork.imageId}`}
                                            alt={artwork.description}
                                            key={index}
                                            onMouseEnter={(event) => handleMouseEnter(event, index)}
                                            onMouseLeave={handleMouseLeave}
                                            ref={elementRef}
                                        />      
                                {hoverX.index === index && (
                                    <Box class="overlay" 
                                    style={{position: 'absolute', top: 0, width: hoverX.width, height: hoverX.height, 
                                            alignItems: 'center', display: 'flex', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1 }}>
                                        <Typography sx={{color:'white'}}>{artwork.title}</Typography>
                                    </Box>
                                )}

                                    
                                </Link>
                                
                                </Box>

                                <Typography sx={{color:'black'}}>{artwork.title}</Typography>
                            </Card>
                            
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};

export default Gallery;
