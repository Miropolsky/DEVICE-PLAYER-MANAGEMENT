import React from "react";
import { Container, Spinner } from "react-bootstrap";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
}) => {
  return (
    <Container className="mt-4">
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{message}</span>
        </Spinner>
        <p className="mt-2">{message}</p>
      </div>
    </Container>
  );
};

export default LoadingSpinner;
