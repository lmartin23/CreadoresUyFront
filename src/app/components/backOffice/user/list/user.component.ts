import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/UserServices/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  listusers: any;
  public page: number;
  filterpost = '';
  users: any[] = [];

  constructor(private router: Router, private http: UserService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if (token == null || userType !== "admin") {
      this.router.navigate(['/home']);
    }
    this.http.getUser().subscribe(res => {
      this.users = res['obj'];
    });
  }
  onChange($event, id) {
    this.http.deleteUser(id);
  }

}
