import React, { FC, useEffect, useRef, useState } from "react";
import { VscCheck, VscEdit, VscFile } from "react-icons/vsc";

type Props = {
  name: string;
  onRename: (name: string) => void;
};

export const FileElement: FC<Props> = ({ name, onRename }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [editedFileName, setEditedFileName] = useState<string>(name);
  const [editMode, setIsEditMode] = useState<boolean>(false);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEditedFileName(e.target.value);
  };

  const handleClickCheck = () => {
    onRename(editedFileName)
    setIsEditMode(false);
  };

  const handleClickEdit = () => {
    setIsEditMode(true);
  };

  useEffect(() => {
    if (editMode) inputRef.current?.focus();
  }, [editMode]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <VscFile />
          <input
            ref={inputRef}
            hidden={!editMode}
            value={editedFileName}
            onChange={handleOnChange}
          />
          <span hidden={editMode}>{name}</span>
        </div>
        <div className="flex items-center gap-2">
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
