type DirectoryType = 'file' | 'folder'

interface Directory {
    name: string,
    type: DirectoryType
}

interface DirectoryFile extends Directory {
    type: 'file'
}

interface DirectoryFolder extends Directory {
    type: 'folder'
    subs: (DirectoryFile | DirectoryFolder)[]
}

export type {
    Directory,
    DirectoryFile,
    DirectoryFolder,
    DirectoryType
}