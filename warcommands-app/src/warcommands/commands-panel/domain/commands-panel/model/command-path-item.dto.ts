import { CommandPathItemType } from 'src/warcommands/commands-panel/domain/commands-panel/model/command-path-item-type.enum';


export interface CommandPathItemDTO {
    type: CommandPathItemType;
    itemId: string;
}