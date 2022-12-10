import { NavController } from 'ionic-angular';
import { Component} from '@angular/core';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  countryIdInput: string = '';
  minAgeInput: number = null; 
  maxAgeInput: number = null; 
 
  ages: number[] = [];
  

  constructor(public navCtrl: NavController, public storage: Storage) {
    for (let i = 14; i <= 55; i++) {
      this.ages.push(i);
    }
  }

  save() {
    const countryId = this.countryIdInput;
    const minAge = this.minAgeInput;
    const maxAge = this.maxAgeInput;
  
    this.storage.set('countryId', countryId);
    this.storage.set('minAge', minAge);
    this.storage.set('maxAge', maxAge);
    console.log(countryId, minAge, maxAge);
  }

  cancel() {
    // Reset the input values to their default state
    this.countryIdInput = '';
    this.minAgeInput= null;
    this.maxAgeInput = null;
  }
  
}
