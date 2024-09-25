import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  VscCheck,
  VscEdit,
  VscFile,
  VscNewFile,
  VscNewFolder,
  VscTriangleRight,
} from "react-icons/vsc";
import { Directory, DirectoryFolder, DirectoryType } from "../utils/directory";

type Props = {
  onClickCollapse: () => void;
  isCollapse: boolean;
  directory: Directory;
  onAddSub: (
    name: string,
    type: DirectoryType,
    currentDir: DirectoryFolder
  ) => void;
  onRename: (name: string) => void;
};

export const NodeElement: FC<Props> = ({
  onClickCollapse,
  isCollapse,
  directory,
  onAddSub,
  onRename,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [editedFileName, setEditedFileName] = useState<string>(directory.name);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEditedFileName(e.target.value);
  };

  const handleInputBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    if (editMode) {
      setTimeout(() => {
        setEditedFileName(directory.name);
        setEditMode(false);
      }, 300);
    }
  };

  const handleClickCheck = () => {
    onRename(editedFileName);
    setEditMode(false);
  };

  const handleClickEdit = () => {
    setEditMode(true);
  };

  useEffect(() => {
    if (editMode) inputRef.current?.focus();
  }, [editMode]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          {directory.type === "file" ? (
            <VscFile />
          ) : (
            <VscTriangleRight
              className={`${
                isCollapse ? "rotate-90" : ""
              } transition-transform cursor-pointer`}
              onClick={onClickCollapse}
            />
          )}
          <input
            ref={inputRef}
            hidden={!editMode}
            value={editedFileName}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
          <span hidden={editMode}>{directory.name}</span>
        </div>
        <div className="flex items-center gap-2">
          {directory.type === "folder" && (
            <>
              <VscNewFile
                className="cursor-pointer"
                onClick={() =>
                  onAddSub("new-file", "file", directory as DirectoryFolder)
                }
              />
              <VscNewFolder
                className="cursor-pointer"
                onClick={() =>
                  onAddSub("new-folder", "file", directory as DirectoryFolder)
                }
              />
            </>
          )}

          {editMode ? (
            <VscCheck className="cursor-pointer" onClick={handleClickCheck} />
          ) : (
            <VscEdit className="cursor-pointer" onClick={handleClickEdit} />
          )}
        </div>
      </div>
    </div>
  );
};
