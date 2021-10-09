import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/users', title: 'Users',  icon: 'design_bullet-list-67', class: '' },
    { path: '/subscriptions', title: 'Subscriptions', icon: 'design_bullet-list-67', class: ''},
    { path: '/reports', title: 'reports', icon: 'design_bullet-list-67', class: ''},
    { path: '/interests', title: 'Interests', icon:'design_bullet-list-67',class:''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isToggle = true;
  sideClass = ''
  width = 260;
  menuItems: any[];
  username;
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.username = localStorage.getItem('username');
  }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
  };
  
  openNav(){
  console.log("ndaubuhdubauduashu")
  this.isToggle = this.isToggle == true ? this.isToggle = false : this.isToggle = true;
  this.width = this.width == 260 ? this.width = 0 : this.width = 260; 
  this.sideClass = this.sideClass == '' ? this.sideClass = 'sidebarClass' : this.sideClass = '';
  document.getElementById("mySidepanel").style.width = `${this.width}px`;
  }
  
}
