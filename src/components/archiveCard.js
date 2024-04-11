import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  CardActions,
  Grid
} from '@mui/material'

export default function ArchiveCard({title, date, image, description}) {

  
  return (
        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', paddingX: '5%', paddingY: '1%',
                border: "none", boxShadow: "none"}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", pl: 1, pb: 1 }}>
                <CardMedia
                    component="img"
                    image={`https://drive.google.com/thumbnail?id=${image}`}
                    alt={description}
                />
            </Box>
            <Typography variant="h5" component="div">
                {title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {date}
            </Typography>
        </Card>

  );
};
