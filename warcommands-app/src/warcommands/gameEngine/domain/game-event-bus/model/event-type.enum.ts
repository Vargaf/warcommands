
export enum EventType {
    Initialized = 'game:initialized',
    GameStarted = 'game:started',
    GeneratingMap = 'map:generating',
    MapGenerated = 'map:generated',
    GeneratingBase = 'base:generaing',
    BaseGenerated = 'base:generated',

    BaseSpawningUnit = 'base:spawningUnit',
    BaseSpawnedUnit = 'base:spawnedUnit',



    // Inner events
    CreateMinion = 'base:createMinion',
}