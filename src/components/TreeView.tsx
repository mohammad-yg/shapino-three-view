import { useState } from "react";
import { DirectoryFolder } from "../utils/directory";
import { TreeElement } from "./TreeElement";

export const TreeView = () => {
  const [rootDirectory, setRootDirectory] = useState<DirectoryFolder>({
    name: "root",
    type: "folder",
    subs: [
      {
        name: "file-1",
        type: "file",
      },
      {
        name: "file-2",
        type: "file",
      },
      {
        name: "folder-1",
        type: "folder",
        subs: [],
      },
      {
        name: "folder-2",
        type: "folder",
        subs: [
          {
            name: "folder-2-1",
            type: "folder",
            subs: [
              {
                name: "file-2-1-1",
                type: "file",
              },
            ],
          },
          {
            name: "file-2-2",
            type: "file",
          },
        ],
      },
    ],
  });

  return (
    <div className="w-[300px]">
      {rootDirectory.subs.map((sub, index) => (
        <TreeElement key={index} directory={sub} />
      ))}
    </div>
  );
};
