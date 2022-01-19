import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration, ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { StatisticsService } from '../service/StatisticsServices/statistics.service';
import { GraphDto } from 'src/app/model/GraphDto';
import { SelectDto } from 'src/app/model/SelectDto';


@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  listData: Array<GraphDto> = [];
  //select
  selectGraficas: number;
  selectedOption: SelectDto
  options: Array<SelectDto> = [
    new SelectDto(0, "Pagos"),
    new SelectDto(1, "Nuevos usuarios"),
    new SelectDto(2, "Creadores y sus subscripciones"),
    new SelectDto(3, "Cantidad de usuarios por categoría"),
    new SelectDto(4, "Registro de logins"),
    new SelectDto(5, "Registro de seguidores")

  ];


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
  constructor(private router: Router, private http: StatisticsService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if (token == null || userType !== "admin") {
      this.router.navigate(['/home']);

    }
    this.pagosRealizados();
    this.selectGraficas = 0;

  }

  pagosRealizados() {
    this.http.getFinancial().subscribe(res => {
      this.lineChartType = 'line';
      this.lineChartOptions = {
        responsive: true,
      };
      this.listData = res['obj'];
      this.lineChartLabels = [];
      this.lineChartData = [];
      var collection = [];

      //collection.push(0);
      //this.lineChartLabels.push(new Date);
      collection.push(0);
      if(this.listData.length > 0){
        var d = new Date(this.listData[0].xValue);
        d.setDate(d.getDate() - 5);
        this.lineChartLabels.push(d.toLocaleDateString('en-GB'));

        this.listData.forEach(element => {
          this.lineChartLabels.push(new Date(element.xValue).toLocaleDateString('en-GB'));
          collection.push(element.yValue);
        });
        this.lineChartData.push({ data: collection, label: 'Dinero Recibido' });
      }
      });
  }
  usuariosNuevos() {
    this.http.getNewUsers().subscribe(res => {
      this.lineChartType = 'line';
      this.lineChartOptions = {
        responsive: true,
      };
      this.listData = res['obj'];
      this.lineChartLabels = [];
      this.lineChartData = [];
      var collection = [];
      collection.push(0);
      var d = new Date(this.listData[0].xValue);
      d.setDate(d.getDate() - 5);
      this.lineChartLabels.push(d.toLocaleDateString('en-GB'));
      this.listData.forEach(element => {
        this.lineChartLabels.push(element.xValue.substring(0, 10));
        collection.push(element.yValue);
      });
      this.lineChartData.push({ data: collection, label: 'Nuevos usuarios registrados' });
    });
  }
  subscriptoresCreadores() {
    this.http.getCreatorsSubs().subscribe(res => {
      this.lineChartType = 'bar';
      this.chartColors[0].backgroundColor = [];




      this.lineChartOptions = {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        plugins: {
          legend: {
            display: true,
          },
          datalabels: {
            anchor: 'end',
            align: 'end'
          }
        }
      };


      this.listData = res['obj'];
      this.lineChartLabels = [];
      this.lineChartData = [];
      var collection = [];
      var nuevosColores = [];
      this.listData.forEach(element => {
        this.lineChartLabels.push(element.xValue);
        collection.push(element.yValue);
        nuevosColores.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));
      });
      this.chartColors[0].backgroundColor = nuevosColores;

      this.lineChartData.push({ data: collection, label: 'Subscriptos a creadores' });
    });
  }
  creadorPorCategoria() {
    this.http.getCreatorCategory().subscribe(res => {
      this.lineChartType = 'pie';
      this.chartColors[0].backgroundColor = [];
      this.lineChartOptions = {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
          datalabels: {
            formatter: (value, ctx) => {
              if (ctx.chart.data.labels) {
                return ctx.chart.data.labels[ctx.dataIndex];
              }
            },
          },
        }
      };


      this.listData = res['obj'];
      this.lineChartLabels = [];
      this.lineChartData = [];
      var collection = [];
      var nuevosColores = [];
      this.listData.forEach(element => {
        this.lineChartLabels.push(element.xValue);
        collection.push(element.yValue);
        nuevosColores.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));
      });
      this.chartColors[0].backgroundColor = nuevosColores;

      this.lineChartData.push({ data: collection, label: 'Subscriptores a creadores' });
    });
  }

  logs() {
    this.http.getLogs().subscribe(res => {
      this.lineChartType = 'bar';
      this.chartColors[0].backgroundColor = [];
      this.lineChartOptions = {
        elements: {
          line: {
            tension: 0.4
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        plugins: {
          legend: { display: true },
        }
      };


      this.listData = res['obj'];
      this.lineChartLabels = [];
      this.lineChartData = [];
      var collection = [];
      var nuevosColores = [];
      var coleccionesExito = [];
      var coleccionesError = [];

      this.listData.forEach(element => {
        this.lineChartLabels.push(element.xValue);
        coleccionesExito.push(element.yValue[0]);
        coleccionesError.push(element.yValue[1]);
        nuevosColores.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));
      });
      this.chartColors[0].backgroundColor = nuevosColores;

      this.lineChartData.push({
        data: coleccionesExito, label: 'Conexion exitosa'
      });
      this.lineChartData.push({ data: coleccionesError, label: 'Error de conexion' });
    });
  }

  seguidores() {
    this.lineChartType = 'bar';
    this.lineChartOptions = {
      elements: {
        line: {
          tension: 0.4
        }
      },
      // We use these empty structures as placeholders for dynamic theming.
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      plugins: {
        legend: { display: true },
      }
    };
    this.lineChartLabels = [];
    this.lineChartData = [];
    this.http.getSubs().subscribe(res => {
      this.chartColors[0].backgroundColor = [];
      var nuevosColores = [];
      var coleccionFollow = [];
      this.listData = res['obj'];
      this.listData.forEach(element => {
        this.lineChartLabels.push(element.xValue);
        coleccionFollow.push(element.yValue);
        nuevosColores.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));
      });
      var seguidores = { data: coleccionFollow, label: 'Seguidores' };
      this.http.getUnsubs().subscribe(res2 => {
        var coleccionUnfolow = [];
        var data2 = res2['obj'];
        data2.forEach(element2 => {
          coleccionUnfolow.push(element2.yValue);
          nuevosColores.push('#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'));
        });
        this.lineChartData.push(seguidores);
        this.lineChartData.push({ data: coleccionUnfolow, label: 'Dejó de seguir' });
        this.chartColors[0].backgroundColor = nuevosColores;
        console.log(nuevosColores);
      });
    });
  }


  onChange(event) {
    if (event == 0) {
      this.pagosRealizados();
    } else if (event == 1) {
      this.usuariosNuevos();
    } else if (event == 2) {
      this.subscriptoresCreadores();
    } else if (event == 3) {
      this.creadorPorCategoria();
    } else if (event == 4) {
      this.logs();
    } else if (event == 5) {
      this.seguidores();
    }
    this.selectedOption = event;
  }



}
