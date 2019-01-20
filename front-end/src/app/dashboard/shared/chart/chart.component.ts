import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() options;
  @Input() data;
  @Input() total;
  constructor() { }

  ngOnInit() {
    // this.options = {
    //   chart: {
    //     type: 'pieChart',
    //     height: 500,
    //     donut: true,
    //     x: function(d) {return d.key; },
    //     y: function(d) {return d.y; },
    //     showLabels: true,
    //     duration: 500,
    //     labelThreshold: 0.01,
    //     labelSunbeamLayout: true,
    //     legend: {
    //       margin: {
    //         top: 5,
    //         right: 35,
    //         bottom: 5,
    //         left: 0
    //       }
    //     }
    //   }
    // };
    // this.data = [
    //   {
    //     key: 'One',
    //     y: 5
    //   },
    //   {
    //     key: 'Two',
    //     y: 2
    //   },
    //   {
    //     key: 'Three',
    //     y: 9
    //   },
    //   {
    //     key: 'Four',
    //     y: 7
    //   },
    //   {
    //     key: 'Five',
    //     y: 4
    //   },
    //   {
    //     key: 'Six',
    //     y: 3
    //   },
    //   {
    //     key: 'Seven',
    //     y: .5
    //   }
    // ];
  }

}
