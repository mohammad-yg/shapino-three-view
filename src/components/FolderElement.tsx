import { FC } from "react";
import { VscNewFile, VscNewFolder, VscTriangleRight } from "react-icons/vsc";

type Props = {
  onClickCollapse: () => void;
  isCollapse: boolean;
  name: string;
  onAddFile: (name: string) => void;
  onAddFolder: (name: string) => void;
};

export const FolderElement: FC<Props> = ({
  onClickCollapse,
  isCollapse,
  name,
  onAddFile,
  onAddFolder,
}) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <div className="cursor-pointer" onClick={onClickCollapse}>
            <VscTriangleRight
              className={`${
                isCollapse ? "rotate-90" : ""
              } transition-transform`}
            />
          </div>
          <span>{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <VscNewFile
            className="cursor-pointer"
            onClick={() => onAddFile('new file')}
          />
          <VscNewFolder
            className="cursor-pointer"
            onClick={() => onAddFolder('new folder')}
          />
        </div>
      </div>
    </div>
  );
};
