import { DragRef } from '@angular/cdk/drag-drop';
import { GenericCommandDTO } from '../../command/model/generic-command.dto';

export abstract class CommandDraggableElementRepositoryService {

    abstract addDraggableItemToDragList(dragableElement: DragRef, commandContainerId: string, position: number): void;

    abstract getDragList(commandContainerId: string): DragRef[];

    abstract removeDragItem(command: GenericCommandDTO, commandContainerId: string): void;

}
