import { BehaviorSubject } from "rxjs";

export class AFrameStatsService {

    private isPanelVisibleBehavior: BehaviorSubject<boolean> = <BehaviorSubject<boolean>>new BehaviorSubject(false);

    private isPanelVisible: boolean = false;

    showPanel(): void {
        this.isPanelVisible = true;
        this.isPanelVisibleBehavior.next(true);
    }

    hidePanel(): void {
        this.isPanelVisible = false;
        this.isPanelVisibleBehavior.next(false);
    }

    togglePanel(): void {
        if(this.isPanelVisible) {
            this.hidePanel();
        } else {
            this.showPanel();
        }
    }

    panelVisibilityListener(): BehaviorSubject<boolean> {
        return this.isPanelVisibleBehavior;
    }

}