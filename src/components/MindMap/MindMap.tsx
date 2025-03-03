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
import { NodeData, ELayoutDirection } from "@/constants";
import { DEFAULT_NODES, useMindMapStore } from "@/store/mindmap";
import { Button } from "../ui/button";
import { GitFork, Plus } from "lucide-react";

import { useUserFile } from "@/hooks/files/useUserFile";
import { useSession } from "next-auth/react";
import { useProcessFile } from "@/hooks/files/useProcessFile";
import { HashLoader } from "react-spinners";

export default function MindMap() {
  const session = useSession();
  const { generateMindMap, isWorking } = useProcessFile();
  const { file } = useUserFile(session?.data?.user?.id);

  const {
    layout,
    nodes,
    edges,
    setNodes,
    onConnect,
    deleteNode,
    updateNode,
    addChildNode,
    onNodesChange,
    onEdgesChange,
    onLayoutChange,
  } = useMindMapStore();

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

  const handleProcessFile = () => {
    if (!file?.markdownText) return;
    generateMindMap(file.markdownText);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex w-full relative">
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
            onClick={handleProcessFile}
            disabled={isWorking}
          >
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
      {isWorking && (
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-100 flex justify-center items-center">
          <HashLoader color="#00A3FF" size={100} />
        </div>
      )}
    </div>
  );
}
