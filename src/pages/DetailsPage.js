import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function DetailsPage(imageId, description){
  return (
        <div>
          <img
              src={`https://drive.google.com/thumbnail?id=${imageId}`}
              alt={description}
              className="gallery-image"
            />
          {/* <h1 >
                  {description}
          </h1> */}
        </div>
      )
}

// import { useParams, useLocation } from 'react-router-dom';

// const DetailsPage = () => {
//   const { imageId } = useParams();
//   const { state } = useLocation();
//   const { description } = state.description;

//   return (
//     <div>
//       <img
//         src={`https://drive.google.com/thumbnail?id=${imageId}`}
//         alt={description}
//         className="gallery-image"
//       />
//       <h1>{description}</h1>
//     </div>
//   );
// };

// export default DetailsPage;


