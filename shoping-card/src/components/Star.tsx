import React from 'react';

export const Star = ({ filled }:any) => {
  return (
    <span className={`star ${filled ? 'filled' : 'empty'}`}>
      &#9733;
    </span>
  );
};
