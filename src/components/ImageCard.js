import React, { useState } from 'react';

import { Card } from "react-bootstrap";

// card based on https://react-bootstrap.netlify.app/docs/components/cards/

const MenuTitle = ({ image, rover, number, camera, sol, date, status, launch_date }) => {
  const [loaded, setLoaded] = useState(true);

  const handleError = (e) => {
    setLoaded(false);
    e.target.style.display = 'none';
  };

  const handleLoad = () => {
    setLoaded(true); 
  };
  
  return (
    <Card style={{ width: '100%'}}>
      <Card.Img variant="top" src={image} onError={handleError} onLoad={handleLoad}/>
      {!loaded && ( 
        <div className="photo-archived">Photo Archived</div>
      )}
      <Card.Body>
        <Card.Title className="fs-3 fw-bold">ID: {number}</Card.Title>
        <Card.Text>
          <span className="fs-5 fw-bold">Photo Info:</span> <br />
          <strong>Sol Date:</strong> {sol} <br />
          <strong>Earth Date:</strong> {date} <br />
          <strong>Camera:</strong> {camera} <br />
          <br />
          <span className="fs-5 fw-bold">Rover Info:</span> <br />
          <strong>Rover Name:</strong> {rover} <br />
          <strong>Rover Status:</strong> {status} <br />
          <strong>Launch Date:</strong> {launch_date}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default MenuTitle;
