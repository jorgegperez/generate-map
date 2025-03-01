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
import { NodeData } from "@/constants/nodes";
import { useMindMapStore } from "@/store/mindmap";
import { shallow } from "zustand/shallow";

export default function MindMap() {
  const {
    nodes,
    edges,
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
        />
      ),
    }),
    [addChildNode, deleteNode, updateNode]
  );

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
        <div className="absolute top-20 right-4 flex flex-col gap-2 justify-center items-center bg-primary-500 rounded-md p-2">
          <button onClick={() => onLayoutChange("TB")}>TB</button>
          <button onClick={() => onLayoutChange("LR")}>LR</button>
        </div>
        <Controls />
        <MiniMap />
        <Background bgColor="white" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
