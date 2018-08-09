import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit } from '@angular/core';
import * as annyang from 'annyang';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularSpeechRecognition';
  phrases = [];
  httpResult$: Observable<{}>;

  commands = {
    hello: () => {
      alert('Hello world!');
    },
    'search Luke Skywalker': result => this.callLukeSkywalker()
  };

  constructor(private ngZone: NgZone, private httpClient: HttpClient) {}

  ngOnInit() {
    annyang.addCallback('result', phrases => {
      this.printUsersSaying(phrases);
    });
    annyang.addCommands(this.commands);
    annyang.start();
  }

  private printUsersSaying(whatTheUserHasSaid: string[]) {
    this.ngZone.run(() => {
      this.phrases = whatTheUserHasSaid;
    });

    console.log('I think the user said: ', whatTheUserHasSaid[0]);
    console.log(
      'But then again, it could be any of the following: ',
      whatTheUserHasSaid
    );
  }

  private callLukeSkywalker() {
    this.ngZone.run(() => {
      this.httpResult$ = this.httpClient.get(`https://swapi.co/api/people/1`);
    });
  }
}
