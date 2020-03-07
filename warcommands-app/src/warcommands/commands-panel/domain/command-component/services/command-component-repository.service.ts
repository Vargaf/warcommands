import { ComponentRef } from '@angular/core';

export abstract class CommandComponentRepositoryService {

    abstract save(commandComponent: ComponentRef<any>): void;

    abstract findByCommandId(commandId: string): ComponentRef<any>;

    abstract remove(commandId: string): void;

}
