import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StatsService } from 'src/warcommands/basic-mode/infrastructure/stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  @ViewChild('statsWrapper', { static: true })
  public statsElement: ElementRef<HTMLDivElement>;

  constructor(private statsService: StatsService) { }

  ngOnInit() {
    this.statsElement.nativeElement.appendChild(this.statsService.getDom());
  }

}
