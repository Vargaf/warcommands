import { CommandListInterface } from '../../command/model/command-list.interface';

export interface FileEntity {
    id: string;
    commands: CommandListInterface;
}
