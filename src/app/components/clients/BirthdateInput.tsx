import React, { useState } from "react";

interface BirthdateInputProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

const BirthdateInput: React.FC<BirthdateInputProps> = ({
  value,
  onChange,
  readOnly = false,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const validateBirthdate = (inputValue: string): void => {
    const today = new Date();
    const twoYearsAgo = new Date(
      today.getFullYear() - 2,
      today.getMonth(),
      today.getDate()
    );
    const minAllowedDate = new Date(
      today.getFullYear() - 115,
      today.getMonth(),
      today.getDate()
    );

    const selectedDate = new Date(inputValue);

    if (selectedDate.toString() === "Invalid Date") {
      setErrorMessage("Por favor, insira uma data válida.");
      return;
    }

    if (selectedDate > today) {
      setErrorMessage("A data de nascimento não pode ser no futuro.");
    } else if (selectedDate > twoYearsAgo) {
      setErrorMessage("O cliente precisa ter pelo menos 2 anos.");
    } else if (selectedDate < minAllowedDate) {
      setErrorMessage("A data de nascimento é inválida.");
    } else {
      setErrorMessage("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    onChange(inputValue);

    if (inputValue.length === 10) {
      validateBirthdate(inputValue);
    } else {
      setErrorMessage("");
    }
  };

  return (
    <div>
      <label className="block text-sm mb-1" htmlFor="birthdate">
        Data de Nascimento
      </label>
      <input
        id="birthdate"
        type="date"
        name="birthdate"
        value={value}
        onChange={handleInputChange}
        min={`${new Date().getFullYear() - 115}-01-01`}
        max={new Date().toISOString().split("T")[0]}
        required
        readOnly={readOnly}
        className={`w-full px-3 py-2 rounded-md ${
          errorMessage
            ? "border-red-500"
            : "focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        }`}
        style={{
          border: "1px solid rgba(229,231,235,255)",
        }}
      />
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default BirthdateInput;
