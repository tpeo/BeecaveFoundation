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
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ExhibitionLink({subtitle, title, date, description, order}) {

  const imageBlock = <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", pl: 1, pb: 1 }}>
      <CardMedia
      component="img"
      // sx={{ width: 151 }}
      image="/images/dummy.png"
      alt="Live from space album cover"
    />
    </Box>

  const textBlock = <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 150 }}>
  <CardContent sx={{ flex: '1 0 auto' }}>
    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {subtitle}
    </Typography>
    <Typography variant="h4" component="div">
      {title}
    </Typography>
    <Typography sx={{ mb: 1.5 }} color="text.secondary">
      {date}
    </Typography>
    <Typography variant="body2">
      {description}
    </Typography>     
  </CardContent>
  <CardActions>
    <ArrowForwardIcon></ArrowForwardIcon>
    <Link to={`/Exhibition/${title}`} size="small">Visit Exhibition</Link>
  </CardActions>
</Box>

  return (
    <Grid item>

    <Card sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", paddingX: '5%', paddingY: '1%'}}>
       {
        (order) ? 
        <>
          <Grid item xs={8}> 
            {imageBlock}
          </Grid>
          <Grid item xs={4}>
            {textBlock}
          </Grid>
        </>

           : <>
          <Grid item xs={8}> 
            {textBlock}
          </Grid>
          <Grid item xs={4}>
            {imageBlock}
          </Grid>
           </>

       }
       
      </Card>
      </Grid>

  );
};
