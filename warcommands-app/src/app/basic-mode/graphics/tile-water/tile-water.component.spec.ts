import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileWaterComponent } from './tile-water.component';

describe('TileWaterComponent', () => {
  let component: TileWaterComponent;
  let fixture: ComponentFixture<TileWaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileWaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
