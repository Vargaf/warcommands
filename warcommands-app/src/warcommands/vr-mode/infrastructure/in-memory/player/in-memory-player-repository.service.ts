import { PlayerFilterDTO } from "src/warcommands/vr-mode/domain/players/model/player-filter.dto";
import { PlayerDTO } from "src/warcommands/vr-mode/domain/players/model/player.dto";
import { PlayerRepositoryService } from "src/warcommands/vr-mode/domain/players/services/player-repository.service";
import * as _ from 'lodash';

export class InMemoryPlayerRepositoryService implements PlayerRepositoryService {

    private playerList: Map<string, PlayerDTO> = new Map<string, PlayerDTO>();

    save(player: PlayerDTO): void {
        this.playerList.set(<string>player.id, _.clone(player));
    }

    findBy(filter: PlayerFilterDTO): PlayerDTO[] {
        const filteredList: PlayerDTO[] = [];
        const filterKeyList = Object.keys(filter);

        this.playerList.forEach((player) => {
            
            let filtersMatch = true;

            for (const filterKey of filterKeyList) {
                const objectKey = filterKey as keyof PlayerDTO;
                if (player[objectKey] !== filter[objectKey]) {
                    filtersMatch = false;
                    break;
                }
            }

            if (filtersMatch) {
                filteredList.push(_.cloneDeep(player));
            }
        });

        return filteredList;
    }

    findCurrentPlayer(): PlayerDTO {
        const filter: PlayerFilterDTO = {
            isCurrentPlayer: true
        }

        const playerList: PlayerDTO[] = this.findBy(filter);

        return playerList[0];
    }

}