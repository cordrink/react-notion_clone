import { DragDropProvider } from "@dnd-kit/react";
import { nanoid } from "nanoid";
import NodeContainer from "../Node/NodeContainer";
import { useAppState } from "../state/AppStateContext";
import Cover from "./Cover";
import Spacer from "./Spacer";
import Title from "./Title";
import { useFocusednodeIndex } from "./useFocusedNodeindex";

export default function Page() {
  const { title, nodes, addNode, cover, setCover, setTitle, handleDragEnd } =
    useAppState();

  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusednodeIndex({
    nodes,
  });

  return (
    <>
      <Cover filePath={cover} changePageCover={setCover} />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />
        <DragDropProvider onDragEnd={handleDragEnd}>
          {nodes.map((node, index) => (
            <NodeContainer
              node={node}
              key={node.id}
              index={index}
              updateFocusedIndex={setFocusedNodeIndex}
              isFocused={focusedNodeIndex === index}
            />
          ))}
        </DragDropProvider>
        <Spacer
          handleClick={() => {
            addNode({ type: "text", value: "", id: nanoid() }, nodes.length);
          }}
          showHint={!nodes.length}
        />
      </div>
    </>
  );
}
