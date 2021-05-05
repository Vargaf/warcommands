
export enum EventType {
    Initialized = 'game:initialized',
    GameStarted = 'game:started',
    GeneratingMap = 'map:generating',
    MapGenerated = 'map:generated',
    
    BuildingCreated = 'building:created',
    BuildingSpawningUnit = 'building:spawningUnit',
    BuildingSpawnedUnit = 'building:spawnedUnit',
    BuildingQueueingUnit = 'building:queueingUnit',
    BuildingRemovedUnitFromQueue = 'building:removedUnitFromQueue',

    BaseResourcesUpdated = 'base:resourcesUpdated',

    GameLogicActionUpdated = 'action:updated',



    // Inner events
    CreateUnitOnBuilding = 'building:createUnit'
}