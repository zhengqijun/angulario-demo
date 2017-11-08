import { Component,AfterViewInit } from '@angular/core';
import {BreakpointObserver, BreakpointState, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs/Observable';

import * as $ from 'jquery/dist/jquery.min.js';
import * as io from 'socket.io-client/dist/socket.io.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements AfterViewInit {
  isHandset: Observable<BreakpointState>;
  isTablet: Observable<BreakpointState>;
  isWeb: Observable<BreakpointState>;
  isPortrait: Observable<BreakpointState>;
  isLandscape: Observable<BreakpointState>;
  socket:any;
  connect:any;
	constructor(private breakpointObserver: BreakpointObserver) {

		this.isHandset = this.breakpointObserver.observe([Breakpoints.HandsetLandscape,
                                       Breakpoints.HandsetPortrait]);
    this.isTablet = this.breakpointObserver.observe(Breakpoints.Tablet);
    this.isWeb = this.breakpointObserver.observe([Breakpoints.WebLandscape, Breakpoints.WebPortrait]);
    this.isPortrait = this.breakpointObserver.observe('(orientation: portrait)');
    this.isLandscape = this.breakpointObserver.observe('(orientation: landscape)');

  }
  
    ngAfterViewInit() {
        $("title").html("DDDEEEMMMMOOO");

        this.socket = io.connect('https://ateamma01.feg.com.tw:443');
        this.socket.on('connect', function () {
              this.connect = true;
              console.log('socket connected');
        }); 
        this.socket.on('ip', function (data) {
              console.dir(data);
        });   
    }
	}

