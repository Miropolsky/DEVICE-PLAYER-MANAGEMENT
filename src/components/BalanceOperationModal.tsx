import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { updatePlayerBalance } from "../services/api";
import type { Player } from "../types";
import {
  formatAmountWithCurrency,
  sanitizeAmountInput,
  validateAmount,
} from "../utils/validation";
import Pinpad from "./Pinpad";

interface BalanceOperationModalProps {
  show: boolean;
  onHide: () => void;
  player: Player | null;
  operation: "deposit" | "withdraw";
  onSuccess: () => void;
}

const BalanceOperationModal: React.FC<BalanceOperationModalProps> = ({
  show,
  onHide,
  player,
  operation,
  onSuccess,
}) => {
  const [amount, setAmount] = useState("");
  const [processing, setProcessing] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [usePinpad, setUsePinpad] = useState(false);

  const handleAmountChange = (value: string) => {
    const sanitized = sanitizeAmountInput(value);
    setAmount(sanitized);
    setValidationError(null);
  };

  const handlePinpadClear = () => {
    setAmount("");
    setValidationError(null);
  };

  const handlePinpadBackspace = () => {
    setAmount((prev) => prev.slice(0, -1));
    setValidationError(null);
  };

  const handleSubmit = async () => {
    if (!player) return;

    const validation = validateAmount(amount);
    if (!validation.isValid) {
      setValidationError(validation.error || "Invalid amount");
      return;
    }

    try {
      setProcessing(true);
      const response = await updatePlayerBalance({
        playerId: player.id,
        amount: parseFloat(amount),
        operation,
      });

      toast.success(response.message || "Operation completed successfully");
      onHide();
      onSuccess();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Operation failed";
      setValidationError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = () => {
    setAmount("");
    setValidationError(null);
    setUsePinpad(false);
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {operation === "deposit" ? "Deposit" : "Withdraw"} - {player?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Label className="mb-0">Amount</Form.Label>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setUsePinpad(!usePinpad)}
            >
              {usePinpad ? "Keyboard" : "Pinpad"}
            </Button>
          </div>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0.00"
              isInvalid={!!validationError}
              readOnly={usePinpad}
              style={{
                fontSize: "1.5rem",
                textAlign: "center",
                fontWeight: "bold",
              }}
            />
            {validationError && (
              <Form.Control.Feedback type="invalid">
                {validationError}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          {usePinpad && (
            <div className="mb-3">
              <Pinpad
                value={amount}
                onChange={setAmount}
                onClear={handlePinpadClear}
                onBackspace={handlePinpadBackspace}
                onOperation={handleSubmit}
                operation={operation}
                disabled={processing}
              />
            </div>
          )}

          <div className="text-muted small">
            Current balance:{" "}
            {player
              ? formatAmountWithCurrency(player.balance, player.currency)
              : "0 KES"}
          </div>
        </Form>
      </Modal.Body>
      {!usePinpad && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant={operation === "deposit" ? "success" : "warning"}
            onClick={handleSubmit}
            disabled={processing || !amount}
          >
            {processing ? (
              <>
                <Spinner size="sm" className="me-2" />
                Processing...
              </>
            ) : operation === "deposit" ? (
              "Deposit"
            ) : (
              "Withdraw"
            )}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default BalanceOperationModal;
