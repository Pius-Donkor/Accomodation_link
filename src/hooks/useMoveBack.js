import React from "react";
import { useNavigate } from "react-router-dom";

export default function useMoveBack() {
  const navigate = useNavigate();
  function moveBack() {
    return navigate(-1);
  }
  return moveBack;
}
