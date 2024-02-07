import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

function extractImageId(imageUrl) {
  const parts = imageUrl.split('id=');
  const id = parts[1];
  return id;
}

const BootstrapCard = ({ imageUrl, description }) => {
  console.log("imageUrl" + imageUrl);
  console.log(description);
  const fileId = extractImageId(imageUrl);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card className="card" style={{ width: 'auto', height: 'auto' }}>
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ position: 'relative' }}
      >
      <Card.Img variant="top" src={`https://drive.google.com/thumbnail?id=${fileId}`} alt={description} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
      {isHovered && (
          <div style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              textAlign: 'center'
            }}>
              {description}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BootstrapCard;
