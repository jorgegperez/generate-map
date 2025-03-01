import { NodeData } from "@/constants/nodes";
import { Node, Edge, Position } from "@xyflow/react";
import dagre from "@dagrejs/dagre";

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const NODE_WIDTH = 192;

export const getLayoutedElements = (
  nodes: Node<NodeData>[],
  edges: Edge[],
  direction = "TB"
): { nodes: Node<NodeData>[]; edges: Edge[] } => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: node.measured?.width || NODE_WIDTH, // Use node's width if available, fallback to default
      height: node.measured?.height || 40, // Use node's height if available, fallback to 40
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const { width, height } = nodeWithPosition; // Get the actual dimensions from dagre node

    const newNode: Node<NodeData> = {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - width / 2,
        y: nodeWithPosition.y - height / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};
