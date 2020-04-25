
export enum EventType {
    Initialized = 'game:initialized',
    GameStarted = 'game:started',
    GeneratingMap = 'map:generating',
    MapGenerated = 'map:generated',
    GeneratingBase = 'base:generaing',
    BaseGenerated = 'base:generated',

    BuildingSpawningUnit = 'building:spawningUnit',
    BuildingSpawnedUnit = 'building:spawnedUnit',
    BuildingQueueingUnit = 'building:queueingUnit',



    // Inner events
    CreateUnitOnBuilding = 'building:createUnit'
}