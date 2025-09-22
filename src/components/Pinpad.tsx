import React from "react";
import { Button } from "react-bootstrap";
import { APP_CONFIG } from "../constants";
import "./PlayerList.css";

interface PinpadProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onBackspace: () => void;
  onOperation: (operation: "deposit" | "withdraw") => void;
  operation: "deposit" | "withdraw";
  disabled?: boolean;
}

const Pinpad: React.FC<PinpadProps> = ({
  value,
  onChange,
  onClear,
  onBackspace,
  onOperation,
  operation,
  disabled = false,
}) => {
  const handleNumberClick = (num: string) => {
    if (disabled) return;

    const newValue = value + num;

    // Проверяем, что не превышаем максимальное количество знаков после запятой
    const parts = newValue.split(".");
    if (parts.length > 1 && parts[1].length > APP_CONFIG.MAX_DECIMAL_PLACES) {
      return;
    }

    // Проверяем максимальную длину
    if (newValue.length > APP_CONFIG.MAX_INPUT_LENGTH) {
      return;
    }

    onChange(newValue);
  };

  const handleDecimalClick = () => {
    if (disabled) return;

    // Если уже есть точка, не добавляем еще одну
    if (value.includes(".")) {
      return;
    }

    // Если поле пустое, добавляем "0."
    if (!value) {
      onChange("0.");
      return;
    }

    onChange(value + ".");
  };

  return (
    <div className="pinpad-container">
      <Button
        className="pinpad-button"
        variant="outline-secondary"
        onClick={() => handleNumberClick("1")}
        disabled={disabled}
      >
        1
      </Button>
      <Button
        className="pinpad-button"
        variant="outline-secondary"
        onClick={() => handleNumberClick("2")}
        disabled={disabled}
      >
        2
      </Button>
      <Button
        className="pinpad-button"
        variant="outline-secondary"
        onClick={() => handleNumberClick("3")}
        disabled={disabled}
      >
        3
      </Button>
      <Button
        className="pinpad-button"
        variant="outline-secondary"
        onClick={() => handleNumberClick("4")}
        disabled={disabled}
      >
        4
      </Button>
      <Button
        className="pinpad-button"
        variant="outline-secondary"
        onClick={() => handleNumberClick("5")}
        disabled={disabled}
      >
        5
      </Button>
      <Button
        className="pinpad-button"
        variant="outline-secondary"
        onClick={() => handleNumberClick("6")}
        disabled={disabled}
      >
        6
      </Button>
      <Button
        className="pinpad-button"
        variant="outline-secondary"
        onClick={() => handleNumberClick("7")}
        disabled={disabled}
      >
        7
      </Button>
      <Button
        className="pinpad-button"
        variant="outline-secondary"
        onClick={() => handleNumberClick("8")}
        disabled={disabled}
      >
        8
      </Button>
      <Button
        className="pinpad-button"
        variant="outline-secondary"
        onClick={() => handleNumberClick("9")}
        disabled={disabled}
      >
        9
      </Button>
      <Button
        className="pinpad-button"
        variant="outline-secondary"
        onClick={handleDecimalClick}
        disabled={disabled}
      >
        .
      </Button>
      <Button
        className="pinpad-button"
        variant="outline-secondary"
        onClick={() => handleNumberClick("0")}
        disabled={disabled}
      >
        0
      </Button>
      <Button
        className="pinpad-button"
        variant="outline-secondary"
        onClick={onBackspace}
        disabled={disabled}
      >
        ⌫
      </Button>
      <Button
        className="pinpad-button clear"
        onClick={onClear}
        disabled={disabled}
      >
        Clear
      </Button>
      <Button
        className={`pinpad-button operation ${
          operation === "withdraw" ? "warning" : ""
        }`}
        onClick={() => onOperation(operation)}
        disabled={disabled || !value}
      >
        {operation === "deposit" ? "Deposit" : "Withdraw"}
      </Button>
    </div>
  );
};

export default Pinpad;
