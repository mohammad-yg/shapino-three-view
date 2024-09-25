type DirectoryType = 'file' | 'folder'

interface Directory {
    parent: Directory | null,
    name: string,
    type: DirectoryType,
}

interface DirectoryFile extends Directory {
    type: 'file'
}

interface DirectoryFolder extends Directory {
    type: 'folder'
    subs: (DirectoryFile | DirectoryFolder)[]
}

interface DirectoryDto {
    name: string,
    type: DirectoryType,
}

interface DirectoryFileDto extends DirectoryDto {
    type: 'file'
}

interface DirectoryFolderDto extends DirectoryDto {
    type: 'folder'
    subs: (DirectoryFileDto | DirectoryFolderDto)[],
}

export type {
    DirectoryType,

    Directory,
    DirectoryFile,
    DirectoryFolder,
    DirectoryDto,
    DirectoryFileDto,
    DirectoryFolderDto,
}