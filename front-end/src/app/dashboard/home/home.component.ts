import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { HomeService } from './home.service';
import { DashboardService } from './../dashboard.service';
import { ParamMap, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('fileInput') myInputFileVar: ElementRef;
  fileUploader: FormData;
  accept = '.doc,.docx,.xm,.xls,.xlsx,.csv,.pdf,application/msword';
  options;
  data;
  pieChart;
  pieChartData;
  isDonut = true;
  displayedColumns: string[] = ['position', 'name', 'user_name', 'email', 'address'];
  dataSource;
  constructor(private service: HomeService, private dashboardService: DashboardService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.options = {
      chart: {
        type: 'discreteBarChart',
        height: 400,
        margin : {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        x: function(d) { return d.label; },
        y: function(d) { return d.value; },
        showValues: true,
        valueFormat: function(d) {
          return d3.format(',.2f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis'
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
        }
      }
    };

    // calling data table service
    this.service.getDashboardTableData().subscribe(res => {
      this.dataSource = res;
    });

    // calling pie chart data service
    this.service.getDashboardPieChartData().subscribe(res => {
      this.pieChartData = res;
    });

    // calling bar chart data
    this.service.getBarChartData().subscribe(res => {
      this.data = res;
    });

    this.getPieChartOptions(this.isDonut);

  }

  getPieChartOptions(donutVal) {
    this.pieChart = {
      chart: {
        type: 'pieChart',
        height: 370,
        donut: this.isDonut,
        x: function(d) {return d.key; },
        y: function(d) {return d.y; },
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
          }
        }
      }
    };
  }

  updateDonut(val) {
    this.isDonut = !this.isDonut;
    this.getPieChartOptions(this.isDonut);
  }
  submitFile() {
    console.log(this.fileUploader);
    this.service.submitFileData(this.fileUploader).subscribe(result => {
      console.log(result);
    });
  }

}
