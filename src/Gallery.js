import React, { useState, useEffect } from 'react';
import ResponsiveMasonry from 'react-responsive-masonry';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Gallery.css'; 
import Button from 'react-bootstrap/Button';

const spreadsheetId = '14INJd2S6B9SOqxl2FnBZT1_EOp5NEe6tWvPaCsWDp0c'; 
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
        const title = `${sheetTitle}!${ranges}`
        console.log(title)
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=${sheetTitle}!${ranges}&key=${apiKey}&majorDimension=${ROWS}`);
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
          <Button key={artwork.key} onClick={() => navigate(`/details/${artwork.imageId}`, {state: {imageId: artwork.imageId, description:artwork.description}})} className="gallery-item">
            <img
              src={`https://drive.google.com/thumbnail?id=${artwork.imageId}`}
              alt={artwork.description}
              className="gallery-image"
            />
            <div className="image-overlay">
              {artwork.description}
            </div>
          </Button>
        ))}
      </ResponsiveMasonry> 
    </div>
  );
};

export default Gallery;
