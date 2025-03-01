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
import { getLayoutedElements } from "@/utils/getLayoutedItems";

interface MindMapState {
  nodes: Node<NodeData>[];
  edges: Edge[];
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addChildNode: (parentId: string) => void;
  deleteNode: (nodeId: string) => void;
  updateNode: (nodeId: string, data: Partial<NodeData>) => void;
  onLayoutChange: (direction: "TB" | "LR") => void;
}

const initialNodes: Node<NodeData>[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: {
      label: "Root Node",
      isRoot: true,
      borderColor: "#00B0FF",
      bgColor: "default",
    },
    type: "mindmap",
  },
];

export const useMindMapStore = create<MindMapState>((set, get) => ({
  nodes: initialNodes,
  edges: [],
  onNodesChange: (changes) => {
    const newNodes = applyNodeChanges(changes, get().nodes) as Node<NodeData>[];
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNodes,
      get().edges
    );
    set({
      nodes: layoutedNodes,
      edges: layoutedEdges,
    });
  },
  onEdgesChange: (changes) => {
    const newEdges = applyEdgeChanges(changes, get().edges);
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      get().nodes,
      newEdges
    );
    set({
      nodes: layoutedNodes,
      edges: layoutedEdges,
    });
  },
  onConnect: (connection) => {
    const newEdges = [...get().edges, connection as Edge];
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      get().nodes,
      newEdges
    );
    set({
      nodes: layoutedNodes,
      edges: layoutedEdges,
    });
  },
  addChildNode: (parentId) => {
    const parentNode = get().nodes.find((node) => node.id === parentId);
    if (!parentNode) return;
    console.log(parentNode);

    const newNode = {
      id: `${Date.now()}`,
      type: "mindmap",
      position: {
        x: parentNode.position.x,
        y: parentNode.position.y + (parentNode.measured?.height ?? 0) + 100,
      },
      data: {
        label: "New Node",
        isRoot: false,
        borderColor: parentNode.data.borderColor,
        bgColor: parentNode.data.bgColor,
      },
    };

    const newEdge = {
      id: `e${parentId}-${newNode.id}`,
      source: parentId,
      target: newNode.id,
      animated: true,
      type: "smoothstep",
    };

    const newNodes = [...get().nodes, newNode as Node<NodeData>];
    const newEdges = [...get().edges, newEdge];

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNodes,
      newEdges
    );

    set({
      nodes: layoutedNodes,
      edges: layoutedEdges,
    });
  },
  deleteNode: (nodeId) => {
    const getDescendantNodeIds = (currentNodeId: string): string[] => {
      const childEdges = get().edges.filter(
        (edge) => edge.source === currentNodeId
      );
      const childNodeIds = childEdges.map((edge) => edge.target);
      const descendantIds = childNodeIds.flatMap((childId) =>
        getDescendantNodeIds(childId)
      );
      return [...childNodeIds, ...descendantIds];
    };

    const nodeIdsToDelete = [nodeId, ...getDescendantNodeIds(nodeId)];

    const newNodes = get().nodes.filter(
      (node) => !nodeIdsToDelete.includes(node.id)
    );
    const newEdges = get().edges.filter(
      (edge) =>
        !nodeIdsToDelete.includes(edge.source) &&
        !nodeIdsToDelete.includes(edge.target)
    );

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNodes,
      newEdges
    );

    set({
      nodes: layoutedNodes,
      edges: layoutedEdges,
    });
  },
  updateNode: (nodeId, newData) => {
    const newNodes = get().nodes.map((node) =>
      node.id === nodeId
        ? { ...node, data: { ...node.data, ...newData } }
        : node
    );

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNodes,
      get().edges
    );

    set({
      nodes: layoutedNodes,
      edges: layoutedEdges,
    });
  },
  onLayoutChange: (direction) => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      get().nodes,
      get().edges,
      direction
    );
    set({ nodes: layoutedNodes, edges: layoutedEdges });
  },
}));
