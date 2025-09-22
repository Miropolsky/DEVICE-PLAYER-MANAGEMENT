import React from "react";
import { Card } from "react-bootstrap";
import type { Device } from "../types";
import { formatAmount } from "../utils/validation";

interface DeviceCardProps {
  device: Device;
  onClick: (deviceId: number) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onClick }) => {
  const formatLastSeen = (updatedAt: string) => {
    return new Date(updatedAt).toLocaleString();
  };

  const totalBalance = device.places.reduce(
    (sum, place) => sum + place.balances,
    0
  );

  return (
    <Card
      className="h-100 device-card"
      style={{ cursor: "pointer" }}
      onClick={() => onClick(device.id)}
    >
      <Card.Header>
        <h5 className="mb-0">{device.name}</h5>
      </Card.Header>
      <Card.Body>
        <div className="mb-2">
          <strong>Places:</strong> {device.places.length}
        </div>
        <div className="mb-2">
          <strong>Total Balance:</strong> {formatAmount(totalBalance)}{" "}
          {device.places[0]?.currency || "KES"}
        </div>
        <div className="mb-2">
          <strong>Last Updated:</strong> {formatLastSeen(device.updated_at)}
        </div>
        <div className="text-muted small">Click to view players</div>
      </Card.Body>
    </Card>
  );
};

export default DeviceCard;
