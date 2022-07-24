import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {TileGrassComponent} from './tile-grass.component';
import {
    GAME_CONFIG,
    GAME_ENGINE_BASIC_MODE_CONFIGURATION
} from "../../../../warcommands/basic-mode/game-engine-basic-mode-configurations";
import {TileType} from "../../../../warcommands/gameEngine/domain/maps/model/tile-type.enum";

describe('TileGrassComponent', () => {
    let component: TileGrassComponent;
    let fixture: ComponentFixture<TileGrassComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TileGrassComponent],
            providers: [
                {provide: GAME_CONFIG, useValue: GAME_ENGINE_BASIC_MODE_CONFIGURATION}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TileGrassComponent);
        component = fixture.componentInstance;
        component.data = {type: TileType.Grass, xCoordinate: 0, yCoordinate: 0};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
