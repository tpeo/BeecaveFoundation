import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const DetailsPage = () => {

  const location = useLocation();
  const imageId = location.state.imageId;
  const description = location.state.description;
  console.log(location);

  return (
    <div>
      <img
              src={`https://drive.google.com/thumbnail?id=${imageId}`}
              alt={description}
              className="gallery-image"
            />
            <h1 >
              {description}
            </h1>
    </div>
  );
};

export default DetailsPage;
