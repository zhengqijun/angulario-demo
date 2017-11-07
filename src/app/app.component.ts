import { Component } from '@angular/core';
import {BreakpointObserver, BreakpointState, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isHandset: Observable<BreakpointState>;
  isTablet: Observable<BreakpointState>;
  isWeb: Observable<BreakpointState>;
  isPortrait: Observable<BreakpointState>;
  isLandscape: Observable<BreakpointState>;
	constructor(private breakpointObserver: BreakpointObserver) {

		this.isHandset = this.breakpointObserver.observe([Breakpoints.HandsetLandscape,
                                       Breakpoints.HandsetPortrait]);
    this.isTablet = this.breakpointObserver.observe(Breakpoints.Tablet);
    this.isWeb = this.breakpointObserver.observe([Breakpoints.WebLandscape, Breakpoints.WebPortrait]);
    this.isPortrait = this.breakpointObserver.observe('(orientation: portrait)');
    this.isLandscape = this.breakpointObserver.observe('(orientation: landscape)');

	}
	}

