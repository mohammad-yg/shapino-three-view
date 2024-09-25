import { TreeElement } from "./TreeElement";
import { useDirectory } from "../hooks/directory-hook";

export const TreeView = () => {
  const { rootDirectory, addChild, renameDir } = useDirectory([
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
  ]);

  return (
    <div className="w-[300px]">
      {rootDirectory.subs.map((sub, index) => (
        <TreeElement key={index} directory={sub} onAddSub={addChild} onRename={renameDir} />
      ))}
    </div>
  );
};
