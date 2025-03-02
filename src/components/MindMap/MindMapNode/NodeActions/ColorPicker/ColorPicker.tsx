import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BG_COLORS, BORDER_COLORS, NodeData } from "@/constants/nodes";
import { ColorSelectorView } from "./ColorSelectorView";

type Props = {
  id: string;
  onUpdateNode: (nodeId: string, data: Partial<NodeData>) => void;
  data: NodeData;
};

export const ColorPicker = ({ id, onUpdateNode, data }: Props) => {
  const onColorClick = (color: string, type: "bgColor" | "borderColor") => {
    onUpdateNode(id, { [type]: color });
  };

  return (
    <div
      className="absolute left-0 top-full mt-2"
      onClick={(e) => e.stopPropagation()}
    >
      <div>
        <Tabs defaultValue="borderColor" className="w-[300px]">
          <TabsList className="w-full grid-cols-2">
            <TabsTrigger className="w-full" value="borderColor">
              Border
            </TabsTrigger>
            <TabsTrigger className="w-full" value="bgColor">
              Background
            </TabsTrigger>
          </TabsList>
          <TabsContent value="borderColor">
            <ColorSelectorView
              selectedColor={data.borderColor || "#000000"}
              onColorClick={(color) => onColorClick(color, "borderColor")}
              colors={BORDER_COLORS}
            />
          </TabsContent>
          <TabsContent value="bgColor">
            <ColorSelectorView
              selectedColor={data.bgColor || "#FFFFFF"}
              onColorClick={(color) => onColorClick(color, "bgColor")}
              colors={BG_COLORS}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
