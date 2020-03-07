import { Injectable, ComponentRef } from '@angular/core';
import { CommandComponentRepositoryService } from 'src/warcommands/commands-panel/domain/command-component/services/command-component-repository.service';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageCommandComponentRepositoryService implements CommandComponentRepositoryService {

    private commandComponentList: ComponentRef<any>[] = [];

    save(commandComponent: ComponentRef<any>): void {
        this.commandComponentList.push(commandComponent);
    }

    findByCommandId(commandId: string): ComponentRef<any> {
        return this.commandComponentList.find((commandComponent) => {
            return commandComponent.instance.commandData.id === commandId;
        });
    }

    remove(commandId: string): void {
        const newList = this.commandComponentList.filter((commandComponent) => {
            return commandComponent.instance.commandData.id !== commandId;
        });

        this.commandComponentList = newList;
    }


}