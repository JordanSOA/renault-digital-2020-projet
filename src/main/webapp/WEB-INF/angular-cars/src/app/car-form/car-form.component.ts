import { Component, OnInit } from '@angular/core';
import { Car } from '../car';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  car: Car = new Car();
  msg: string;
  constructor(private service: CarsService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.service.insert(this.car)
    .subscribe(val => {
      this.service.carObserver.next(this.car);
      this.msg = `Created Car ${this.car.brand} ${this.car.model} added !`;
    });
  }
}
