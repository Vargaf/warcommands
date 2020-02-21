import { CommandListInterface } from '../../command/model/command-list.interface';

export interface PageEntity {
    id: string;
    commands: CommandListInterface;
}
