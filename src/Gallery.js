import React, { useState, useEffect } from 'react';
import ResponsiveMasonry from 'react-responsive-masonry';
import './Gallery.css'; 

const spreadsheetId = '14INJd2S6B9SOqxl2FnBZT1_EOp5NEe6tWvPaCsWDp0c'; 
const ranges = '2:100'; 
const apiKey = process.env.REACT_APP_API_KEY;
const ROWS= 'ROWS';

const extractImageId = (imageUrl) => {
  const parts = imageUrl.split('id=');
  const id = parts[1];
  return id;
};

const Gallery = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=${ranges}&key=${apiKey}&majorDimension=${ROWS}`);
        const data = await response.json();
        if (data.valueRanges && data.valueRanges[0].values) {
          const fetchedArtworks = data.valueRanges[0].values.map((row, index) => ({
            imageUrl: extractImageId(row[2]),
            description: row[3],
            imageId: extractImageId(row[2]),
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

  return (
    <div className="gallery-container">
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        {artworks.map((artwork) => (
          <div key={artwork.key} className="gallery-item">
            <img
              src={`https://drive.google.com/thumbnail?id=${artwork.imageId}`}
              alt={artwork.description}
              className="gallery-image"
            />
            <div className="image-overlay">
              {artwork.description}
            </div>
          </div>
        ))}
      </ResponsiveMasonry>
    </div>
  );
};

export default Gallery;
