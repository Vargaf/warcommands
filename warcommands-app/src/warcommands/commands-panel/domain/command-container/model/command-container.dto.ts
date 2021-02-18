export interface CommandContainerDTO {
    id: string;
    fileId: string;
    parentCommandId: string | null;
    commands: Array<string>;
}

export interface CommandContainerListDTO {
    [id: string]: CommandContainerDTO;
}
