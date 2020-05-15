export interface CommandContainerDTO {
    id: string;
    fileId: string;
    parentCommandId: string;
    commands: Array<string>;
}

export interface CommandContainerListDTO {
    [id: string]: CommandContainerDTO;
}
