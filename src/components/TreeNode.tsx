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
          px-6 py-3 rounded-lg font-medium transition-all duration-300
          ${getNodeColor()}
          ${isCurrent ? "scale-110 shadow-lg" : "shadow-sm"}
        `}
      >
        <div className="flex items-center gap-2">
          {isActive ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <Circle className="w-4 h-4" />
          )}
          <span className="text-sm">
            {node.question || node.answer || "Node"}
          </span>
        </div>
      </div>

      {!isLeaf && node.yesNode && node.noNode && (
        <div className="flex gap-8 mt-8 relative">
          {/* Connecting lines */}
          <div className="absolute top-0 left-1/2 w-0.5 h-6 -translate-x-1/2 -translate-y-6 bg-border" />
          
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 ${
                isActive && activePath.includes(node.yesNode) ? "bg-primary" : "bg-border"
              }`} />
              <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded">
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
              <div className={`absolute -top-6 left-1/2 -translate-x-1/2 w-0.5 h-6 ${
                isActive && activePath.includes(node.noNode) ? "bg-primary" : "bg-border"
              }`} />
              <span className="text-xs font-medium text-destructive bg-destructive/10 px-2 py-1 rounded">
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
