import { TreeNodeData } from "./DecisionTreeGame";
import { CheckCircle2, Circle } from "lucide-react";

interface TreeNodeProps {
  node: TreeNodeData;
  treeData: Record<string, TreeNodeData>;
  activePath: string[];
  currentNodeId: string;
  depth?: number;
}

export const TreeNode = ({
  node,
  treeData,
  activePath,
  currentNodeId,
  depth = 0,
}: TreeNodeProps) => {
  const isActive = activePath.includes(node.id);
  const isCurrent = currentNodeId === node.id;
  const isLeaf = node.isLeaf;

  const getNodeColor = () => {
    if (isCurrent) return "bg-accent text-accent-foreground animate-pulse-glow";
    if (isActive && isLeaf) return "bg-success text-success-foreground";
    if (isActive) return "bg-primary text-primary-foreground";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="flex flex-col items-center min-w-max">
      <div
        className={`
          px-4 sm:px-5 md:px-8 py-3 sm:py-4 md:py-5 rounded-xl font-medium transition-all duration-300 
          text-sm sm:text-base md:text-lg max-w-[250px] sm:max-w-[300px] md:max-w-[350px]
          ${getNodeColor()}
          ${isCurrent ? "scale-105 shadow-xl ring-2 ring-accent ring-offset-2" : "shadow-md hover:shadow-lg"}
        `}
      >
        <div className="flex items-center gap-2 sm:gap-3">
          {isActive ? (
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          ) : (
            <Circle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          )}
          <span className="break-words leading-relaxed">
            {node.question || node.answer || "Node"}
          </span>
        </div>
      </div>

      {!isLeaf && node.yesNode && node.noNode && (
        <div className="flex gap-8 sm:gap-12 md:gap-16 lg:gap-20 mt-6 sm:mt-8 md:mt-10 relative">
          {/* Connecting lines */}
          <div className="absolute top-0 left-1/2 w-1 h-6 sm:h-8 -translate-x-1/2 -translate-y-6 sm:-translate-y-8 bg-border" />
          
          <div className="flex flex-col items-center">
            <div className="relative mb-3 sm:mb-4">
              <div className={`absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 w-1 h-6 sm:h-8 transition-colors ${
                isActive && activePath.includes(node.yesNode) ? "bg-success" : "bg-border"
              }`} />
              <span className="text-xs sm:text-sm font-semibold text-success bg-success/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap border border-success/30">
                Yes ✓
              </span>
            </div>
            <TreeNode
              node={treeData[node.yesNode]}
              treeData={treeData}
              activePath={activePath}
              currentNodeId={currentNodeId}
              depth={depth + 1}
            />
          </div>

          <div className="flex flex-col items-center">
            <div className="relative mb-3 sm:mb-4">
              <div className={`absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 w-1 h-6 sm:h-8 transition-colors ${
                isActive && activePath.includes(node.noNode) ? "bg-destructive" : "bg-border"
              }`} />
              <span className="text-xs sm:text-sm font-semibold text-destructive bg-destructive/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap border border-destructive/30">
                No ✗
              </span>
            </div>
            <TreeNode
              node={treeData[node.noNode]}
              treeData={treeData}
              activePath={activePath}
              currentNodeId={currentNodeId}
              depth={depth + 1}
            />
          </div>
        </div>
      )}
    </div>
  );
};
