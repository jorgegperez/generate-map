"use client";
import "@xyflow/react/dist/style.css";

import {
  Background,
  ReactFlow,
  useEdgesState,
  addEdge,
  useNodesState,
  Connection,
  Controls,
  MiniMap,
  Edge,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo } from "react";
import { MindMapNode } from "./MindMapNode";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      label: "Root Node",
      isRoot: true,
      borderColor: "default",
      bgColor: "default",
    },
    type: "mindmap",
  },
];

const initialEdges: Edge[] = [];

export default function MindMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Handle node operations
  useEffect(() => {
    const handleAddChild = (event: CustomEvent<{ parentId: string }>) => {
      const parentId = event.detail.parentId;
      const newId = `${Date.now()}`;

      // Get parent node position
      const parentNode = nodes.find((node) => node.id === parentId);
      if (!parentNode) return;

      // Position new node below parent
      const position = {
        x: parentNode.position.x,
        y: parentNode.position.y + 100,
      };

      // Add new node
      setNodes((nds) => [
        ...nds,
        {
          id: newId,
          type: "mindmap",
          position,
          data: {
            label: "New Node",
            isRoot: false,
            borderColor: "default",
            bgColor: "default",
          },
        },
      ]);

      // Connect with edge
      setEdges((eds) => [
        ...eds,
        {
          id: `e${parentId}-${newId}`,
          source: parentId,
          target: newId,
        },
      ]);
    };

    const handleDeleteNode = (event: CustomEvent<{ nodeId: string }>) => {
      const nodeId = event.detail.nodeId;
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
    };

    const handleUpdateNodeColor = (
      event: CustomEvent<{
        nodeId: string;
        borderColor?: string;
        bgColor?: string;
      }>
    ) => {
      const { nodeId, borderColor, bgColor } = event.detail;
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  ...(borderColor && { borderColor }),
                  ...(bgColor && { bgColor }),
                },
              }
            : node
        )
      );
    };

    window.addEventListener("addChild", handleAddChild as EventListener);
    window.addEventListener("deleteNode", handleDeleteNode as EventListener);
    window.addEventListener(
      "updateNodeColor",
      handleUpdateNodeColor as EventListener
    );

    return () => {
      window.removeEventListener("addChild", handleAddChild as EventListener);
      window.removeEventListener(
        "deleteNode",
        handleDeleteNode as EventListener
      );
      window.removeEventListener(
        "updateNodeColor",
        handleUpdateNodeColor as EventListener
      );
    };
  }, [nodes, setNodes, setEdges]);

  const nodeTypes = useMemo(() => ({ mindmap: MindMapNode }), []);

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
