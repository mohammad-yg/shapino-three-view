import { useEffect, useState } from "react";
import { Directory, DirectoryFile, DirectoryFileDto, DirectoryFolder, DirectoryFolderDto, DirectoryType } from "../utils/directory";

const useDirectory = (initialDirectories: (DirectoryFolderDto | DirectoryFileDto)[]) => {
    const [rootDirectory, setRootDirectory] = useState<DirectoryFolder>({
        parent: null,
        name: "root",
        type: "folder",
        subs: []
    });

    useEffect(() => {
        let root = {
            parent: null,
            name: "root",
            type: "folder",
            subs: [],
        } as DirectoryFolder

        root.subs = initialDirectories.map(_ => mapDto(_, root));
        setRootDirectory(root)
    }, [])

    const addChild = (name: string, type: DirectoryType, currentDir: DirectoryFolder) => {
        currentDir.subs.push({
            name: name,
            parent: currentDir,
            subs: [],
            type: type
        })

        currentDir.subs = [...currentDir.subs];

        let currentRoot = getRoot(currentDir);

        setRootDirectory({ ...currentRoot });
    }

    const renameDir = (name: string, currentDir: Directory) => {
        currentDir.name = name;

        let currentRoot = getRoot(currentDir);

        setRootDirectory({ ...currentRoot });
    }


    return {
        rootDirectory,
        addChild,
        renameDir
    }
}

const getRoot = (dir: Directory): DirectoryFolder => {
    if (dir.parent === null)
        return dir as DirectoryFolder

    return getRoot(dir.parent)
}

const mapDto = (dto: DirectoryFolderDto | DirectoryFileDto, parent: Directory): DirectoryFolder | DirectoryFile => {
    if (dto.type === 'file')
        return {
            name: dto.name,
            type: 'file',
            parent: parent
        }
    else {
        var directory: DirectoryFolder = {
            name: dto.name,
            type: 'folder',
            parent: parent,
            subs: []
        }

        directory.subs = dto.subs.map(dtoSub => mapDto(dtoSub, directory))

        return directory
    }
}

export { useDirectory }