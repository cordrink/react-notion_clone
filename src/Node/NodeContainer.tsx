import { useSortable } from "@dnd-kit/react/sortable";
import type { NodeData } from "../utils/types";
import styles from "./NodeContainer.module.css";
import NodeTypeSwitcher from "./NodeTypeSwitcher";

type NodeContainerProps = {
  node: NodeData;
  updateFocusedIndex: (index: number) => void;
  isFocused: boolean;
  index: number;
};

export default function NodeContainer({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: NodeContainerProps) {
  const { ref, isDragging, handleRef } = useSortable({
    id: node.id,
    index,
  });

  return (
    <div
      ref={ref}
      className={`${styles.container} ${isDragging ? styles.dragging : ""}`}
    >
      <div ref={handleRef} className={styles.dragHandle}>
        ⠿
      </div>
      <NodeTypeSwitcher
        node={node}
        updateFocusedIndex={updateFocusedIndex}
        isFocused={isFocused}
        index={index}
      />
    </div>
  );
}
