import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = this.fb.group({
    name: ['Test 4', [Validators.required] ],
    email: ['test4@test.com', [Validators.required, Validators.email ] ],
    password: ['123456', [Validators.required, Validators.minLength( 6 )] ]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  register() {
    const { name, email, password } = this.registerForm.value;

    this.authService.registro( name, email, password )
      .subscribe( ok => {
          console.log( ok );
        if ( ok === true ) {
          this.router.navigateByUrl('/dashboard');
        } else {
          swal.fire({
            title: 'Error',
            text: ok.msg,
            icon: 'error'
          })
          // if ( ok.errors.name ) {
          //   swal.fire({
          //     title: 'Error',
          //     text: ok.name.msg,
          //     icon: "error"
          //   })
          // } else if ( ok.errors.email ) {
          //   swal.fire({
          //     title: 'Error',
          //     text: ok.errors.email.msg,
          //     icon: "error"
          //   })
          // } else {
          //   swal.fire({
          //     title: 'Error',
          //     text: ok.errors.password.msg,
          //     icon: "error"
          //   })
          // }
        }
      })



  }

}
