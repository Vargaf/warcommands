import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TutorialComponent} from './tutorial.component';
import {
    TutorialComponentToggleServiceInterface
} from "../../../warcommands/tutorial/domain/tutorial/services/tutorial-component-toggle-service.interface";
import {IntroductionComponent} from "../introduction/introduction.component";
import {MatIconModule} from "@angular/material/icon";
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('TutorialComponent', () => {
    let component: TutorialComponent;
    let fixture: ComponentFixture<TutorialComponent>;

    let tutorialComponentToggleServiceInterfaceSpy;

    beforeEach(waitForAsync(() => {
        tutorialComponentToggleServiceInterfaceSpy = jasmine.createSpyObj('TutorialComponentToggleServiceInterface', ['close'])
        TestBed.configureTestingModule({
            declarations: [TutorialComponent, IntroductionComponent],
            imports: [MatIconModule, MatTabsModule, BrowserAnimationsModule],
            providers: [
                {provide: TutorialComponentToggleServiceInterface, useValue: tutorialComponentToggleServiceInterfaceSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TutorialComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
