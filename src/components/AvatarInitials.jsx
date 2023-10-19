// due to lack of support of faker in vite, I had to create this component to generate initials
// this is not a good solution, but it works for now

import React from 'react';

const AvatarInitials = ({ name }) => {

  const generateInitials = (name) => {
    if (!name) return '';
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return nameParts[0][0] + nameParts[1][0];
    } else {
      return nameParts[0][0] + nameParts[0][1];
    }
  };

  const initials = generateInitials(name);

  const initialsStyle = {
    background: '#007ACC', // Background color
    color: '#fff',         // Text color
    width: '48px',         // Width and height for the circle
    height: '48px',
    borderRadius: '50%',   // Make it a circle
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',   // Text size
  };

  return (
    <div style={initialsStyle}>{initials}</div>
  );
};

export default AvatarInitials;
