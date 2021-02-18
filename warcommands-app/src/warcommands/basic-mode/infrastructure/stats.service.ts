import { Injectable } from '@angular/core';
import * as Stats from 'stats.js';

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
