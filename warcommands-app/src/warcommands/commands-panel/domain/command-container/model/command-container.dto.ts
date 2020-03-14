export interface CommandContainerDTO {
    id: string;
    fileId: string;
    commands: Array<string>;
}

export interface CommandContainerListDTO {
    [id: string]: CommandContainerDTO;
}
