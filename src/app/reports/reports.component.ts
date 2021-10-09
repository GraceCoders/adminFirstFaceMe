import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  reports = [];
  size = '';
  pagination = false;
  total = 0;
   data = {
     page : 1,
     limit: '',
     text: ''
   }
   where = {
     filter: '',
     limit: 10,
     page: 1,
     order: -1
   }

   constructor(private router: Router, private userService: AppService,private spinner: NgxSpinnerService) { }


  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }
  ngOnInit() {
    this.getReports(this.data);
  }

  getReports(data){
    this.spinner.show();
    this.userService.getReports(data).subscribe((data)=>{
      if(data.statusCode == 200){
        this.reports = data.data.reports;
        console.log("===chek user list iser kgk",this.reports);
        this.total = data.data.total;
        this.spinner.hide();
      }
    },
    (err)=>{
      console.log(err);
      this.spinner.hide();
    })
  }



  loadPage(page: number) {
    this.data.page = page;
    this.getReports(this.data);
   }

   search(event){
     this.data.text = event.target.value;
     this.getReports(this.data)
   }

  

   blockUnblock(otherId,status){
    //  console.log("== cehck otehr id====",otherId,status)
     if(!status){
       status = true;
     }else{
       status = false;
     }
    //  console.log("== after chaonging otherid status",otherId,status);
    this.spinner.show();
    this.userService.blockUnblock({otherId: otherId, status: status}).subscribe((data)=>{
      if(data.statusCode == 200){
        this.spinner.hide();
        this.getReports(this.data)
      }
    },
    (err)=>{
      console.log(err);
      this.spinner.hide();
    })
  }

}
