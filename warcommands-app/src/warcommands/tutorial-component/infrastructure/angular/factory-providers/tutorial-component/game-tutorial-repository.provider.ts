import {LocalStorageGameTutorialRepository} from "../../../local-storage/local-storage-game-tutorial-repository";

const factory = () => {
    return new LocalStorageGameTutorialRepository();
};

export const provider = {
    provide: LocalStorageGameTutorialRepository,
    useFactory: factory,
    deps: []
}
