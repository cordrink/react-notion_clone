import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { NodeData } from "../utils/types";

type UseFocusednodeIndexProps = {
  nodes: NodeData[];
};

export const useFocusednodeIndex = ({
  nodes,
}: UseFocusednodeIndexProps): [number, Dispatch<SetStateAction<number>>] => {
  const [focusedNodeIndex, setFocusedNodeIndex] = useState(0);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setFocusedNodeIndex((index) => Math.max(index - 1, 0));
      }
      if (event.key === "ArrowDown") {
        setFocusedNodeIndex((index) => Math.min(index + 1, nodes.length - 1));
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [nodes]);

  return [focusedNodeIndex, setFocusedNodeIndex];
};
