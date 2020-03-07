import { DragRef } from '@angular/cdk/drag-drop';
import { CommandWrapperDTO } from '../model/command-wrapper.dto';

export abstract class CommandDraggableElementRepositoryService {

    abstract addDraggableItemToDragList(dragableElement: DragRef, commandContainerId: string, position: number): void;

    abstract getDragList(commandContainerId: string): DragRef[];

    abstract removeDragItem(commandWrapperDTO: CommandWrapperDTO): void;

}
