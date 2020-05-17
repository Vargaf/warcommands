import { Injectable } from "@angular/core";
import { FileJsonDTO, CommandContainerJsonDTO, CommandJsonDTO, ClassMemberJsonDTO } from '../model/file-json.dto';
import { FileDTO } from '../model/file.dto';
import { CommandContainerRepositoryService } from '../../command-container/services/command-container-repository.service';
import { CommandRepositoryService } from '../../command/services/command-repository.service';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';
import { ClassMemberDTO } from '../../command/model/class-definition/class-member.dto';


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
        const classMemberChained = this.buildClassMember(command.classMember);
        const commandContainerJsonList: { [index: string]: CommandContainerJsonDTO } = {};

        // tslint:disable-next-line: forin
        for (const commandContainerIndex in command.innerCommandContainerIdList) {
            const commandContainerId = command.innerCommandContainerIdList[commandContainerIndex];
            const commandContainetJson: CommandContainerJsonDTO = this.buildCommandContainerJSON(commandContainerId);

            commandContainerJsonList[commandContainerIndex] = commandContainetJson;
        }

        return {
            id: command.id,
            type: command.type,
            data: command.data,
            commandContainerList: commandContainerJsonList,
            classMember: classMemberChained
        };

    }

    private buildClassMember(classMember: ClassMemberDTO): ClassMemberJsonDTO {

        if(!classMember) {
            return null;
        } else {
            return {
                className: classMember.className,
                memberName: classMember.memberName,
                args: classMember.args || [],
                methodChained: this.buildClassMember(classMember.methodChained)
            }
        }

    }

}