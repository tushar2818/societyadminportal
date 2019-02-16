import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from './app.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
    private appService: AppService ,
    private translate: TranslateService) {
    let languages = appService.availableLanguages.map(data => data.Value);
    translate.addLangs(languages);
    translate.setDefaultLang(appService.selectedLanguage);
    translate.use(appService.selectedLanguage);
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
