import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  CardActions,
  Grid,
  ButtonBase
} from '@mui/material'

export default function ArchiveCard({title, date, image, description}) {

  const navigate = useNavigate();

  const handleClick = (title) => {
    navigate(`/Exhibition/${title}`)
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', border: "none", boxShadow: "none"}}>
      <ButtonBase onClick={() => {handleClick(title)}} sx={{ display: 'flex', flexDirection: 'column'}} >
        <Box key={title} sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", pl: 1, pb: 1, width: "100%" }}>
          <CardMedia
            component="img"
            image={`https://drive.google.com/thumbnail?id=${image}`}
            alt={description}
          />
        </Box>
        <Typography variant="h6" component="div" sx={{fontFamily: "Inter"}}>
          {title}
        </Typography>
        <Typography color="black" sx={{mb: 1.5, fontFamily: "Inter"}}>
          {date}
        </Typography>
      </ButtonBase>
    </Card>
  );
};
