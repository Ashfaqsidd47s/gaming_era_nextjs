"use client"

import React, { useState } from "react";
import { z, ZodType } from "zod";

interface InputContainerProps {
  label: string;
  type?: string;
  placeholder: string;
  getValue: (value: string) => void;
  validationSchema: ZodType<any>; 
}

const InputContainer: React.FC<InputContainerProps> = ({
  label,
  type = "text",
  placeholder,
  getValue,
  validationSchema,
}) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const handleBlur = () => {
    setTouched(true);
    try {
      validationSchema.parse(value); // Validate value with Zod schema
      setError(""); // Clear error if valid
    } catch (err: any) {
      setError(err.errors?.[0]?.message || "Invalid input"); // Set the first validation error message
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    getValue(inputValue); // Pass value back to parent
  };

  return (
    <div className=" input-container py-1">
        <label className="block mb-1 font-semibold ">
            {label}
        </label>
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={() => setTouched(false)} // Reset error visibility on focus
            className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${
                error && touched ? "border-destructive" : "border-input"
              }`}
      />
      {touched && error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default InputContainer;
