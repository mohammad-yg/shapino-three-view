import { Directory, DirectoryFolder, DirectoryFolderDto, DirectoryFileDto, DirectoryFile } from "./directory.type"

export const getDirectoryRoot = (dir: Directory): DirectoryFolder => {
    if (dir.parent === null)
        return dir as DirectoryFolder

    return getDirectoryRoot(dir.parent)
}

export const adaptDirectoryDtoToDto = (dto: DirectoryFolderDto | DirectoryFileDto, parent: Directory): DirectoryFolder | DirectoryFile => {
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

        directory.subs = dto.subs.map(dtoSub => adaptDirectoryDtoToDto(dtoSub, directory))

        return directory
    }
}