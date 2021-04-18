import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { ToggleCommandsPanelService } from "./toggle-commands-panel.service";

@Injectable({
    providedIn: 'root'
})
export class ToggleCommandListPanelService {

    private isCommandListPanelVisibleBehavior: BehaviorSubject<boolean> = <BehaviorSubject<boolean>>new BehaviorSubject(true);

    private isCommandListPanelVisible: boolean = true;

    private wasCommandListVisibleBefore: boolean = true;

    private isCommandPanelVisible: boolean = true;

    constructor(
        private readonly toggleCommandsPanelService: ToggleCommandsPanelService,
    ) {
        this.toggleCommandsPanelService.commandPanelVisibleListener().subscribe((isCommandPanelVisible) => {

            this.isCommandPanelVisible = isCommandPanelVisible;

            if(!isCommandPanelVisible) {
                this.wasCommandListVisibleBefore = this.isCommandListPanelVisible;
                this.hidePanel();
            } else {
                if(this.wasCommandListVisibleBefore) {
                    this.showPanel();
                }
            }
        });
    }

    showPanel(): void {
        this.isCommandListPanelVisible = true;
        this.isCommandListPanelVisibleBehavior.next(true);

        if(!this.isCommandPanelVisible) {
            this.toggleCommandsPanelService.showPanel();
        }
    }

    hidePanel(): void {
        this.isCommandListPanelVisible = false;
        this.isCommandListPanelVisibleBehavior.next(false);
    }

    togglePanel(): void {
        if(this.isCommandListPanelVisible) {
            this.hidePanel();
        } else {
            this.showPanel();
        }
    }

    panelVisibleListener(): BehaviorSubject<boolean> {
        return this.isCommandListPanelVisibleBehavior;
    }

}