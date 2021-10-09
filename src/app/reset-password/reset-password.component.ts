import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MustMatch } from './../helper/must-match.validator';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  editProfileForm: FormGroup;
  submitted = false;
  msgError = false;
  msg = "";

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder, 
    private userService: AppService
    ) { }

  ngOnInit() {
    this.editProfileForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required],
    },
      {
        validator: MustMatch('password', 'confirm_password')
      });
      this.getAdminProfile();
  }


  getAdminProfile(){
    var data = {
      userId: localStorage.getItem('userId')
    }
    this.userService.getUser(data).subscribe((data)=>{
       if(data.statusCode == 200){
            console.log("=== check check check  ====",data);
         this.editProfileForm.controls['email'].setValue(data.data.email);
       }
    },
    (err)=>{
     console.log(err);
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.editProfileForm.controls; }

  onSubmit() {
    this.submitted = true;
    console.log("=== check check check  ===>>>>",this.editProfileForm.value);
    if (this.editProfileForm.invalid) {
      return
    }else{
      var data = {
        userId: localStorage.getItem('userId'),
        email: this.editProfileForm.value.email,
        password: this.editProfileForm.value.password
      }

      this.userService.editProfile(data).subscribe((data)=>{
        if(data.statusCode == 200){
          this.router.navigate(['dashboard']);
        }  
      },(err)=>{
        console.log(err);
      })
    }
  }

}
