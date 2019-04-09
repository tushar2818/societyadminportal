import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from './shared/global.service';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(private router: Router,
    private globalService: GlobalService ,
    private translate: TranslateService) {

    let languages = globalService.availableLanguages.map(data => data.Value);
    translate.addLangs(languages);
    translate.setDefaultLang(globalService.selectedLanguage);
    translate.use(globalService.selectedLanguage);

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
