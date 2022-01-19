import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserComplet } from 'src/app/model/UserComplete';
import { AdminService } from '../../service/AdminServices/admin.service';

@Component({
  selector: 'app-admin-office',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  listusers: any;
  public page: number;
  filterpost = '';
  users: any[] = [];

  constructor(private router: Router, private http: AdminService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    const userType = sessionStorage.getItem('userType');
    if (token == null || userType !== "admin") {
      this.router.navigate(['/home']);
    }
    this.http.getAdmin().subscribe(res => {
      this.users = res['obj'];
    });
  }
  onChange($event, id) {
    this.http.deleteAdmin(id);
  }
  deleteAdmin($event, id) {
    this.http.disableAdmin(id);
    for (let i = 0; i < this.users.length; ++i) {
      if (this.users[i].id === id) {
        this.users.splice(i, 1);
      }
    }
  }
}

