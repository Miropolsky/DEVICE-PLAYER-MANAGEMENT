import React, { useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDevice } from "../hooks/useDevice";
import type { Player } from "../types";
import BalanceOperationModal from "./BalanceOperationModal";
import ErrorAlert from "./ErrorAlert";
import LoadingSpinner from "./LoadingSpinner";
import PlayerCard from "./PlayerCard";
import "./PlayerList.css";

const PlayerList: React.FC = () => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const navigate = useNavigate();
  const { device, players, loading, error, refetch } = useDevice(deviceId);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [operation, setOperation] = useState<"deposit" | "withdraw">("deposit");

  if (!deviceId) {
    navigate("/");
    return null;
  }

  const handleOperation = (player: Player, op: "deposit" | "withdraw") => {
    setSelectedPlayer(player);
    setOperation(op);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPlayer(null);
  };

  const handleOperationSuccess = () => {
    refetch();
  };

  if (loading) {
    return <LoadingSpinner message="Loading players..." />;
  }

  if (error || !device) {
    return (
      <ErrorAlert
        title="Error loading device"
        message={error || "Device not found"}
        onRetry={refetch}
      />
    );
  }

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2>Players - {device.name}</h2>
              <p className="text-muted mb-0">{device.places.length} places</p>
            </div>
            <Button variant="outline-secondary" onClick={() => navigate("/")}>
              ← Back to Devices
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        {players.map((player, index) => (
          <Col key={player.id} xs={12} md={6} lg={4} className="mb-4">
            <PlayerCard
              player={player}
              index={index}
              onDeposit={(player) => handleOperation(player, "deposit")}
              onWithdraw={(player) => handleOperation(player, "withdraw")}
            />
          </Col>
        ))}
      </Row>

      {players.length === 0 && (
        <Row>
          <Col>
            <Alert variant="info">
              <Alert.Heading>No players found</Alert.Heading>
              <p>There are no players associated with this device.</p>
            </Alert>
          </Col>
        </Row>
      )}

      <BalanceOperationModal
        show={showModal}
        onHide={handleModalClose}
        player={selectedPlayer}
        operation={operation}
        onSuccess={handleOperationSuccess}
      />
    </Container>
  );
};

export default PlayerList;
