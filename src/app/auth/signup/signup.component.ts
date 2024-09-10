// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-signup',
//   standalone: true,
//   imports: [],
//   templateUrl: './signup.component.html',
//   styleUrl: './signup.component.scss'
// })
// export class SignupComponent {

// }

// import { Component } from '@angular/core';
// import { AuthService } from '../auth.service'; // from this:  '../services/auth.service'; [change routes, also Spring one, there is not api package, maybe make one]
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.component.html',
//   styleUrls: ['./signup.component.css']
// })
// export class SignupComponent {
//   signupForm: FormGroup;

//   constructor(private authService: AuthService, private fb: FormBuilder) {
//     this.signupForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required],
//     });
//   }

//   onSubmit() {
//     if (this.signupForm.valid) {
//       this.authService.signUp(this.signupForm.value).subscribe(response => {
//         alert('Sign up successful!');
//       }, error => {
//         alert('Sign up failed!');
//       });
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({

  selector: 'app-signup',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.signUp(this.signupForm.value).subscribe({
        next: (response) => {
          console.log('Signup successful:', response);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Signup failed:', err);
        },
        complete: () => {
          console.log('Signup process completed.');
        }
      });
    }
  }
}
