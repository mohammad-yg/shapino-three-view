import { FC, useState } from "react";
import {
  DirectoryFile,
  DirectoryFolder,
  DirectoryType,
} from "../utils/directory";
import { FileElement } from "./FileElement";
import { FolderElement } from "./FolderElement";

type Props = {
  directory: DirectoryFile | DirectoryFolder;
  onAddSub: (
    name: string,
    type: DirectoryType,
    currentDir: DirectoryFolder
  ) => void;
};

export const TreeElement: FC<Props> = ({ directory, onAddSub }) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const handleCollapseButtonClick = () => {
    setIsCollapse((prev) => !prev);
  };

  return (
    <div className="ms-3">
      {directory.type === "file" && (
        <FileElement
          name={directory.name}
          onRename={function (name: string): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
      {directory.type === "folder" && (
        <FolderElement
          onClickCollapse={handleCollapseButtonClick}
          isCollapse={isCollapse}
          name={directory.name}
          onAddFile={(name: string) => onAddSub(name, "file", directory)}
          onAddFolder={(name: string) => onAddSub(name, "folder", directory)}
        />
      )}
      {directory.type === "folder" &&
        isCollapse &&
        directory.subs.map((dr) => (
          <TreeElement directory={dr} onAddSub={onAddSub} />
        ))}
    </div>
  );
};
