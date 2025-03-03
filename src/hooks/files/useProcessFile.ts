import { createMindMap } from "@/app/actions/files/processFile";
import { BG_COLORS, BORDER_COLORS } from "@/constants";
import { ISection } from "@/constants";
import { useMindMapStore } from "@/store/mindmap";
import { useMutation } from "@tanstack/react-query";

export const useProcessFile = () => {
  const { setNodes, addChildNode } = useMindMapStore();

  const { mutateAsync: process, isPending } = useMutation({
    mutationFn: (markdown: string) => createMindMap(markdown),
    onSuccess: (sections) => {
      console.log(sections);
      for (const section of sections) {
        addLevelNodes(section);
      }
    },
  });

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

  return {
    generateMindMap: process,
    isWorking: isPending,
  };
};
