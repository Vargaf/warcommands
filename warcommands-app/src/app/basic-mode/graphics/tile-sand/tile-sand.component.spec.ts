import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileSandComponent } from './tile-sand.component';

describe('TileSandComponent', () => {
  let component: TileSandComponent;
  let fixture: ComponentFixture<TileSandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileSandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileSandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
