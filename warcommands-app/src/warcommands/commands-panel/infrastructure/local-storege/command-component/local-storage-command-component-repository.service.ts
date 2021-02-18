import { Injectable, ComponentRef } from '@angular/core';
import { CommandComponentRepositoryService } from 'src/warcommands/commands-panel/domain/command-component/services/command-component-repository.service';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageCommandComponentRepositoryService implements CommandComponentRepositoryService {

    private commandComponentList: Map<string, ComponentRef<any>> = new Map<string, ComponentRef<any>>();

    save(commandComponent: ComponentRef<any>): void {
        this.commandComponentList.set(commandComponent.instance.commandData.id, commandComponent);
    }

    findByCommandId(commandId: string): ComponentRef<any> {
       return <ComponentRef<any>>this.commandComponentList.get(commandId);
    }

    remove(commandId: string): void {
       this.commandComponentList.delete(commandId);
    }
}