import {Component, OnInit} from '@angular/core';
import {Car} from "../car";
import {CarsService} from "../cars.service";
import {Router} from "@angular/router";
import {DataSharingService} from "../data-sharing.service";

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  model: Car = new Car();

  text: string = "";

  constructor(private service: CarsService,
              private router: Router,
              private dataSharingService: DataSharingService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.insert(this.model)
      .then(response => {
        this.text = `Car inserted: ${this.model.brand} - ${this.model.model}`;
        this.model = new Car()
        this.dataSharingService.newCar.next()
        this.router.navigate(['/'])
      })
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }

}
