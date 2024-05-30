import { useNavigate } from "react-router-dom";
export function useMoveBack() {
  const navigate = useNavigate();
  function moveBack() {
    return navigate(-1);
  }
  return moveBack;
}
