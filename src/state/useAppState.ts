import { move } from "@dnd-kit/helpers";
import type { DragEndEvent } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import { useImmer } from "use-immer";
import type { NodeData, NodeType, Page } from "../utils/types";

export const usePageState = (initialState: Page) => {
  const [page, setPage] = useImmer<Page>(initialState);

  const addNode = (node: NodeData, index: number) => {
    setPage((draft) => {
      draft.nodes.splice(index, 0, node);
    });
  };

  const removeNodeByIndex = (nodeIndex: number) => {
    setPage((draft) => {
      draft.nodes.splice(nodeIndex, 1);
    });
  };

  const changeNodeValue = (nodeIndex: number, value: string) => {
    setPage((draft) => {
      draft.nodes[nodeIndex].value = value;
    });
  };

  const changeNodeType = (nodeIndex: number, type: NodeType) => {
    setPage((draft) => {
      draft.nodes[nodeIndex].type = type;
      draft.nodes[nodeIndex].value = "";
    });
  };

  const setNodes = (nodes: NodeData[]) => {
    setPage((draft) => {
      draft.nodes = nodes;
    });
  };

  const setTitle = (title: string) => {
    setPage((draft) => {
      draft.title = title;
    });
  };

  const setCover = (cover: string) => {
    setPage((draft) => {
      draft.cover = cover;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { operation, canceled } = event;

    if (canceled) return;

    setPage((draft) => {
      const { source } = operation;

      if (isSortable(source)) {
        const { initialIndex, index } = source;

        if (initialIndex !== index) {
          draft.nodes = move(draft.nodes, event);
        }
      }
    });
  };

  return {
    nodes: page.nodes,
    title: page.title,
    cover: page.cover,
    addNode,
    removeNodeByIndex,
    changeNodeValue,
    changeNodeType,
    setNodes,
    setTitle,
    setCover,
    handleDragEnd,
  };
};
