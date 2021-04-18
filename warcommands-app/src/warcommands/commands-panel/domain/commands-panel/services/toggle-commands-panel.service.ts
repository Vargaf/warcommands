import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToggleCommandsPanelService {

    private isCommandPanelVisibleBehavior: BehaviorSubject<boolean> = <BehaviorSubject<boolean>>new BehaviorSubject(true);

    private isCommandPanelVisible: boolean = true;

    showPanel(): void {
        this.isCommandPanelVisible = true;
        this.isCommandPanelVisibleBehavior.next(true);
    }

    hidePanel(): void {
        this.isCommandPanelVisible = false;
        this.isCommandPanelVisibleBehavior.next(false);
    }

    togglePanel(): void {
        if(this.isCommandPanelVisible) {
            this.hidePanel();
        } else {
            this.showPanel();
        }
    }

    commandPanelVisibleListener(): BehaviorSubject<boolean> {
        return this.isCommandPanelVisibleBehavior;
    }

}