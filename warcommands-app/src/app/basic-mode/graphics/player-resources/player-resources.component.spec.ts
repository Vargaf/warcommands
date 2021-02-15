import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerResourcesComponent } from './player-resources.component';

describe('PlayerResourcesComponent', () => {
  let component: PlayerResourcesComponent;
  let fixture: ComponentFixture<PlayerResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerResourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
