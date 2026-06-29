import PageNode from "../Pages/PageNode";
import type { NodeData, NodeType } from "../utils/types";
import BasicNode from "./BasicNode";
import ImageNode from "./imageNode";

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

  if (node.type === "page") {
    return <PageNode node={node} index={index} isFocused={isFocused} />;
  }

  if (node.type === "image") {
    return <ImageNode node={node} index={index} isFocused={isFocused} />;
  }

  return null;
}
