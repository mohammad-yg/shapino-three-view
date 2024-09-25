import { useEffect, useState } from "react";
import { adaptDirectoryDtoToDto, Directory, DirectoryFile, DirectoryFileDto, DirectoryFolder, DirectoryFolderDto, DirectoryType, getDirectoryRoot } from "../utils/directory";

const useDirectory = (initialDirectories: (DirectoryFolderDto | DirectoryFileDto)[]) => {
    const [rootDirectory, setRootDirectory] = useState<DirectoryFolder>({
        parent: null,
        name: "root",
        type: "folder",
        subs: []
    });

    // initial
    useEffect(() => {
        let root = {
            parent: null,
            name: "root",
            type: "folder",
            subs: [],
        } as DirectoryFolder

        root.subs = initialDirectories.map(_ => adaptDirectoryDtoToDto(_, root));
        setRootDirectory(root)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // add a directory (node) tp currentDir subs
    const addChild = (name: string, type: DirectoryType, currentDir: DirectoryFolder) => {
        currentDir.subs.push({
            name: name,
            parent: currentDir,
            subs: [],
            type: type
        })

        currentDir.subs = [...currentDir.subs];

        let currentRoot = getDirectoryRoot(currentDir);

        //save changes (set updated root directory)
        setRootDirectory({ ...currentRoot });
    }


    const renameDir = (name: string, currentDir: Directory) => {
        currentDir.name = name;

        let currentRoot = getDirectoryRoot(currentDir);

        setRootDirectory({ ...currentRoot });
    }

    const removeDir = (currentDir: Directory) => {
        let parent = currentDir.parent as DirectoryFolder;

        //remove node from parent subs
        parent.subs.splice(parent.subs.indexOf(currentDir as DirectoryFile | DirectoryFolder), 1)

        let currentRoot = getDirectoryRoot(currentDir);

        setRootDirectory({ ...currentRoot });
    }


    return {
        rootDirectory,
        addChild,
        renameDir,
        removeDir
    }
}

export { useDirectory }