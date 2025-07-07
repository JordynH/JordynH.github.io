import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

const FlipContainer = styled.div`
  width: 300px;
  height: 300px;
  perspective: 1000px;
  margin: 2rem 0;
  border-radius: 50%;
  border: 3px solid #3498db;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.5);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 0 30px rgba(52, 152, 219, 0.8);
  }
`;

const FlipCard = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  cursor: pointer;
`;

const ImageSide = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1a1a1a;
`;

const FrontSide = styled(ImageSide)`
  transform: rotateY(0deg);
`;

const BackSide = styled(ImageSide)`
  transform: rotateY(180deg);
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const PixelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
`;

const PlaceholderText = styled.div`
  color: #3498db;
  font-size: 1.2rem;
  text-align: center;
  padding: 1rem;
`;



const FlipProfileImage = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  // Auto-flip after 4 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <FlipContainer>
      <FlipCard
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={handleClick}
      >
        <FrontSide>
          <ProfileImage
            src="/images/profile.jpg"
            alt="Jordyn Heil - Real Photo"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <PlaceholderText style={{ display: 'none' }}>
            Click to flip!
          </PlaceholderText>
        </FrontSide>
        <BackSide>
          <PixelImage
            src="/images/pixel-avatar.png"
            alt="Jordyn Heil - Pixel Avatar"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <PlaceholderText style={{ display: 'none' }}>
            Pixel Avatar
          </PlaceholderText>
        </BackSide>
      </FlipCard>
    </FlipContainer>
  );
};

export default FlipProfileImage; 