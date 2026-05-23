import { nanoid } from "nanoid";
import BasicNode from "../Node/BasicNode";
import Cover from "./Cover";
import Spacer from "./Spacer";
import Title from "./Title";
import { useFocusednodeIndex } from "./useFocusedNodeindex";
import { useAppState } from "../state/AppStateContext";

export default function Page() {
  const {title, nodes, addNode, setTitle} = useAppState()


  const [focusedNodeIndex, setFocusedNodeIndex] = useFocusednodeIndex({
    nodes,
  });

  
  return (
    <>
      <Cover />
      <div>
        <Title addNode={addNode} title={title} changePageTitle={setTitle} />
        {nodes.map((node, index) => (
          <BasicNode
            node={node}
            key={node.id}
            index={index}
            updateFocusedIndex={setFocusedNodeIndex}
            isFocused={focusedNodeIndex === index}
          />
        ))}
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
