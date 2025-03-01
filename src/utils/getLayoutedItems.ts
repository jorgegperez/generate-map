import { NodeData, ELayoutDirection } from "@/constants";
import { Node, Edge, Position } from "@xyflow/react";
import dagre from "@dagrejs/dagre";
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const NODE_WIDTH = 192;

export const getLayoutedElements = (
  nodes: Node<NodeData>[],
  edges: Edge[],
  direction = ELayoutDirection.Vertical
): { nodes: Node<NodeData>[]; edges: Edge[] } => {
  const isHorizontal = direction === ELayoutDirection.Horizontal;
  const dagreDirection = isHorizontal ? "LR" : "TB";
  dagreGraph.setGraph({ rankdir: dagreDirection });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: node.measured?.width || NODE_WIDTH,
      height: node.measured?.height || 40,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const { width, height } = nodeWithPosition;

    const newNode: Node<NodeData> = {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      position: {
        x: nodeWithPosition.x - width / 2,
        y: nodeWithPosition.y - height / 2,
      },
    };

    return newNode;
  });

  return { nodes: newNodes, edges };
};
