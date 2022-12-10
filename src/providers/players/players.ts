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
  countryId: number = 4;
  // TODO get api key from environment
  apiKey: string = 'YOUR_API_KEY';
  countryURL = `https://app.sportdataapi.com/api/v1/soccer/countries?apikey=${this.apiKey}&continent=Europe`;
  //apiUrl = `https://app.sportdataapi.com/api/v1/soccer/players?apikey=${this.apiKey}&country_id=${this.countryId}&max_age=${this.maxAge}&min_age=${this.minAge}}`
  apiUrl = `https://app.sportdataapi.com/api/v1/soccer/players?apikey=${this.apiKey}&country_id=${this.countryId}}`



  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello PlayersProvider Provider');
    // Check if there is a countryId in storage
    storage.get('countryId').then((val) => {
      if(val == null) {
        // if no, ask for it
        alert("Set your countryId in settings to get players");
      } else{
        // if yes and it is valid, use it to get a flag and players
        this.checkCountryId(val);
        console.log('Your countryId is', val);
        this.countryId = val;
        this.getPlayerData();
      }
    });

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

  
  
  getPlayerData(): Observable<any>{
    console.log(this.http.get(this.apiUrl))
    return this.http.get(this.apiUrl);
    
  }

  checkCountryId(countryId: number):Observable<any> {
    console.log(this.http.get(this.countryURL));
    return this.http.get(this.countryURL);
  }

  public test() {
    console.log(this.minAge, this.maxAge, this.countryId);
  }

}
