import { GameLogicActionFilterDTO } from "src/warcommands/gameEngine/domain/game-logic-actions/model/game-logic-action-filter.dto";
import { GameLogicActionDTO } from "src/warcommands/gameEngine/domain/game-logic-actions/model/game-logic-action.dto";
import { GameLogicActionsRepositoryInterface } from "src/warcommands/gameEngine/domain/game-logic-actions/services/game-logic-actions-repository.interface";
import * as _ from 'lodash';


export class InMemoryGameLogicActionsRepositoryService implements GameLogicActionsRepositoryInterface {
    
    private itemList: Map<string, GameLogicActionDTO> = new Map();

    save(action: GameLogicActionDTO): void {
        this.itemList.set(action.id, _.clone(action));
    }
    
    findBy(filter: GameLogicActionFilterDTO): GameLogicActionDTO[] {
        const filteredList: GameLogicActionDTO[] = [];
        const filterKeyList = Object.keys(filter);

        this.itemList.forEach((item) => {
            
            let filtersMatch = true;

            for (const filterKey of filterKeyList) {
                const objectKey = filterKey as keyof GameLogicActionFilterDTO;
                if (item[objectKey] !== filter[objectKey]) {
                    filtersMatch = false;
                    break;
                }
            }

            if (filtersMatch) {
                filteredList.push(_.clone(item));
            }
        });

        return filteredList;
    }
    
    findById(actionId: string): GameLogicActionDTO {
        const filter: GameLogicActionFilterDTO = {
            id: actionId,
        }

        const actionList = this.findBy(filter);

        return actionList[0];
    }

    findAll(): GameLogicActionDTO[] {
        return [ ...this.itemList.values() ];
    }

    remove(action: GameLogicActionDTO): void {
        this.itemList.delete(action.id);
    }

}