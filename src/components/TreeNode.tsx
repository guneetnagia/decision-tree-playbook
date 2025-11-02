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
          px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm
          ${getNodeColor()}
          ${isCurrent ? "scale-105 sm:scale-110 shadow-lg" : "shadow-sm"}
        `}
      >
        <div className="flex items-center gap-1.5 sm:gap-2">
          {isActive ? (
            <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          ) : (
            <Circle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          )}
          <span className="break-words max-w-[180px] sm:max-w-none">
            {node.question || node.answer || "Node"}
          </span>
        </div>
      </div>

      {!isLeaf && node.yesNode && node.noNode && (
        <div className="flex gap-4 sm:gap-6 md:gap-8 mt-4 sm:mt-6 md:mt-8 relative">
          {/* Connecting lines */}
          <div className="absolute top-0 left-1/2 w-0.5 h-4 sm:h-6 -translate-x-1/2 -translate-y-4 sm:-translate-y-6 bg-border" />
          
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className={`absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 w-0.5 h-4 sm:h-6 ${
                isActive && activePath.includes(node.yesNode) ? "bg-primary" : "bg-border"
              }`} />
              <span className="text-[10px] sm:text-xs font-medium text-success bg-success/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap">
                Yes
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
            <div className="relative mb-2">
              <div className={`absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 w-0.5 h-4 sm:h-6 ${
                isActive && activePath.includes(node.noNode) ? "bg-primary" : "bg-border"
              }`} />
              <span className="text-[10px] sm:text-xs font-medium text-destructive bg-destructive/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded whitespace-nowrap">
                No
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
