import React, { useState, useEffect } from 'react';
//import CardGroup from 'react-bootstrap/CardGroup';
import BootstrapCard from './BootstrapCard'; // assuming this is the file path to your BootstrapCard component
//import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';


const spreadsheetId = '14INJd2S6B9SOqxl2FnBZT1_EOp5NEe6tWvPaCsWDp0c'; 
const ranges = '2:3'; 
const apiKey = 'AIzaSyD5ticeELEJdCeWnR8Zefb4lgF2kSRJPtM'; 
const ROWS= 'ROWS';

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=${ranges}&key=${apiKey}&majorDimension=${ROWS}`);
        const data = await response.json();
        if (data.valueRanges && data.valueRanges[0].values) {
          console.log(data.valueRanges[0].values);
          const fetchedArtworks = data.valueRanges[0].values.map((row) => ({
            imageUrl: row[2],
            description: row[3],
          }));
          // console.log(imageUrl);
          console.log(fetchedArtworks);
          setArtworks(fetchedArtworks);
          console.log(artworks);
        } else {
          console.log('No data found.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
          artworks.map((artwork) => (
            <BootstrapCard key= {artwork.imageUrl} {...artwork} />
          ))
          //<h1>hi</h1>
  );
};

export default Gallery;
