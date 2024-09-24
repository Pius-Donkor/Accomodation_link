import { useNavigate } from "react-router-dom";

export function useMoveBack() {
  const navigate = useNavigate();
  function moveBack() {
    if (window.history.length > 1) {
      return navigate(-1); // Go back in history
    } else {
      return navigate("/"); // Fallback to home if no history
    }
  }
  return moveBack;
}
