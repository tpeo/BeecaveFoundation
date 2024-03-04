import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


export default function ExhibitionLink({subtitle, title, date, description}) {

  return (
    <div className="gallery-container">
        <img src='' alt={`${title}_cover_img`}></img>
        <h1> <Link to={`/Exhibition/${title}`}>{title}</Link> </h1>        <h3>{date}</h3>
        <p>{description}</p>

    </div>
  );
};
