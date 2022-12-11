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
  countryURL = `https://app.sportdataapi.com/api/v1/soccer/countries/${this.countryId}?apikey=${this.apiKey}`;
  //apiUrl = `https://app.sportdataapi.com/api/v1/soccer/players?apikey=${this.apiKey}&country_id=${this.countryId}&max_age=${this.maxAge}&min_age=${this.minAge}}`
  apiUrl = `https://app.sportdataapi.com/api/v1/soccer/players?apikey=${this.apiKey}&country_id=${this.countryId}`



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
    console.log(`Querying flag for country code: https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png` );
    const upperCaseCode = countryCode.toUpperCase();
    //return this.http.get(`https://flagsapi.com/${upperCaseCode}/shiny/64.png`,{ responseType: 'blob' });
    return this.http.get(`https://countryflagsapi.com/png/${countryCode}` ,{ responseType: 'blob' });
  }


}
