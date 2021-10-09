import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import {ActivatedRoute ,Router} from '@angular/router';
import { FormGroup,FormBuilder,FormControl , Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editUserProfileForm: FormGroup;
  submitted = false;
  user_id = "";
  user = {
    username:'',
    email: '',
    verify: '',
    status: ''
  }
  constructor(private userService: AppService,private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.editUserProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
  });
    this.route.queryParams.subscribe((params) => {
      this.user_id = params.user_id;
      this.editUserProfileForm.addControl('userId', new FormControl('', Validators.required));
      this.editUserProfileForm.controls['userId'].setValue(this.user_id);
      var data = {
        userId: params.user_id
      }
      this.getUserData(data)
    });

  }
  get f() { return this.editUserProfileForm.controls; }

  getUserData(data){
    this.userService.getUser(data).subscribe((data)=>{
       if(data.statusCode == 200){
         this.editUserProfileForm.patchValue(data.data);
       }
    },
    (err)=>{
      console.log(err);
    })
  }

  onSubmit(){
    this.submitted = true;
    if(this.editUserProfileForm.invalid){
     return;
    }else{
     this.userService.updateUser(this.editUserProfileForm.value).subscribe((data)=>{
           if(data.statusCode == 200){
             this.router.navigate(['users']);
           }
     },
     (err)=>{
       console.log(err);
     })
    }
  }

}
