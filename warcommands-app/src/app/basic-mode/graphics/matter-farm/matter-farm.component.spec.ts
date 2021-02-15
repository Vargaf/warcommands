import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterFarmComponent } from './matter-farm.component';

describe('MatterFarmComponent', () => {
  let component: MatterFarmComponent;
  let fixture: ComponentFixture<MatterFarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatterFarmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterFarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
