import { CommandType } from './command-type.enum';
import { GenericCommandDTO } from './generic-command.dto';

export interface CreateMinionCommandEntity extends GenericCommandDTO {
    type: CommandType.CreateMinion;
}
