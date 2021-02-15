import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileGrassComponent } from './tile-grass.component';

describe('TileGrassComponent', () => {
  let component: TileGrassComponent;
  let fixture: ComponentFixture<TileGrassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileGrassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileGrassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
