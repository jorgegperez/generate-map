import { create } from "zustand";
import {
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";
import { NodeData } from "@/constants/nodes";

interface MindMapState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addChildNode: (parentId: string) => void;
  deleteNode: (nodeId: string) => void;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
}

const initialNodes: Node<NodeData>[] = [
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

export const useMindMapStore = create<MindMapState>((set, get) => ({
  nodes: initialNodes,
  edges: [],

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as Node<NodeData>[],
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: [...get().edges, connection as Edge],
    });
  },

  addChildNode: (parentId) => {
    const parentNode = get().nodes.find((node) => node.id === parentId);
    if (!parentNode) return;

    const newNode = {
      id: `${Date.now()}`,
      type: "mindmap",
      position: {
        x: parentNode.position.x,
        y: parentNode.position.y + 100,
      },
      data: {
        label: "New Node",
        isRoot: false,
        borderColor: "default",
        bgColor: "default",
      },
    };

    const newEdge = {
      id: `e${parentId}-${newNode.id}`,
      source: parentId,
      target: newNode.id,
    };

    set({
      nodes: [...get().nodes, newNode as Node<NodeData>],
      edges: [...get().edges, newEdge],
    });
  },

  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((node) => node.id !== nodeId),
      edges: get().edges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      ),
    });
  },
  updateNode: (nodeId, newData) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      ),
    });
  },
}));
