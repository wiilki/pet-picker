import React from 'react';
import { Button } from 'react-bootstrap';
import { ArrowUp } from 'react-bootstrap-icons'; // If you're using React Bootstrap Icons

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // For smooth scrolling
    });
  };

  return (
    <Button
      variant="secondary"
      className="position-fixed bottom-0 end-0 m-3"
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{ backgroundColor: '#007bff' }}
    >
      <ArrowUp /> 
    </Button>
  );
};

export default BackToTop;
