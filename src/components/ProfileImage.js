import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { HoverElement } from './HoverElement';
import { theme } from '../theme';

const ImageContainer = styled(motion.div)`
  width: 250px;
  height: 250px;
  margin: 2rem auto;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid ${theme.colors.primary};
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileImage = ({ src, alt }) => {
  return (
    <HoverElement intensity={0.1}>
      <ImageContainer
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image src={src} alt={alt} />
      </ImageContainer>
    </HoverElement>
  );
}; 