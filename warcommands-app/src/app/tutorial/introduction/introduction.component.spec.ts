import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IntroductionComponent} from './introduction.component';
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('IntroductionComponent', () => {
    let component: IntroductionComponent;
    let fixture: ComponentFixture<IntroductionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IntroductionComponent],
            imports: [MatTabsModule, BrowserAnimationsModule],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IntroductionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
