import { NavController } from "ionic-angular";
import { Component } from "@angular/core";
import { Storage } from "@ionic/storage";
import { HomePage } from "../home/home";
import { PlayersProvider } from '../../providers/players/players';

@Component({
  selector: "page-settings",
  templateUrl: "settings.html",
})
export class SettingsPage {
  countryIdInput: number = null;
  minAgeInput: number = null;
  maxAgeInput: number = null;
  isValidCountryId: boolean = false;

  ages: number[] = [];

  constructor(public navCtrl: NavController, public storage: Storage, public playersProvider: PlayersProvider) {
    for (let i = 14; i <= 55; i++) {
      this.ages.push(i);
    }
    this.populateInputs(); 
      
  }

  save() {
    if (this.countryIdInput != null) {
      this.saveCountryId(this.countryIdInput);
    } else {
      alert("You must input a country ID");
    }
  }

  cancel() {
    // Reset the input values to their default state
    this.countryIdInput = null;
    this.minAgeInput = null;
    this.maxAgeInput = null;
  }

  saveCountryId(countryId: number) {
    this.playersProvider.getCountry(countryId)
    .subscribe(data => {
      alert("Valid country ID");
      console.log(data);
      this.storage.set("countryId", countryId);
      this.isValidCountryId = true;
      const minAge = this.minAgeInput;
      const maxAge = this.maxAgeInput;
      this.storage.set("minAge", minAge);
      this.storage.set("maxAge", maxAge);
      this.navCtrl.push(HomePage);
    }, err => {
      alert("Invalid country ID");
    });
  }

  populateInputs() {
    this.storage.get("countryId")
    .then((val) => {
      if (val != null) {
        this.countryIdInput = val;
      }
    });
    this.storage.get("minAge")
    .then((val) => {
      if (val != null) {
        this.minAgeInput = val;
      }
    });
    this.storage.get("maxAge")
    .then((val) => {
      if (val != null) {
        this.maxAgeInput = val;
      }
    });
  }
}
  
