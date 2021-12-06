import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { SigninService } from './signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  formRegister: any;

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder, private route: Router, private siginService: SigninService) { }

  ngOnInit(): void {
    this.createFormLogin();
  }


  createFormLogin() {
    this.formRegister = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    })
  }


  register() {

    if (this.formRegister.value.password != this.formRegister.value.confirmPassword) {
      Swal.fire("Erro de senha", "As senhas estão diferentes", "error");
      return;
    }

    let callBack = this.siginService.saveUser(this.formRegister.value.email, this.formRegister.value.password);


    if (callBack){
      Swal.fire("Sucesso", "Cadastro com sucesso", "success");  
    } else {
      Swal.fire("Erro", "Errop ao salvar os dados", "error");
      return;
    }

    this.route.navigate(["/login"])
  }


  loginScreen() {
    this.route.navigate(["/login"])
  }
}
