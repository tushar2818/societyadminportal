import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from './../../_nav';
import { GlobalService } from '../../shared/global.service';
import { AppConstants } from '../../shared/appconstants';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard.backup',
  templateUrl: './default-layout.component.backup.html'
})
export class DefaultLayoutBackupComponent implements OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  userData: any;

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
    } catch (e) {
      this.globalService.handleExceptions(e);
    }
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  //logout from application
  logoutClick() {
    try {
      localStorage.removeItem(AppConstants.UserDetailsKeyword);
      localStorage.clear();
      this.router.navigate(['/loginpage']);
    } catch (e) {
      this.globalService.handleExceptions(e);
    }
  }

}
