import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { CommandDirective } from '../command.directive';
import { CreateMinionComponent } from '../create-minion/create-minion.component';

@Component({
  selector: 'app-game-loop',
  templateUrl: './game-loop.component.html',
  styleUrls: ['./game-loop.component.scss']
})
export class GameLoopComponent implements OnInit {

  @ViewChild(CommandDirective, { static: true })
  public commandContainer: CommandDirective;

  constructor(
    public componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  addCommand() {
    const viewContainerRef = this.commandContainer.viewContainerRef;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(CreateMinionComponent);
    viewContainerRef.createComponent(componentFactory);
  }

}
