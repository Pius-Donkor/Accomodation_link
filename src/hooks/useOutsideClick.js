import { useEffect, useRef } from "react";

export default function useOutsideClick(handler, capture = true) {
  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }
    document.addEventListener("click", handleClick, capture);
    return () => document.removeEventListener("click", handleClick, capture);
  }, [capture, handler]);
  return { ref };
}
