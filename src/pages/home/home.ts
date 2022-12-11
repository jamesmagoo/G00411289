import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpClient } from '@angular/common/http';
import { PlayersProvider } from '../../providers/players/players';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  quote: string;
  author: string;
  countryID: number = null;
  countryCode: string;
  flagImage: string = 'https://flagsapi.com/BO/shiny/64.png';
  countryName: string;
  players: Object[];
  tags: string [];
  hidePlayersList: boolean = true;

  ngOnInit() {
    this.fetchQuote();
    this.checkCountryId();
  }
  
  constructor(public navCtrl: NavController, private socialSharing: SocialSharing, private http: HttpClient, private playersProvider: PlayersProvider, private storage: Storage) {

  }

  fetchQuote() {
      this.http.get('https://api.quotable.io/random')
      .subscribe(data => {
        console.log(data)
        this.quote = data['content'];
        this.author = data['author'];
        this.tags = data['tags'];
    });
  }

  refreshQuote() {
    this.fetchQuote();
    }

  openSettingsPage() {
    this.navCtrl.push(SettingsPage);
    }


  shareQuote() {
    this.socialSharing.share(
      `"${this.quote}" - ${this.author}`,
      'My favorite quote'
    );
  }

  checkCountryId() {
    this.storage.get("countryId")
    .then((val) => {
      if (val != null) {
        this.countryID = val;
        this.hidePlayersList = false;
        // get and set the country data
        this.setCountryData(this.countryID);
        // get and set the player data
        this.setPlayerData(this.countryID);
      }
    });
  }

  setCountryData(id: number) {
    this.playersProvider.getCountry(id).subscribe(data => {
      console.log(data);
      console.log(data.data["country_code"]);
      this.countryCode = data.data["country_code"];
      this.countryName = data.data.name ;
      this.getFlag(data.data["country_code"].toUpperCase());
    }, err => {
      console.log(err);
    }
    );
  }

  setPlayerData(id : number) {
    this.playersProvider.getPlayerData(id).subscribe(data => {
      console.log(data.data)
      this.players = data.data;
    }, err => {
      console.log(err);
    }
    );
  }

  getFlag(countryCode: string){
    this.playersProvider.getFlag(countryCode).subscribe(data => {
      console.log(data);
    }, err => {
      console.log(err);
    }
    );
  }

}
  
