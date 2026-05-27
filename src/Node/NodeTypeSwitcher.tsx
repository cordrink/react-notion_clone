import type { NodeData, NodeType } from "../utils/types";
import BasicNode from "./BasicNode";

type NodeTypeSwitcherProps = {
  node: NodeData;
  updateFocusedIndex: (index: number) => void;
  isFocused: boolean;
  index: number;
};

const TEXT_NODE_TYPE: NodeType[] = [
  "text",
  "list",
  "heading1",
  "heading2",
  "heading3",
];

export default function NodeTypeSwitcher({
  node,
  updateFocusedIndex,
  isFocused,
  index,
}: NodeTypeSwitcherProps) {
  if (TEXT_NODE_TYPE.includes(node.type)) {
    return (
      <BasicNode
        node={node}
        index={index}
        isFocused={isFocused}
        updateFocusedIndex={updateFocusedIndex}
      />
    );
  }

  return null;
}
