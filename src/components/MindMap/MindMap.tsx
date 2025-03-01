"use client";

import "@xyflow/react/dist/style.css";

import {
  Background,
  ReactFlow,
  Controls,
  MiniMap,
  NodeProps,
  Node,
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
      >
        <Controls />
        <MiniMap />
        <Background bgColor="white" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
