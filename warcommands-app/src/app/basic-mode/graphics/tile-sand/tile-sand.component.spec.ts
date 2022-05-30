import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TileSandComponent} from './tile-sand.component';
import {
    GAME_CONFIG,
    GAME_ENGINE_BASIC_MODE_CONFIGURATION
} from "../../../../warcommands/basic-mode/game-engine-basic-mode-configurations";
import {TileType} from "../../../../warcommands/gameEngine/domain/maps/model/tile-type.enum";

describe('TileSandComponent', () => {
    let component: TileSandComponent;
    let fixture: ComponentFixture<TileSandComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TileSandComponent],
            providers: [
                {provide: GAME_CONFIG, useValue: GAME_ENGINE_BASIC_MODE_CONFIGURATION}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TileSandComponent);
        component = fixture.componentInstance;
        component.data = {
            type: TileType.Sand,
            xCoordinate: 0,
            yCoordinate: 0
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
