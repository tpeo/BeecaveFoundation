import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  CardActions,
  Grid,
  Icon
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CircleIcon from '@mui/icons-material/Circle';

export default function ExhibitionLink({subtitle, title, date, description, image, order}) {

  const imageBlock = <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", pl: 1, pb: 1, padding: '1%' }}>
      <CardMedia
        component="img"
        image={`https://drive.google.com/thumbnail?id=${image}`}
        alt={description}
      />
    </Box>

  const textBlock = <Grid container rowSpacing={12} 
    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', fontFamily: "Inter", justifyContent: 'space-between', paddingLeft: '5%', paddingRight: '10%', height: '100%', flexWrap: 'nowrap' }}>
  {/* <CardContent sx={{ flex: '1 0 auto' }}> */}
    <Grid item >
      <>
        <>
        <Typography sx={{ fontSize: 14, fontFamily:"Inter" }} color="black" gutterBottom>
        <CircleIcon sx={{fontSize: 12, color: order ? 'gray' : 'green'}} />
         {"        " + subtitle}
        </Typography>
        </>
        <Typography variant="h4" component="div" sx={{my: "5%"}}>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 14, fontWeight:'600' }} color="black">
          {date}
        </Typography>
      </>
    </Grid>
  {/* </CardContent> */}
  <Grid item>
      <>  
        <Typography variant="body2" sx={{ marginBottom: '5%'}}>
          {description}
        </Typography>    
      </>
    <Box display="flex" sx={{ alignItems: 'center'}}>
      <ArrowForwardIcon></ArrowForwardIcon>
      <Link to={`/Exhibition/${title}`} style={{
          textDecoration: 'none',
          color: 'inherit', // This ensures the link inherits the color from its parent
          transition: 'text-decoration 0.3s ease', 
          fontWeight: 700,
          // Smooth transition for the underline
          }} 
          onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
          onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
          > View Information</Link>
    </Box>
  </Grid>
</Grid>

  return (
    <Grid item xs={12}>

    <Card sx={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", paddingX: '5%', paddingY: '5%',
        border: "none", boxShadow: "none", backgroundColor: "#ffffff"}}>
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
          <Grid item xs={4}> 
            {textBlock}
          </Grid>
          <Grid item xs={8}>
            {imageBlock}
          </Grid>
           </>

       }
       
      </Card>
      </Grid>

  );
};
