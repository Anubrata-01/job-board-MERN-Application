/* eslint-disable react/prop-types */
import React from "react";
import {Input} from "@nextui-org/react";
import { Eye,EyeOff } from 'lucide-react';

export default function Passwordfeild({placeholder,value,onValueChange}) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Input
      label="Password"
      variant="bordered"
      placeholder={placeholder}
      value={value}
      onValueChange={onValueChange}
      endContent={
        <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
          {isVisible ? (
            <EyeOff className="text-2xl text-default-400 pointer-events-none" />
          ) : (
            <Eye className="text-2xl text-default-400 pointer-events-none" />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
      className="max-w-full"
    />
  );
}
