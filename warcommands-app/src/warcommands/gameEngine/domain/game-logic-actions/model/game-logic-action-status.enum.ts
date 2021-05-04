
export enum GameLogicActionStatusENUM {
    Created,            // The action has been created and is waiting to be initialized
    Initializing,       // The action has been initialized and is waiting to be able to be processed
    InProgress,         // Action created and initialized, it can be processed
    OnHold,             // Action on hold 
    Finished,           // Action finished, it shold be removed
}