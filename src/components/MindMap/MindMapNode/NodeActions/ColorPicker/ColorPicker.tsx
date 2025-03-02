import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NodeData } from "@/constants/nodes";
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

const BORDER_COLORS = [
  "#FF3B3B", // Vibrant red
  "#FF8800", // Orange
  "#FFCC00", // Golden yellow
  "#00CC44", // Green
  "#0088FF", // Blue
  "#9933FF", // Purple
  "#FF2D6C", // Hot pink
  "#00CCCC", // Teal
  "#FF4400", // Coral red,
  "#000000", // Black
];

const BG_COLORS = [
  "#FF3B3B60", // Vibrant red
  "#FF880060", // Orange
  "#FFCC0060", // Golden yellow
  "#00CC4460", // Green
  "#0088FF60", // Blue
  "#9933FF60", // Purple
  "#FF2D6C60", // Hot pink
  "#00CCCC60", // Teal
  "#FF440060", // Coral red,
  "#00000060", // Black
];
