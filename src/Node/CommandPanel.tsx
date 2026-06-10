import { useEffect, useState } from "react";
import type { NodeType } from "../utils/types";
import { useOveflowScreenBottom } from "./useOverflowsScreenBottom";
import style from "./CommandePanel.module.css"
import cx from "classnames"

type CommandPanelProps = {
  nodeText: string;
  selectItem: (nodeType: NodeType) => void;
};

type SupportedNodeType ={
    value: NodeType;
    name: string;
}

const supportedNodeTypes: SupportedNodeType[] = [
  { value: "text", name: "Text" },
  { value: "list", name: "List" },
  { value: "heading1", name: "Heading1" },
  { value: "heading2", name: "Heading2" },
  { value: "heading3", name: "Heading3" },
];

export default function CommandPanel({
  nodeText,
  selectItem,
}: CommandPanelProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { overfows, ref } = useOveflowScreenBottom();

  useEffect(() => {
    const handlekeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        selectItem(supportedNodeTypes[selectedItemIndex].value);
      }
    };

    window.addEventListener("keydown", handlekeyDown);

    return () => {
      window.removeEventListener("keydown", handlekeyDown);
    };
  }, [selectItem, selectedItemIndex]);

  useEffect(() => {
    const normalizeValue = nodeText.toLowerCase().replace(/\//, "")
    setSelectedItemIndex(supportedNodeTypes.findIndex(item => item.value.match(normalizeValue)))
  }, [nodeText]);

  return (
    <div 
    ref={ref} 
    className={
        cx(style.panel, {
            [style.reserve]: overfows,
        })
    }
    >
      <div className={style.title}>Blocks</div>
      <ul>
        {supportedNodeTypes.map((type, index) => {
          const selected = selectedItemIndex === index;

          return (
            <li key={type.value} className={cx({[style.selected]: selected})} onClick={() => selectItem(type.value)}>
              {type.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
