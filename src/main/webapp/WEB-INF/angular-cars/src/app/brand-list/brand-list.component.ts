import { Component, OnInit } from '@angular/core';
import {CarsService} from "../cars.service";
import {DataSharingService} from "../data-sharing.service";

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands: string[];

  constructor(private service: CarsService,
              private dataSharingService: DataSharingService) {
    dataSharingService.newCar.subscribe(() => {
      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    this.service.findBrands()
      .then(response => response.json())
      .then(response => this.brands = response)
  }

}
