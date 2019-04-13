import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from './../../_nav';
import { GlobalService } from '../../shared/global.service';
import { AppConstants, LookupType, CommonMethods, AlertType } from '../../shared/appconstants';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  userData: any;
  companyList: any = [];
  projectList: any = [];
  subscription: Subscription;

  constructor(private globalService: GlobalService,
    private router: Router,
    @Inject(DOCUMENT) _document?: any) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  //initilization
  ngOnInit() {
    try {
      this.userData = this.globalService.getUserData();
      this.companyList = this.globalService.getCompanyList();
      this.projectList = this.globalService.getProjectsList();
    } catch (e) {
      this.globalService.handleExceptions(e);
    }
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
    this.subscription.unsubscribe();
  }

  //logout from application
  logoutClick() {
    try {
      this.globalService.clearUserData();
      this.router.navigate(['/loginpage']);
    } catch (e) {
      this.globalService.handleExceptions(e);
    }
  }

}
