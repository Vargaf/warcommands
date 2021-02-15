import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToggleCommandsPanelService {

    private isCommandPanelVisible: BehaviorSubject<boolean> = new BehaviorSubject(true);

    showPanel(): void {
        this.isCommandPanelVisible.next(true);
    }

    hidePanel(): void {
        this.isCommandPanelVisible.next(false);
    }

    commandPanelVisibleListener(): BehaviorSubject<boolean> {
        return this.isCommandPanelVisible;
    }

}