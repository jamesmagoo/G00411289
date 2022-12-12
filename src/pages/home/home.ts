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
  flagImage: any;
  countryName: string;
  players: Object[];
  tags: string [];
  minAge: number;
  maxAge: number;
  hidePlayersList: boolean = true;

  ngOnInit() {
    this.fetchQuote();
  }
  
  constructor(public navCtrl: NavController, private socialSharing: SocialSharing, private http: HttpClient, private playersProvider: PlayersProvider, private storage: Storage) {
      storage.get("minAge").then((val) => {
        this.minAge = val;
      });

      storage.get("maxAge").then((val) => {
        this.maxAge = val;
      });

    storage.get("countryId").then((val) => {
      if (val != null) {
        this.countryID = val;
        this.hidePlayersList = false;
        // get and set the country data
        this.setCountryData(this.countryID);
        // get and set the player data
        this.setPlayerData(this.countryID);
      }});
  }

  fetchQuote() {
      this.http.get('https://api.quotable.io/random')
      .subscribe(data => {
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
      this.getFlag(data.data["country_code"]);
    }, err => {
      console.log(err);
    }
    );
  }

  setPlayerData(id : number) {
    // check if there is a minAge and maxAge
    this.storage.get("minAge").then((val) => {
      if (val != null) {
        this.minAge = val;
      }
    });

    this.storage.get("maxAge").then((val) => {
      if (val != null) {
        this.maxAge = val;
      }
    });

    if(this.minAge != null && this.maxAge != null) {
      console.log("Both min & max age set")
      this.playersProvider.getPlayerDataMinMaxAge(this.minAge, this.maxAge, id).subscribe(data => {
        console.log(data.data)
        this.players = data.data;
      }, err => {
        console.log(err);
      }
      );
    } else if (this.minAge != null) {
      console.log("min age set")
      this.playersProvider.getPlayerDataMinAge(this.minAge, id).subscribe(data => {
        console.log(data.data)
        this.players = data.data;
      }, err => {
        console.log(err);
      }
      );
    } else if (this.maxAge != null) {
      console.log("max age set")
      this.playersProvider.getPlayerDataMaxAge(this.maxAge, id).subscribe(data => {
        console.log(data.data)
        this.players = data.data;
      }, err => {
        console.log(err);
      }
      );
    } else {
      console.log("No age set")
    this.playersProvider.getPlayerData(id).subscribe(data => {
      console.log(data.data)
      this.players = data.data;
    }, err => {
      console.log(err);
    }
    );
  }
}

  getFlag(countryCode: string){
    this.playersProvider.getFlag(countryCode).subscribe(data => {
      const blob = new Blob([data], { type: 'image/png' });
      // Get the base64 encoded image
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        this.flagImage = base64data;
      }
    }, err => {
      console.log(err);
    }
    );
  }
}
  
