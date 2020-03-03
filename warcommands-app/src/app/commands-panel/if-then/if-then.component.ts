import { Component, OnInit, Input } from '@angular/core';
import { IfThenCommandEntity } from 'src/warcommands/commands/domain/command/model/if-then-command.entity';

@Component({
  selector: 'app-if-then',
  templateUrl: './if-then.component.html',
  styleUrls: ['./if-then.component.scss']
})
export class IfThenComponent implements OnInit {

  @Input() commandData: IfThenCommandEntity;

  thenCommandContainerId: string = undefined;

  constructor() {
   }

  ngOnInit() {
    if (this.commandData) {
      this.thenCommandContainerId = this.commandData.innerCommandContainerIdList.thenCommandContainerId;
    }
  }
}
