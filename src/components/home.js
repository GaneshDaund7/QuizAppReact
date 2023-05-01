import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const cardsData = [
  {id: 1, title: 'Cricket', imageUrl: process.env.PUBLIC_URL + 'cricket.jpeg', linkUrl: '/quiz', jsonFile: 'cricket.json'},
  {id: 2, title: 'React-Js', imageUrl: process.env.PUBLIC_URL + 'reactimage.jpeg', linkUrl: '/quiz', jsonFile: 'react.json'},
  {id: 3, title: 'GK', imageUrl: process.env.PUBLIC_URL + 'gk.jpeg', linkUrl: '/quiz', jsonFile: 'gk.json'},
  {id: 4, title: 'JAVA', imageUrl: process.env.PUBLIC_URL + 'java.jpeg', linkUrl: '/quiz', jsonFile: 'java.json'},
  {id: 5, title: 'Health', imageUrl: process.env.PUBLIC_URL + 'health.jpeg', linkUrl: '/quiz', jsonFile: 'health.json'},
  {id: 6, title: 'Python', imageUrl: process.env.PUBLIC_URL + 'python.jpg', linkUrl: '/quiz', jsonFile: 'python.json'},
];

function CardGrid() {
  const navigate = useNavigate();

  const handleClick = (card) => {
    navigate({pathname: card.linkUrl, search: `?jsonFile=${card.jsonFile}`, state: { id: card.id, jsonFile: card.jsonFile }});
    window.location.reload();
  };

  return (
    <div style={{position: 'relative'}}>
      <div style={{position: 'absolute', top: '-60px', right: '-80px'}}>
        <button onClick={() => handleClick({linkUrl: '/'})}>Logout</button>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem'}}>
        {cardsData.map(card => (
          <div key={card.id} style={{backgroundColor: '#fff', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', borderRadius: '5px', overflow: 'hidden', cursor: 'pointer'}} onClick={() => handleClick(card)}>
            <img src={card.imageUrl} alt={card.title} style={{width: '290px', height: '150px', objectFit: 'cover'}} />
            <div style={{padding: '1rem'}}>
              <h2 style={{margin: 0, textAlign: 'center'}}>{card.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardGrid;
