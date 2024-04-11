import React, { useState, useEffect } from 'react';
import ResponsiveMasonry from 'react-responsive-masonry';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Gallery.css'; 
import Button from 'react-bootstrap/Button';

import { Box, Grid, Typography, Card, CardMedia } from "@mui/material";

const spreadsheetId = '1FbaWozLti_PIm2oZWX8rrhWTEr5Ty5KY5Z9LwzFf27w';   //'14INJd2S6B9SOqxl2FnBZT1_EOp5NEe6tWvPaCsWDp0c'; 
const ranges = `2:100`; 
const apiKey = process.env.REACT_APP_API_KEY;
const ROWS= 'ROWS';

const extractImageId = (imageUrl) => {
  const parts = imageUrl.split('id=');
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
        const title = `${sheetTitle}!${ranges}`
        console.log(title)
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=${sheetTitle}!${ranges}&key=${apiKey}&majorDimension=${ROWS}`);
        const data = await response.json();
        console.log(data);
        if (data.valueRanges && data.valueRanges[0].values) {
          const fetchedArtworks = data.valueRanges[0].values.map((row, index) => ({
            imageUrl: extractImageId(row[8]),
            description: row[5],
            imageId: extractImageId(row[8]),
            key: index.toString(),
          }));
          setArtworks(fetchedArtworks);
        } else {
          console.log('No data found.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

//   return (
//     <div className="gallery-container">

// <Grid container spacing={2} direction="row" sx={{ paddingX: '1%' }}>
//             {
//                 (artworks) && (
//                   artworks.map((artwork) => (
//                         <Grid item xs={4}>
//                             <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', paddingX: '5%', paddingY: '1%',
//                                     border: "none", boxShadow: "none"}}>
                                
//                                 <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", pl: 1, pb: 1 }}>
//                                     <Link to={{
//                                         pathname: `/details/${artwork.imageId}`,
//                                         state: {
//                                             imageId: artwork.imageId,
//                                             description: artwork.description
//                                         }
//                                     }} className="gallery-item">
//                                         <CardMedia
//                                             component="img"
//                                             image={`https://drive.google.com/thumbnail?id=${artwork.imageId}`}
//                                             alt={artwork.description}
//                                         />
//                                     </Link>
//                                 </Box>
//                                 </Card>
//                         </Grid>
//                     ))
//                 )
//             }
//         </Grid>
//     </div>
//   );
return (
  <div className="gallery-container">
    <Grid container spacing={2} direction="row" sx={{ paddingX: '1%' }}>
      {artworks &&
        artworks.map((artwork) => (
          <Grid item xs={4} key={artwork.imageId}>
            <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', paddingX: '5%', paddingY: '1%', border: "none", boxShadow: "none"}}>
              <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", pl: 1, pb: 1 }}>
                <Link to={{
                    pathname: `/details/${artwork.imageId}`,
                    state: {
                        description: artwork.description // Pass description directly
                    }
                }} className="gallery-item">
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
