import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Typography, Card, CardMedia } from "@mui/material";
import { useParams } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

export default function DetailsPage() {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const description = queryParams.get("description");
    const imageId = queryParams.get("imageId");
    const price = queryParams.get("price");
    const size = queryParams.get("size");
    const type = queryParams.get("type");

    return (
        <>
        <CloseIcon sx={{ position: "absolute", top: "2%", right: "2%", fontSize: "40px", color:"#666666", cursor: "pointer" }} onClick={() => window.history.back()} />
        <Grid container spacing={2} style={{ marginTop: "3%", alignItems: "center" }}>
            {/* Image */}
            <Grid item xs={12} md={8} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CardMedia
                    component="img"
                    image={`https://drive.google.com/thumbnail?id=${imageId}`}
                    alt={description}
                    sx={{ maxHeight: "70vh", marginLeft: "5%" }}
                />
            </Grid>
            {/* Image information */}
            <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Box
                    sx={{
                        background: "#F5F5F5",
                        padding: "20px",
                        borderRadius: "4px",
                        height: "80vh",
                        width: "50vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "20%",
                        marginRight: "5%",
                    }}
                >
                    <Typography variant="h5" sx={{ ...titleStyle }}>
                        {description}
                    </Typography>
                    <Typography variant="h5" sx={{ ...textStyle, fontSize: "20px" }}>
                        {type}
                    </Typography>
                    <Typography variant="h5" sx={{ ...textStyle, fontSize: "16px" }}>
                        {size}
                    </Typography>
                    <Typography variant="h5" sx={{ ...textStyle, fontSize: "16px" }}>
                        ${price}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
        </>
    );
}

const titleStyle = {
    fontFamily: "Inter",
    fontSize: "32px",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "129%", // 41.28px
    letterSpacing: "0.64px",
    my: "5%",
};

const textStyle = {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: 300,
    lineHeight: "150%", // 41.28px
    letterSpacing: "0.64px",
};
