import React from 'react';

export const CloudinaryPlayIcon = ({ size = 24, className = '' }) => (
  <img 
    src="https://res.cloudinary.com/dsjalneil/image/upload/v1734768690/--abstract-shapes----make-the-triangle-not-static-_nulxoj.svg"
    width={size}
    height={size}
    alt="Play"
    className={`${className} text-[var(--accent-primary)]`}
  />
);

export const CloudinaryArrowIcon = ({ size = 24, className = '' }) => (
  <img 
    src="https://res.cloudinary.com/dsjalneil/image/upload/v1734771378/--shape--arrow-with-the-effect-of-forward-movement_doyeth.svg"
    width={size}
    height={size}
    alt="Arrow"
    className={`${className} text-[var(--accent-primary)]`}
  />
);

export const CloudinaryLinkIcon = ({ size = 24, className = '' }) => (
  <img 
    src="https://res.cloudinary.com/dsjalneil/image/upload/v1734773010/--alternative--stripes-can-be-framed-by-thin-circl_ec6wde.svg"
    width={size}
    height={size}
    alt="Link"
    className={`${className} text-[var(--accent-primary)]`}
  />
);
