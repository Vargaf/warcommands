import {Component, Inject, OnInit} from '@angular/core';
import {EventBusInterface} from "../../../warcommands/shared/domain/event-bus/event-bus-interface";
import {TutorialEventTypes} from "../../../warcommands/tutorial/domain/tutorial/events/tutorial-event-types.enum";
import {EventInterface} from "../../../warcommands/shared/domain/event-bus/event.interface";
import {ModalPanelService} from "../../modal-panel/modal-panel.service";
import {GameTutorialService} from "../../../warcommands/tutorial/domain/tutorial/services/game-tutorial.service";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(
      @Inject('EventBusInterface') private eventBus: EventBusInterface,
      private modalPanelService: ModalPanelService,
      private gameTutorialService: GameTutorialService
  ) { }

  ngOnInit(): void {
      const tutorialWelcomePageOpenedEvent: EventInterface = {
          data: {},
          type: TutorialEventTypes.TutorialWelcomePageOpened
      };
      this.eventBus.cast(tutorialWelcomePageOpenedEvent);
  }

  close(): void {
      this.modalPanelService.remove();
      this.gameTutorialService.finishWelcomeStep();
  }

}
