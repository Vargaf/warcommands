import { Component, OnInit, Input } from '@angular/core';
import { IfThenElseCommandEntity } from 'src/warcommands/commands/domain/command/model/if-then-else-command.entity';

@Component({
  selector: 'app-if-then-else',
  templateUrl: './if-then-else.component.html',
  styleUrls: ['./if-then-else.component.scss']
})
export class IfThenElseComponent implements OnInit {

  @Input() commandData: IfThenElseCommandEntity;

  thenCommandContainerId: string;
  elseCommandContainerId: string;

  constructor() { }

  ngOnInit() {
    if (this.commandData) {
      this.thenCommandContainerId = this.commandData.innerCommandContainerIdList.thenCommandContainerId;
      this.elseCommandContainerId = this.commandData.innerCommandContainerIdList.elseCommandContainerId;
    }
  }

}
