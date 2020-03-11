import {Injectable} from '@angular/core';
import {Car} from "./car";

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor() {
  }

  public insert(car: Car): Promise<Response> {
    return fetch(`http://localhost:8080/cars`,
      {
        method: "POST",
        body: JSON.stringify(car),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
  }

  public delete(car: Car): Promise<Response> {
    return fetch(`http://localhost:8080/cars/${car.id}`,
      {method: "DELETE"})
  }

  public findBrands(): Promise<Response> {
    return fetch("http://localhost:8080/cars/brands/")
  }

  public findCarsByBrand(brand: string): Promise<Response> {
    return fetch(`http://localhost:8080/cars/brands/${brand}`)
  }

}
