import { Injectable } from '@angular/core';
import Stats from 'node_modules/stats.js/src/Stats.js';

@Injectable({
    providedIn: 'root'
})
export class StatsService {

    private stats: any;

    constructor() {
        this.stats = new Stats();
    }

    getDom() {
        return this.stats.dom;
    }

    update() {
        this.stats.update();
    }
}
