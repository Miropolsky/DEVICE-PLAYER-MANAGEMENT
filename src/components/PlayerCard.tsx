import React from "react";
import { Button, Card } from "react-bootstrap";
import type { Player } from "../types";
import { formatAmountWithCurrency } from "../utils/validation";

interface PlayerCardProps {
  player: Player;
  index: number;
  onDeposit: (player: Player) => void;
  onWithdraw: (player: Player) => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  index,
  onDeposit,
  onWithdraw,
}) => {
  const formatLastActivity = (lastActivity?: string) => {
    if (!lastActivity) return "Never";
    return new Date(lastActivity).toLocaleString();
  };

  return (
    <Card
      className="h-100 player-card-animate"
      style={{
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <Card.Header>
        <h5 className="mb-0">{player.name}</h5>
      </Card.Header>
      <Card.Body>
        <div className="mb-3">
          <strong>Balance:</strong>{" "}
          {formatAmountWithCurrency(player.balance, player.currency)}
        </div>
        <div className="mb-3">
          <strong>Place:</strong> {player.place}
        </div>
        <div className="mb-3">
          <strong>Last Activity:</strong>{" "}
          {formatLastActivity(player.lastActivity)}
        </div>
        <div className="d-grid gap-2">
          <Button variant="success" size="sm" onClick={() => onDeposit(player)}>
            Deposit
          </Button>
          <Button
            variant="warning"
            size="sm"
            onClick={() => onWithdraw(player)}
          >
            Withdraw
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PlayerCard;
