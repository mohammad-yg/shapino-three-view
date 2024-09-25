import { FC, useState } from "react";
import {
  Directory,
  DirectoryFile,
  DirectoryFolder,
  DirectoryType,
} from "../utils/directory";
import { NodeElement } from "./NodeElement";

type Props = {
  directory: DirectoryFile | DirectoryFolder;
  onAddSub: (
    name: string,
    type: DirectoryType,
    currentDir: DirectoryFolder
  ) => void;
  onRename: (name: string, currentDir: Directory) => void;
  onRemove: (currentDir: Directory) => void;
};

export const TreeElement: FC<Props> = ({
  directory,
  onAddSub,
  onRename,
  onRemove,
}) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const handleCollapseButtonClick = () => {
    setIsCollapse((prev) => !prev);
  };

  return (
    <div className="ms-3">
      <NodeElement
        onClickCollapse={handleCollapseButtonClick}
        isCollapse={isCollapse}
        directory={directory}
        onAddSub={onAddSub}
        onRename={(name: string) => onRename(name, directory)}
        onRemove={() => onRemove(directory)}
      />
      {directory.type === "folder" &&
        isCollapse &&
        directory.subs.map((dr) => (
          <TreeElement
            directory={dr}
            onAddSub={onAddSub}
            onRename={onRename}
            onRemove={onRemove}
          />
        ))}
    </div>
  );
};
