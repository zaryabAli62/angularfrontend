import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  register!: boolean;
  isFormSubmitted: any;

  constructor(private fb: FormBuilder,private router: Router,private apiSRVC:ApiService) {
    // Initialize the form with FormBuilder
    this.loginForm = this.fb.group({
      username: ['', Validators.required],  // Validators for form fields
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.register =  this.router.url.includes('register')
  }

  // Method to submit the form data
  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log(formData)

      if(this.register){
        // when user register 
        this.apiSRVC.post('register/',formData).subscribe((res)=>{
          this.router.navigate(['login'])
        })
      }else{
        // when user login 
        this.apiSRVC.post('login/',formData).subscribe((res)=>{
          this.router.navigate(['ibook'])
          localStorage.setItem('token',res.access)
          
        })
      }
    }
  }
}