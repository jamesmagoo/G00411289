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
  }

  save() {
    this.saveCountryId(this.countryIdInput);
    console.log(this.countryIdInput);
    
    if (this.countryIdInput != null && this.isValidCountryId == true) {
        const minAge = this.minAgeInput;
        const maxAge = this.maxAgeInput;
        this.storage.set("minAge", minAge);
        this.storage.set("maxAge", maxAge);
        this.navCtrl.push(HomePage);
      
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
      console.log(this.isValidCountryId + "setting to true");
      this.storage.set("countryId", countryId);
      this.isValidCountryId = true;
    }, err => {
      alert("Invalid country ID");
      console.log(this.isValidCountryId + "setting to false");
      this.isValidCountryId = false;
    });
}
  }
  
