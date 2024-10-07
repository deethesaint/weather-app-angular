import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './services/weather.service';
import { CityBoundingBox, CityBoundingBoxItem, WeatherData } from './models/weather.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    
  ]
})
export class AppComponent {
  title = 'weather-app-angular';
  
  cityName = '';

  cityBoundingBoxItem?: CityBoundingBoxItem;
  weatherData?: WeatherData;

  constructor(private _weatherService: WeatherService) { }

  ngOnInit() {
    this._weatherService.getCityLatAndLong('Ho Chi Minh')
    .subscribe({
      next: (response) => {
        this.cityBoundingBoxItem = response[0];
        console.log(this.cityBoundingBoxItem);
      }
    });

    this._weatherService.getWeatherData(this.cityBoundingBoxItem?.lat ?? '10.7763897', this.cityBoundingBoxItem?.lon ?? '106.7011391')
    .subscribe({
      next: (response) => {
        this.weatherData = response;
        console.log(this.weatherData);
      }
    });
  }

  async fetchWeatherData(cityName: string) {
    await this._weatherService.getCityLatAndLong(cityName)
    .subscribe(await {
      next: async (response) => {
        this.cityBoundingBoxItem = response[0];
        console.log(this.cityBoundingBoxItem);
      }
    });

    setTimeout(() => {
      this._weatherService.getWeatherData(this.cityBoundingBoxItem?.lat ?? '0', this.cityBoundingBoxItem?.lon ?? '0')
      .subscribe({
        next: (response) => {
          this.weatherData = response;
          console.log(this.weatherData);
        }
      });
    }, 1500)

    
  }
}
