import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CarsService} from "../cars.service";
import {Car} from "../car";
import {DataSharingService} from "../data-sharing.service";

@Component({
  selector: 'app-car-model-list',
  templateUrl: './car-model-list.component.html',
  styleUrls: ['./car-model-list.component.css']
})
export class CarModelListComponent implements OnInit {

  cars: Car[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: CarsService,
              private dataSharingService: DataSharingService) {
    dataSharingService.newCar.subscribe(() => {
      this.ngOnInit()
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.service.findCarsByBrand(params["brand"])
        .then(response => response.json())
        .then(response => this.cars = response)
        .then(() => (this.cars.length === 0) ? this.router.navigate(['/']) : undefined)
    });
  }

  delete(car: Car) {
    this.service.delete(car)
      .then(() => this.dataSharingService.newCar.next())
  }

}
