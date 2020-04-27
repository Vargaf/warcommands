
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
    BuildingRemovedUnitFromQueue = 'building:removedUnitFromQueue',



    // Inner events
    CreateUnitOnBuilding = 'building:createUnit'
}