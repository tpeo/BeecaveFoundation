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

export default function ExhibitionLink({subtitle, title, date, description, image, order}) {

  const imageBlock = <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", pl: 1, pb: 1 }}>
      <CardMedia
        component="img"
        image={`https://drive.google.com/thumbnail?id=${image}`}
        alt="Live from space album cover"
      />
    </Box>

  const textBlock = <Grid container rowSpacing={12} 
    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', paddingLeft: '5%', height: '100%', flexWrap: 'nowrap' }}>
  {/* <CardContent sx={{ flex: '1 0 auto' }}> */}
    <Grid item >
      <>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>
        <Typography variant="h4" component="div">
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {date}
        </Typography>
      </>
    </Grid>
  {/* </CardContent> */}
  <Grid item>
      <>  
        <Typography variant="body2">
          {description}
        </Typography>    
      </>
    <Box>
      <ArrowForwardIcon></ArrowForwardIcon>
      <Link to={`/Exhibition/${title}`} style={{
          textDecoration: 'none',
          color: 'inherit', // This ensures the link inherits the color from its parent
          transition: 'text-decoration 0.3s ease', 
          // Smooth transition for the underline
          }} 
          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          size="small"> Visit Exhibition</Link>
    </Box>
  </Grid>
</Grid>

  return (
    <Grid item xs={12}>

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
