import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CityBoundingBox, WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getCityLatAndLong(cityName: string): Observable<CityBoundingBox> {
    return this.http.get<CityBoundingBox>(environment.GeoCodingApiBaseUrl, {
      headers: new HttpHeaders()
      .set(environment.XRapidApiHostHeaderName, environment.GeoCodingApiHostValue)
      .set(environment.XRapidApiKeyHeaderName, environment.GeoCodingApiKeyValue),
      params: new HttpParams()
      .set('format', 'json')
      .set('city', cityName)
      .set('limit', '1')
      .set('accept-language', 'en')
      .set('namedetails', '0')
      .set('bounded', '0')
      .set('polygon_text', '0')
      .set('polygon_kml', '0')
      .set('polygon_svg', '0')
      .set('polygon_geojson', '0')
      .set('polygon_threshold', '0')
    })
  }

  getWeatherData(lat: string, long: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(environment.WeatherApiBaseUrl, {
      headers: new HttpHeaders()
      .set(environment.XRapidApiHostHeaderName, environment.WeatherApiHostValue)
      .set(environment.XRapidApiKeyHeaderName, environment.WeatherApiKeyValue),
      params: new HttpParams()
      .set('q', lat + ',' + long)
    })
  }
}
