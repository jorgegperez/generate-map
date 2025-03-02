"use client";

import "@xyflow/react/dist/style.css";

import {
  Background,
  ReactFlow,
  Controls,
  MiniMap,
  NodeProps,
  Node,
  ConnectionLineType,
} from "@xyflow/react";
import { useEffect, useMemo } from "react";
import { MindMapNode } from "./MindMapNode/MindMapNode";
import {
  NodeData,
  ELayoutDirection,
  ISection,
  BG_COLORS,
  BORDER_COLORS,
} from "@/constants";
import { DEFAULT_NODES, useMindMapStore } from "@/store/mindmap";
import { shallow } from "zustand/shallow";
import { Button } from "../ui/button";
import { GitFork, Plus } from "lucide-react";
import { createMindMap } from "@/app/actions/files/processFile";
import { useUserFile } from "@/hooks/files/useUserFile";
import { useSession } from "next-auth/react";

export default function MindMap() {
  const session = useSession();
  const { file } = useUserFile(session?.data?.user?.id);
  const {
    nodes,
    edges,
    layout,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addChildNode,
    deleteNode,
    updateNode,
    onLayoutChange,
    setNodes,
  } = useMindMapStore(
    (state) => ({
      nodes: state.nodes,
      edges: state.edges,
      layout: state.layout,
      onNodesChange: state.onNodesChange,
      onEdgesChange: state.onEdgesChange,
      onConnect: state.onConnect,
      addChildNode: state.addChildNode,
      deleteNode: state.deleteNode,
      updateNode: state.updateNode,
      onLayoutChange: state.onLayoutChange,
      setNodes: state.setNodes,
    }),
    shallow
  );

  useEffect(() => {
    if (nodes.length === 0) {
      setNodes([...DEFAULT_NODES]);
    }
  }, [nodes, setNodes]);

  const nodeTypes = useMemo(
    () => ({
      mindmap: (props: NodeProps<Node<NodeData>>) => (
        <MindMapNode
          {...props}
          onAddChild={addChildNode}
          onDeleteNode={deleteNode}
          onUpdateNode={updateNode}
          layout={layout}
        />
      ),
    }),
    [addChildNode, deleteNode, updateNode, layout]
  );

  const handleProcessFile = async () => {
    if (!file?.markdownText) return;
    const structure = await createMindMap(file.markdownText);

    const addLevelNodes = (
      section: ISection,
      parentId?: string,
      childIndex: number = 0
    ) => {
      let nodeId: string;

      if (section.level === 1) {
        const rootNode = {
          id: crypto.randomUUID(),
          position: { x: 0, y: 0 },
          data: {
            label: section.title,
            isRoot: true,
            borderColor: "#00B0FF",
            bgColor: "default",
          },
          type: "mindmap",
        };
        setNodes([rootNode]);
        nodeId = rootNode.id;
      } else if (section.level === 2) {
        nodeId = crypto.randomUUID();
        const colorIndex = childIndex % BG_COLORS.length;
        const bgColor = BG_COLORS[colorIndex];
        const borderColor = BORDER_COLORS[colorIndex];
        addChildNode(
          parentId!,
          { label: section.title, bgColor, borderColor },
          nodeId
        );
      } else {
        nodeId = crypto.randomUUID();
        addChildNode(parentId!, { label: section.title }, nodeId);
      }

      section.children.forEach((child, index) => {
        addLevelNodes(child, nodeId, index);
      });
    };

    for (const section of structure) {
      addLevelNodes(section);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <div className="absolute top-20 right-4 flex flex-col gap-2 justify-center items-center rounded-md py-4 px-2 z-10">
          <Button variant="iconRoundOutline" onClick={handleProcessFile}>
            <Plus />
          </Button>
          <Button
            variant="iconRoundOutline"
            onClick={() =>
              onLayoutChange(
                layout === ELayoutDirection.Vertical
                  ? ELayoutDirection.Horizontal
                  : ELayoutDirection.Vertical
              )
            }
          >
            <GitFork
              className="flex-shrink-0"
              style={{
                transformOrigin: "center",
                transition: "transform 0.3s ease-in-out",
                transform:
                  layout === ELayoutDirection.Vertical
                    ? "rotate(180deg)"
                    : "rotate(90deg)",
              }}
            />
          </Button>
        </div>
        <Controls className="text-text-secondary" />
        <MiniMap />
        <Background bgColor="white" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
