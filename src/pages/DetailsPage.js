import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Grid, Typography, Card, CardMedia } from "@mui/material";
import { useParams } from "react-router-dom";

export default function DetailsPage() {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const description = queryParams.get("description");
    const imageId = queryParams.get("imageId");
    const price = queryParams.get("price");
    const size = queryParams.get("size");
    const type = queryParams.get("type");

    return (
        <Grid container spacing={2} style={{ alignItems: "center", height: "60vh" }}>
            {/* Image */}
            <Grid item xs={12} md={8} >
                <CardMedia
                    component="img"
                    image={`https://drive.google.com/thumbnail?id=${imageId}`}
                    alt={description}
                    sx={{ maxWidth: "100%" }}
                />
            </Grid>
            {/* Image information */}
            <Grid item xs={12} md={4} style={{ alignItems: "center" }}>
                <Box
                    sx={{
                        background: "#F5F5F5",
                        padding: "20px",
                        borderRadius: "4px",
                        height: "60vh",
                    }}
                >
                    <Typography variant="h5" sx={{ marginBottom: "10px" }}>
                        Description:
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                        {description}
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: "10px" }}>
                        Price:
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                        {price}
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: "10px" }}>
                        Size:
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "20px" }}>
                        {size}
                    </Typography>
                    <Typography variant="h5" sx={{ marginBottom: "10px" }}>
                        Type:
                    </Typography>
                    <Typography variant="body1">{type}</Typography>
                </Box>
            </Grid>
        </Grid>
    );
}
