import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../services/ChatServices/chat-service.service';
import { CreatorChatDto } from "../../model/CreatorChatDto"
import { ChartConfiguration, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { CreatorServiceService } from '../../services/CreatorServices/creator-service.service';
import { GraphDto } from 'src/app/model/GraphDto';
import { SelectDto } from 'src/app/model/SelectDto';
@Component({
  selector: 'estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  listData: Array<GraphDto> = [];
  //select
  selectGraficas: number;



  public chartColors: Color[] = [
    {
      backgroundColor: ["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"]
    }];
  public lineChartData: ChartDataSets[] = [
    { data: [61, 59, 80, 65, 45, 55, 40, 56, 76, 65, 77, 60], label: 'Apple' },
    { data: [57, 50, 75, 87, 43, 46, 37, 67, 70, 50], label: 'Mi' },
  ];


  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
  };

  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];
  constructor(private router: Router, private http: CreatorServiceService) { }

  ngOnInit(): void {
    var nickname = sessionStorage.getItem('nickname');
    this.http.getEstadistica(nickname).subscribe(res => {
      console.log(res);
      this.lineChartType = 'line';
      this.lineChartOptions = {
        responsive: true,
      };
      this.listData = res['obj'];
      this.lineChartLabels = [];
      this.lineChartData = [];
      var collection = [];
      collection.push(0);
      if (this.listData.length > 0) {
        var d = new Date(this.listData[0].xValue);

        d.setDate(d.getDate() - 5);
        this.lineChartLabels.push(d.toLocaleDateString('en-GB'));
        this.listData.forEach(element => {
          console.log(element.xValue)
          this.lineChartLabels.push(element.xValue.substring(0, 10));
          collection.push(element.yValue);
        });
      }

      this.lineChartData.push({ data: collection, label: 'Pagos recibidos' });
    });
  }




}
