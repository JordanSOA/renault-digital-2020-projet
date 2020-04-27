import { Component, OnInit } from '@angular/core';
import { CarsService } from '../services/cars.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any;

  constructor(private router: Router, private service: CarsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.model = {};
    sessionStorage.setItem('token', '');
  }

  register(): void {
    this.service.register(this.model.username, this.model.password)
    .subscribe(isValid => {
      if (isValid) {
        // sessionStorage.setItem('loggedIn', 'true');
        sessionStorage.setItem(
          'token',
          btoa(this.model.username + ':' + this.model.password)
        );
        this.router.navigate(['']);
      } else {
        alert("Not valid register");
      }
    });
  }

}
