import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  quote: string;
  author: string;
  tags: string [];

  ngOnInit() {
    this.fetchQuote();
  }

  constructor(public navCtrl: NavController, private socialSharing: SocialSharing) {

  }

  async fetchQuote() {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      console.log(data)
      this.quote = data.content;
      this.author = data.author;
      this.tags = data.tags;
    } catch (error) {
      console.error(error);
    }
  }

  openStudentsPage() {
    this.navCtrl.push(SettingsPage);
    }

    shareQuote() {
      this.socialSharing.share(
        `"${this.quote}" - ${this.author}`,
        'My favorite quote'
      );
      
    }
    
}
