import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyFarmComponent } from './energy-farm.component';

describe('EnergyFarmComponent', () => {
  let component: EnergyFarmComponent;
  let fixture: ComponentFixture<EnergyFarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyFarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
