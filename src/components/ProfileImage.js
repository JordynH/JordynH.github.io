import React from 'react';
import { motion } from 'framer-motion';
import { HoverElement } from './HoverElement';
import './ProfileImage.css';

export const ProfileImage = ({ src, alt }) => {
  return (
    <HoverElement intensity={0.05}>
      <motion.div
        className="profile-image-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={src} 
          alt={alt} 
          className="profile-image"
        />
      </motion.div>
    </HoverElement>
  );
}; 