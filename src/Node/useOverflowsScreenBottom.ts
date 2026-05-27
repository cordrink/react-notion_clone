import { useEffect, useRef, useState } from "react";

export const useOveflowScreenBottom = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [overfows, setOverflows] = useState(false);

  useEffect(() => {
    if (ref.current) {
      const { bottom } = ref.current.getBoundingClientRect();
      const { innerHeight } = window;
      setOverflows(bottom > innerHeight);
    }
  }, []);

  return { overfows, ref };
};
