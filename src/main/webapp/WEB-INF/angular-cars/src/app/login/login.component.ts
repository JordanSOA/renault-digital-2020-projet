import { Component, OnInit } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /*
  model: any = {};

  constructor(private router: Router, private service: CarsService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  login(): void {
    this.service.login(this.model.username, this.model.password)
    .subscribe(isValid => {
      if (isValid) {
        // sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem(
          'token',
          btoa(this.model.username + ':' + this.model.password)
        );
        this.router.navigate(['']);
      } else {
        alert("Not valid 2");
      }
    });
  }
  */


  model: any;

  constructor(private http: HttpClient,
              private router: Router,
              private carsService: CarsService) {
  }

  ngOnInit() {
    this.model = {};
    sessionStorage.setItem('token', '');
  }

  login() {
    this.carsService
      .login(this.model.username, this.model.password)
      .subscribe(
        () => {
          let base64hash = btoa(this.model.username + ':' + this.model.password);
          sessionStorage.setItem('token', base64hash);
          this.router.navigate(['']);
        },
        error => {
          if (error.status === 401) {
            alert('Authentication failed');
          }
        }
      );
  }
}
