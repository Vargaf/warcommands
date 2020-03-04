import { Component, OnInit } from '@angular/core';
import { CommandsPanelManagerService } from 'src/warcommands/commands-panel/domain/commands-panel/services/commands-panel-manager.service';

@Component({
  selector: 'app-commands-panel',
  templateUrl: './commands-panel.component.html',
  styleUrls: ['./commands-panel.component.scss']
})
export class CommandsPanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
