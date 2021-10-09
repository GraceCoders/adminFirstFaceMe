import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
 
  //#region charts data

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Users' }
  ];

  groupedUsers:any;
  
  //#endregion
  users = [];
  size = '';
  pagination = false;
  total = 0;
   data = {
     page : 1,
     limit: 100,
     text: '',
     filter:''
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
    this.getUsers(this.data);
  }

  getUsers(data){
    this.spinner.show();
    this.userService.getUsers(data).subscribe((data)=>{
      if(data.statusCode == 200){
        this.users = data.data.users;
        // console.log("===chek user list iser kgk",this.users);
        this.total = data.data.total;
        debugger
        this.spinner.hide();
        let users =this.users.map(this.groupmonth);

        let keys = [];
        users.forEach( e => {
          Object.keys[e[0]]
        });
        // this.groupedUsers = this.groupBy(data.data.users , user => user.createdAt );
        console.log("======grouped users ====== " , this.users.map(this.groupmonth));

      }
    },
    (err)=>{
      console.log(err);
      this.spinner.hide();
    })
  }

  groupday(value, index, array){
    let byday={};
     let d:any = new Date(value['createdAt']);
     d = Math.floor(d.getTime()/(1000*60*60*24));
     byday[d]=byday[d]||[];
     byday[d].push(value);
   return byday
 }

 groupmonth(value, index, array){
  let bymonth={};
   let d:any = new Date(value['createdAt']);
   d = (d.getFullYear()-1970)*12 + d.getMonth();
   bymonth[d]=bymonth[d]||[];
   bymonth[d].push(value);
 return bymonth
}


  deleteUser(user_id,index){
    
    var consent = confirm("Do you want to delete this user ?");
    if(consent){
    this.userService.deleteUser({userId: user_id}).subscribe((data)=>{
      if(data.statusCode == 200){
        this.users.splice(index,1);
      }

    })
    }
  }

  loadPage(page: number) {
    this.data.page = page;
    this.getUsers(this.data);
   }

   search(event){
     this.data.filter = event.target.value;
     this.getUsers(this.data)
   }

   editUser(user_id){
     this.router.navigate(['edit-user'], { queryParams: { user_id: user_id}});
   }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}

}
