import { useEffect, useRef } from "react";

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
