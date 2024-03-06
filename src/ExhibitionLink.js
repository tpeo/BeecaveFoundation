import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  CardActions,
  Button
} from '@mui/material'

export default function ExhibitionLink({subtitle, title, date, description}) {

  return (
    <Card sx={{ display: 'flex', justifyContent: "space-between", paddingX: '5%', paddingY: '1%' }}>
       <Box sx={{ display: 'flex', direction: 'column', justifyContent: "space-between", pl: 1, pb: 1 }}>
              <CardMedia
              component="img"
              sx={{ width: 151 }}
              image="/static/images/cards/live-from-space.jpg"
              alt="Live from space album cover"
            />
            <CardActions>
              <Link to={`/Exhibition/${title}`} size="small">Visit</Link>
            </CardActions>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {subtitle}
            </Typography>
            <Typography variant="h5" component="div">
              {title}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {date}
            </Typography>
            <Typography variant="body2">
              {description}
            </Typography>     
          </CardContent>
        </Box>
       
      </Card>

  );
};
