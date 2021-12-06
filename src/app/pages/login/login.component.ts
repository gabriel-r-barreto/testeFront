import { Component, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from '../signin/signin.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder, private route: Router, private siginService: SigninService) { }

  ngOnInit(): void {
    this.createFormLogin();
  }


  createFormLogin() {
    this.formLogin = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  login() {
    let callBack = this.siginService.get(this.formLogin.value.email);


    if (callBack === null) {
      this.route.navigate(["/signin"])
      return;
    }

    if (this.formLogin.value.password != callBack) {
      Swal.fire("Erro", "Senha invalida !", "error");
      return;
    }

    this.route.navigate(["/dashboard"])

  }

  registerScreen() {
    this.route.navigate(["/signin"])
  }

}
