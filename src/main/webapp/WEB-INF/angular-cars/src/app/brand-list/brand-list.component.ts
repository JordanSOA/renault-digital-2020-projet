import { Component, OnInit } from '@angular/core';
import {CarsService} from '../services/cars.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  brands: string[];

  constructor(private service: CarsService) {
    this.service.carObversable.subscribe(car => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.service.findBrands()
    .subscribe(response => this.brands = response);
  }

}
