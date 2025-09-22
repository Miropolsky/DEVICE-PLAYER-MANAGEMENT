import React from "react";
import { Alert, Container } from "react-bootstrap";

interface ErrorAlertProps {
  title: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title,
  message,
  onRetry,
  retryText = "Try Again",
}) => {
  return (
    <Container className="mt-4">
      <Alert variant="danger">
        <Alert.Heading>{title}</Alert.Heading>
        <p>{message}</p>
        {onRetry && (
          <>
            <hr />
            <div className="d-flex justify-content-end">
              <button className="btn btn-outline-danger" onClick={onRetry}>
                {retryText}
              </button>
            </div>
          </>
        )}
      </Alert>
    </Container>
  );
};

export default ErrorAlert;
