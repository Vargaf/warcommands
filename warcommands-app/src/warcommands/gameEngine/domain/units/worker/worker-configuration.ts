
export const WorkerConfiguration = {
    cost: {
        matter: 50,
        energy: 10
    },
    attributes: {
        armor: 10,
        fire: 10,
        speed: 1500,
        hitPoints: 100
    },
    spawnTime: 10 * 1000,
    resourcesMaxCapacity: {
        matter: 20,
        energy: 4
    },
    extractionSpeed: {
        matter: 2 / 1000, // 2 units each second,
        energy: 0.4 / 1000, // 0.4 units each second
    },
    deliverySpeed: {
        matter: 4 / 1000, // 4 units each second
        energy: 0.8 / 1000, // 0.8 units each second
    },
    buildingSpeed: 100 / 1000, // 100 hit points each second
    maxCargo: {
        matter: 20,
        energy: 4
    }
}