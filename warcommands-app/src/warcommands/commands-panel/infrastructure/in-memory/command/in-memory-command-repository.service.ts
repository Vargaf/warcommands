import { Injectable } from '@angular/core';
import { CommandRepositoryService } from '../../../domain/command/services/command-repository.service';
import { GenericCommandDTO } from '../../../domain/command/model/generic-command.dto';
import { ClassMemberDTO } from 'src/warcommands/commands-panel/domain/command/model/class-definition/class-member.dto';

interface CommandList {
    [ index: string]: GenericCommandDTO;
}

@Injectable({
    providedIn: 'root'
})
export class InMemoryCommandRepositoryService implements CommandRepositoryService {

    private commandsList: CommandList = {};

    save(command: GenericCommandDTO): void {
        const commandCopy = { ...command };
        this.commandsList[command.id] = commandCopy;
    }

    findById(commandId: string): GenericCommandDTO {
        const command = this.commandsList[commandId];
        return { ...command };
    }

    remove(commandId: string): void {
        delete this.commandsList[commandId];
    }

    addClassMember(commandId: string, classMember: ClassMemberDTO): void {
        const command = this.findById(commandId);
        command.classMember = classMember;
        this.save(command);
    }

}