import { Component, OnInit, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { GAME_CONFIG, GameEngineBasicModeConfiguration } from 'src/warcommands/basic-mode/game-engine-basic-mode-configurations';
import { BaseEntityInterface } from 'src/warcommands/basic-mode/domain/building/base/base-entity-interface';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  @Input() data: BaseEntityInterface;

  @ViewChild('base', { static: true })
  public baseElement: ElementRef<HTMLDivElement>;

  @ViewChild('spawn', { static: true })
  public spawnElement: ElementRef<HTMLDivElement>;

  constructor(
    @Inject(GAME_CONFIG) private gameConfig: GameEngineBasicModeConfiguration
  ) { }

  ngOnInit() {

    const baseWidth = this.gameConfig.tileSize * this.data.sizeWidth;
    const baseHeight = this.gameConfig.tileSize * this.data.sizeHeight;

    const spawnSize = this.gameConfig.tileSize;
    const spawnLeft = this.gameConfig.tileSize * this.data.spawnRelativeCoordinates.xCoordinate;
    const spawnTop = this.gameConfig.tileSize * this.data.spawnRelativeCoordinates.yCoordinate;

    this.baseElement.nativeElement.style.setProperty('width', baseWidth + 'px');
    this.baseElement.nativeElement.style.setProperty('height', baseHeight + 'px');
    this.baseElement.nativeElement.style.setProperty('left', this.data.xCoordinate * this.gameConfig.tileSize + 'px');
    this.baseElement.nativeElement.style.setProperty('top', this.data.yCoordinate * this.gameConfig.tileSize + 'px');

    this.spawnElement.nativeElement.style.setProperty('width', spawnSize + 'px');
    this.spawnElement.nativeElement.style.setProperty('height', spawnSize + 'px');
    this.spawnElement.nativeElement.style.setProperty('left', this.data.xCoordinate * this.gameConfig.tileSize + 'px');
    this.spawnElement.nativeElement.style.setProperty('top', spawnTop + 'px');
    this.spawnElement.nativeElement.style.setProperty('left', spawnLeft + 'px');
  }

}
