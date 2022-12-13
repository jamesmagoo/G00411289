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
    this.populateInputs(); 
      
  }

  save() {
    if (this.countryIdInput != null) {
      this.saveCountryId(this.countryIdInput, this.maxAgeInput, this.minAgeInput);
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

  saveCountryId(countryId: number, maxAgeInput: number, minAgeInput: number) {
    if(countryId == null) {
      alert("Invalid country ID");
      return
    } 
    this.playersProvider.getCountry(countryId)
    .subscribe(data => {
      alert("Valid country ID");
      console.log(data);
      this.storage.set("countryId", countryId);
      console.log("Ages set", minAgeInput, maxAgeInput)
      // Check Age Range for valid queries to endpoint
      if((minAgeInput >= maxAgeInput) && (minAgeInput != null && maxAgeInput != null)){
        alert("Invalid age range");
        return
      }
      this.isValidCountryId = true;
      this.storage.set("minAge", minAgeInput);
      this.storage.set("maxAge", maxAgeInput);
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
  
