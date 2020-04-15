import { Component, OnInit } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(private router: Router, private service: CarsService) { }

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
}
