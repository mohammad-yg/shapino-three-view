import { FC, useState } from "react";
import { DirectoryFile, DirectoryFolder } from "../utils/directory";
import {
  VscTriangleRight,
  VscNewFile,
  VscNewFolder,
  VscFile,
} from "react-icons/vsc";
import { FileElement } from "./FileElement";
import { FolderElement } from "./FolderElement";

type Props = {
  directory: DirectoryFile | DirectoryFolder;
};

export const TreeElement: FC<Props> = ({ directory }) => {
  const [isCollapse, setIsCollapse] = useState(false);

  const handleCollapseButtonClick = () => {
    setIsCollapse((prev) => !prev);
  };

  return (
    <div className="ms-3">
      {directory.type === "file" && <FileElement name={directory.name} />}
      {directory.type === "folder" && (
        <FolderElement
          onClickCollapse={handleCollapseButtonClick}
          isCollapse={isCollapse}
          name={directory.name}
        />
      )}
      {directory.type === "folder" &&
        isCollapse &&
        directory.subs.map((dr) => <TreeElement directory={dr} />)}
    </div>
  );
};
