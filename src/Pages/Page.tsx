import { nanoid } from "nanoid";
import { useState } from "react";
import BasicNode from "../Node/BasicNode";
import type { NodeData } from "../utils/types";
import Cover from "./Cover";
import Spacer from "./Spacer";
import Title from "./Title";
import { useFocusednodeIndex } from "./useFocusedNodeindex";

export default function Page() {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [title, setTitle] = useState("Titre par defaut");
  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusednodeIndex({
    nodes,
  });

  const addnode = (node: NodeData, index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 0, node);
    setNodes(newNodes);
  };

  const removeNodeByIndex = (index: number) => {
    const newNodes = [...nodes];
    newNodes.splice(index, 1);
    setNodes(newNodes);
  };

  const changeNodeValue = (index: number, value: string) => {
    const newNodes = [...nodes];
    newNodes[index].value = value;
    setNodes(newNodes);
  };

  return (
    <>
      <Cover />
      <div>
        <Title addNode={addnode} title={title} changePageTitle={setTitle} />
        {nodes.map((node, index) => (
          <BasicNode
            node={node}
            key={node.id}
            index={index}
            updateFocusedIndex={setFocusedNodeIndex}
            isFocused={focusedNodeIndex === index}
            addNode={addnode}
            removeNodeByIndex={removeNodeByIndex}
            changeNodeValue={changeNodeValue}
          />
        ))}
        <Spacer
          handleClick={() => {
            addnode({ type: "text", value: "", id: nanoid() }, nodes.length);
          }}
          showHint={!nodes.length}
        />
      </div>
    </>
  );
}
