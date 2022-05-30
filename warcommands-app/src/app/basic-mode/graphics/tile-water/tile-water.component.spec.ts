import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TileWaterComponent} from './tile-water.component';
import {
    GAME_CONFIG,
    GAME_ENGINE_BASIC_MODE_CONFIGURATION
} from "../../../../warcommands/basic-mode/game-engine-basic-mode-configurations";
import {TileType} from "../../../../warcommands/gameEngine/domain/maps/model/tile-type.enum";

describe('TileWaterComponent', () => {
    let component: TileWaterComponent;
    let fixture: ComponentFixture<TileWaterComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TileWaterComponent],
            providers: [
                {provide: GAME_CONFIG, useValue: GAME_ENGINE_BASIC_MODE_CONFIGURATION}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TileWaterComponent);
        component = fixture.componentInstance;
        component.data = {type: TileType.Water, xCoordinate: 0, yCoordinate: 0};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
