import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreatorService } from '../../service/CreatorServices/creator.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit {

  listusers: any;
  public page: number;
  filterpost = '';
  users: any[] = [];

  constructor(private router: Router, private http: CreatorService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if (token == null || userType !== "admin") {
      this.router.navigate(['/home']);
    }
    this.http.getCreator().subscribe(res => {
      console.log(res['obj']);
      this.users = res['obj'];
      console.log(this.users);
    });
  }
  onChange($event, id) {
    this.http.deleteCreator(id);
  }

}
