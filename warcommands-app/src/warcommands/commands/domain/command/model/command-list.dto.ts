import { CommandInterface } from './command.interface';

export interface CommandListDTO {
    [id: string]: CommandInterface;
}
