import { Injectable } from '@angular/core';
import { Car } from "./car";
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  carObserver: Observer<Car>;
  carObservable: Observable<Car>;

constructor(private http: HttpClient) {
  this.carObservable = new Observable<Car>(observer => {
    this.carObserver = observer;
  });
};

  public insert(car: Car): Observable<any> {
    return this.http.post(`http://localhost:8080/cars/`, car);
  }
  public delete (car: Car): Promise < Response > {
  return fetch(`http://localhost:8080/cars/${car.id}`, { method: "POST" })
};

  public findBrands(): Promise < Response > {
  return fetch("http://localhost:8080/cars/brands/")
}

  public findCarsByBrand(brand: string): Promise < Response > {
  return fetch(`http://localhost:8080/cars/brands/${brand}`)
}

}
