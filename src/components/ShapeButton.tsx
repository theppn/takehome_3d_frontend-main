import React from "react";
import { getNotificationCenter } from "../notification";

type ButtonProps = {
    label: string;
    onClick: () => void;
};

const ShapeButton: React.FC<ButtonProps> = ({ label, onClick }) => {
  const _onClick = () => {
    onClick()
    getNotificationCenter().notify('shapeAdded', {});
  }
  return <button onClick={_onClick}>Add {label}</button>;
};

export default ShapeButton;