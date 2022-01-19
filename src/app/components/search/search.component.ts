import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userServices } from 'src/app/services/UserServices/userServices';
import { searchProfile } from 'src/app/model/SearchProfile';
import { CreatorServiceService } from 'src/app/services/CreatorServices/creator-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  focus;
  focus1;
  categorySearch:boolean=true;
  searchString:string = '';
  searchProfile:searchProfile[] = [];
  pageSize:number = 10;
  pageNumber:number = 0;
  stopped:boolean = false;
  categories:string[] = [];


  constructor(private http:userServices, private creatorServices:CreatorServiceService, private router:Router, private route:ActivatedRoute) { 
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.creatorServices.creatorCategoires().subscribe(res =>{
      this.searchString = this.route.snapshot.paramMap.get('querry');
      res['obj'].forEach(element => {
        this.categories.push(element);
        if(this.searchString == element){
          this.categorySearch = false;
        }
      });
      if(this.categorySearch){
        this.getProrfile();
      }else{
        this.getProfilesByCategory();
      }
    })
  }

  getProrfile(){
    if(!this.stopped){
      this.http.getCreatorByUserSearch(this.searchString,this.pageNumber.toString(),this.pageSize.toString()).subscribe(res =>{
        if(res['success']){
          if(JSON.stringify(res["obj"]) !== '[]'){
            res['obj'].forEach(element => {
              this.searchProfile.push(element);
            });
          }
          if(res["obj"].length<this.pageSize){
            this.stopped=true;
          }
        }
      });
    }
    this.pageNumber++;
  }

  getProfilesByCategory(){
    if(!this.stopped){
      this.http.getCreatorByCategorySearch(this.searchString,this.pageNumber.toString(),this.pageSize.toString()).subscribe(res =>{
        if(res['success']){
          if(JSON.stringify(res["obj"]) !== '[]'){
            res['obj'].forEach(element => {
              this.searchProfile.push(element);
            });
          }
          if(res["obj"].length<this.pageSize){
            this.stopped=true;
          }
        }
      });
    }
    this.pageNumber++;
  }

  getProrfileSearch(){
    this.searchProfile=[];
    this.pageNumber=0;
    this.stopped=false;
    if(this.categorySearch){
      this.getProrfile();
    }else{
      this.getProfilesByCategory();
    }
  }

  getProrfileBySearch(){
    this.searchProfile=[];
    this.pageNumber=0;
    this.stopped=false;
    if(!this.categories.includes(this.searchString)){
      this.getProrfile();
    }else{
      this.getProfilesByCategory();
    }
  }

  inputText(event:Event){
    this.searchString = (<HTMLInputElement>event.target).value;
  }

  navToSearch(nickname:string){
    this.router.navigate([`/creator-Profile/${nickname}`]);
  }

  onScroll(){
    if(this.categorySearch){
      this.getProrfile();
    }else{
      this.getProfilesByCategory();
    }
  }

}
