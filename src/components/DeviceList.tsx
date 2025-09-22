import React from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDevices } from "../hooks/useDevices";
import DeviceCard from "./DeviceCard";
import ErrorAlert from "./ErrorAlert";
import LoadingSpinner from "./LoadingSpinner";

const DeviceList: React.FC = () => {
  const { devices, loading, error, refetch } = useDevices();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner message="Loading devices..." />;
  }

  if (error) {
    return (
      <ErrorAlert
        title="Error loading devices"
        message={error}
        onRetry={refetch}
      />
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">Device Management</h2>
          <p className="text-muted mb-4">
            Select a device to view and manage player balances
          </p>
        </Col>
      </Row>

            <Row>
              {devices.map((device) => (
                <Col key={device.id} xs={12} md={6} lg={4} className="mb-4">
                  <DeviceCard
                    device={device}
                    onClick={(deviceId) => navigate(`/device/${deviceId}`)}
                  />
                </Col>
              ))}
            </Row>

      {devices.length === 0 && (
        <Row>
          <Col>
            <Alert variant="info">
              <Alert.Heading>No devices found</Alert.Heading>
              <p>There are no devices available at the moment.</p>
            </Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default DeviceList;
