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
import { useMemo } from "react";
import { MindMapNode } from "./MindMapNode/MindMapNode";
import { NodeData, ELayoutDirection } from "@/constants";
import { useMindMapStore } from "@/store/mindmap";
import { shallow } from "zustand/shallow";
import { Button } from "../ui/button";
import { GitFork } from "lucide-react";

export default function MindMap() {
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
    }),
    shallow
  );

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

  console.log(layout);

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
