import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
    public forecasts: WeatherForecast[];
    public baseURL: string = 'http://localhost:63397/api';
    public HTTP: HttpClient = null;
    constructor(http: HttpClient) {
        this.HTTP = http;
        this.get();
    }

    get() {
        this.HTTP.get<WeatherForecast[]>(this.baseURL + '/weatherforecast').subscribe(result => {
            this.forecasts = result;
        }, error => console.error(error));
    }

    edit(item: any) {
        this.HTTP.put(this.baseURL + '/weatherforecast?id=7', item).subscribe(result => {
            console.log(result);
        }, error => console.error(error));
    }

    save(item: any) {
        this.HTTP.post(this.baseURL + '/weatherforecast', item).subscribe(result => {
            console.log(result);
        }, error => console.error(error));
    }

    delete(item: any) {
        this.HTTP.delete(this.baseURL + '/weatherforecast?id=13').subscribe(result => {
            console.log(result);
        }, error => console.error(error));
    }

}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
