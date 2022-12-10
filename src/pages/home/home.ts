import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { SocialSharing } from '@ionic-native/social-sharing';
import { HttpClient } from '@angular/common/http';
import { PlayersProvider } from '../../providers/players/players';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  quote: string;
  author: string;
  tags: string [];
  hidePlayersList: boolean = true;

  ngOnInit() {
    this.fetchQuote();
    // this.playersProvider.getPlayerData().subscribe((data) => {
    //   console.log(data)
    // });
  }
  

  constructor(public navCtrl: NavController, private socialSharing: SocialSharing, private http: HttpClient, private playersProvider: PlayersProvider) {

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

  test(){
    this.playersProvider.test();
  }

}
  
