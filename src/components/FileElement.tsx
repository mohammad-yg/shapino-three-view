import React, { FC } from "react";
import { VscEdit, VscFile } from "react-icons/vsc";

type Props = {
  name: string;
};

export const FileElement: FC<Props> = ({ name }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <VscFile />
          <span>{name}</span>
        </div>
        <div className="flex items-center gap-2">
          <VscEdit className="cursor-pointer" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
