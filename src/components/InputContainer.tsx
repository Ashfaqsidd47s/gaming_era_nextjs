"use client"

import React, { useState } from "react";
import { IoMail } from "react-icons/io5";

interface InputContainerProps {
  type?: string;
  placeholder: string;
  getValue: (value: string) => void;
  icon?: any
}

export default function InputContainer ({
  type = "text",
  placeholder,
  getValue,
  icon
} : InputContainerProps ) {
  const [value, setValue] = useState<string>("");  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    getValue(inputValue); // Pass value back to parent
  };

  return (
    <div className=" mb-1 input-container py-1  rounded-lg w-full min-w-[250px]">
        <div className="p-1 px-2 rounded-lg flex items-center relative">
           <span className=" absolute left-4 font-medium" >{icon? icon :<IoMail />}</span>
          <input
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              className={`bg-background w-full p-2 pl-9 outline-none focus:outline-none text-primary-foreground border-2 border-primary-foreground/50 rounded-lg focus:border-primary`}
          />
        </div>
    </div>
  );
};
