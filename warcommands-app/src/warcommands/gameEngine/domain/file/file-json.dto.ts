import { ClassNameENUM } from '../command/model/class-name.enum';
import { CommandType } from '../command/model/command-type.enum';

export interface ClassMemberJsonDTO {
    className: ClassNameENUM;
    memberName: string;
    args: any[];
    methodChained: ClassMemberJsonDTO;
}

export interface CommandJsonDTO {
    id: string;
    type: CommandType;
    data: any;
    commandContainerList: { [index: string]: CommandContainerJsonDTO };
    classMember: ClassMemberJsonDTO | null;
}

export interface CommandContainerJsonDTO {
    id: string;
    commands: CommandJsonDTO[];
}

export interface FileJsonDTO {
    id: string;
    name: string;
    playerId: string;
    commandContainer: CommandContainerJsonDTO;
}
