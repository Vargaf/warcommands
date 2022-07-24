import { Injectable } from "@angular/core";
import { FileJsonDTO, CommandContainerJsonDTO, CommandJsonDTO, ClassMemberJsonDTO } from '../model/file-json.dto';
import { FileDTO } from '../model/file.dto';
import { CommandContainerRepositoryService } from '../../command-container/services/command-container-repository.service';
import { CommandRepositoryService } from '../../command/services/command-repository.service';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';
import { ClassMemberDTO } from '../../command/model/class-definition/class-member.dto';
import { ClassNameENUM } from "src/warcommands/gameEngine/domain/command/model/class-name.enum";


@Injectable({
    providedIn: 'root'
})
export class JSONFileGeneratorService {

    constructor(
        private readonly commandContainerRepositoryService: CommandContainerRepositoryService,
        private readonly commandRepositoryService: CommandRepositoryService
    ) {

    }

    buildFileJSON(file: FileDTO): FileJsonDTO {

        const commandContainer: CommandContainerJsonDTO = this.buildCommandContainerJSON(file.commandContainerId);

        return {
            id: file.id,
            name: file.name,
            playerId: file.playerId,
            commandContainer
        };
    }

    private buildCommandContainerJSON(commandContainerId: string): CommandContainerJsonDTO {
        const commandContainer = this.commandContainerRepositoryService.findById(commandContainerId);
        const commandJsonList: CommandJsonDTO[] = [];

        for (const commandId of commandContainer.commands) {
            const commandJsonDTO: CommandJsonDTO = this.buildCommandJSON(commandId);
            commandJsonList.push(commandJsonDTO);
        }

        return {
            id: commandContainer.id,
            commands: commandJsonList
        };
    }

    private buildCommandJSON(commandId: string): CommandJsonDTO {

        const command: GenericCommandDTO = this.commandRepositoryService.findById(commandId);
        const classMemberChained = this.buildClassMember(<ClassMemberDTO>command.classMember);
        const commandContainerJsonList: { [index: string]: CommandContainerJsonDTO } = {};

        // eslint-disable-next-line guard-for-in
        for (const commandContainerIndex in command.innerCommandContainerIdList) {
            const commandContainerId = command.innerCommandContainerIdList[commandContainerIndex];

            commandContainerJsonList[commandContainerIndex] = this.buildCommandContainerJSON(commandContainerId);
        }

        return {
            id: command.id,
            type: command.type,
            data: command.data,
            commandContainerList: commandContainerJsonList,
            classMember: <ClassMemberJsonDTO>classMemberChained
        };

    }

    private buildClassMember(classMember: ClassMemberDTO): ClassMemberJsonDTO | null {

        if(!classMember) {
            return null;
        } else {
            return {
                className: classMember.className,
                returnClassName: <ClassNameENUM>classMember.returnClassName,
                memberName: classMember.memberName,
                args: classMember.args || [],
                methodChained: <ClassMemberJsonDTO>this.buildClassMember(<ClassMemberDTO>classMember.methodChained)
            }
        }

    }

}
