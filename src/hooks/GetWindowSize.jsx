import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [isMobile, setIsMobile] = useState(false);
  const minWidth = 800;

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
      const { innerWidth } = window;
      if (innerWidth <= minWidth && !isMobile) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const { innerWidth } = window;
    if (innerWidth <= minWidth && !isMobile) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  return { ...windowDimensions, isMobile };
}
// Hook encontrado em https://stackoverflow.com/a/70982252
