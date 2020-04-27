import {Component, OnInit} from '@angular/core';
import {Car} from "../models/car";
<<<<<<< HEAD
import {CarsService} from '../services/cars.service';
=======
import {CarsService} from "../services/cars.service";
>>>>>>> 67c57b34f14b8012a5ec969b917057ca10437191

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  car: Car = new Car();
  message: string;

  constructor(private carsService: CarsService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.carsService
      .insert(this.car)
      .subscribe(
        () => {
          this.carsService.carObverver.next(this.car);
          this.message = `Car ${this.car.brand} ${this.car.model} added`;
          this.car = new Car();
        },
        () => {
          alert("Unauthorized");
        }
      );
  }

}
