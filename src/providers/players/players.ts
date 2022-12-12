import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Storage } from "@ionic/storage";

/*
  Generated class for the PlayersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlayersProvider {
  minAge: number = 0;
  maxAge: number = 100;
  countryId: number;
  countryCode: string;
  // TODO get api key from environment
  apiKey: string = '628d5660-7899-11ed-9ef8-e396ff47ff67';

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello PlayersProvider Provider');
    // set min and max if they are set in storage
    storage.get('minAge').then((val) => {
      if(val != null) {
        console.log('Your minAge is', val);
        this.minAge = val;
      }
    }
    );
    storage.get('maxAge').then((val) => {
      if(val != null) {
        console.log('Your maxAge is', val);
        this.maxAge = val;
      }
    }
    );
  }

  
  getPlayerData(id: number): Observable<any>{
    return this.http.get(`https://app.sportdataapi.com/api/v1/soccer/players?apikey=${this.apiKey}&country_id=${id}`);
    
  }

  getCountry(id: number): Observable<any>{
    return this.http.get(`https://app.sportdataapi.com/api/v1/soccer/countries/${id}?apikey=${this.apiKey}`);
  }

  getFlag(countryCode: string): Observable<any>{
    return this.http.get(`https://countryflagsapi.com/png/${countryCode}` ,{ responseType: 'blob' });
  }

  getPlayerDataMaxAge(maxAge: number, id:number): Observable<any>{ 
    return this.http.get(`https://app.sportdataapi.com/api/v1/soccer/players?apikey=${this.apiKey}&country_id=${id}&max_age=${maxAge}`);
  }

  getPlayerDataMinAge(minAge: number, id:number): Observable<any>{ 
    return this.http.get(`https://app.sportdataapi.com/api/v1/soccer/players?apikey=${this.apiKey}&country_id=${id}&min_age=${minAge}`);
  }

  getPlayerDataMinMaxAge(minAge: number , maxAge: number, id:number) : Observable<any> {
    return this.http.get(`https://app.sportdataapi.com/api/v1/soccer/players?apikey=${this.apiKey}&country_id=${id}&min_age=${minAge}&max_age=${maxAge}`);
  }


}
