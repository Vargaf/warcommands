import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandDropComponent } from './command-drop.component';

describe('CommandDropComponent', () => {
  let component: CommandDropComponent;
  let fixture: ComponentFixture<CommandDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
