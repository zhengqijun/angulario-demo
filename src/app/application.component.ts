import { Component } from '@angular/core';
import {
  MatSnackBar
} from '@angular/material';

import {BreakpointObserver, BreakpointState, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs/Observable';

import { Headers, Http } from '@angular/http';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import { RepeatPipe } from 'ng-pipes';
import { NgForm } from '@angular/forms';

export class Folder {
  objectId: string;
  name: string;
  path: string;
  nodeRef: string;
}

@Component({
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
  providers: [RepeatPipe]
})
export class ApplicationComponent {
			folder:Folder = {objectId:"aaa",name:"aaa",path:"aaa",nodeRef:"aaaa"};
			folderList1: Folder[] = [];
			folderList2: Folder[] = [];
			
				
  isHandset: Observable<BreakpointState>;
  isTablet: Observable<BreakpointState>;
  isWeb: Observable<BreakpointState>;
  isPortrait: Observable<BreakpointState>;
  isLandscape: Observable<BreakpointState>;
	constructor(public snackBar: MatSnackBar,
							private breakpointObserver: BreakpointObserver,
							private http: Http,
							private httpClient: HttpClient) {

		this.isHandset = this.breakpointObserver.observe([Breakpoints.HandsetLandscape,
                                       Breakpoints.HandsetPortrait]);
    this.isTablet = this.breakpointObserver.observe(Breakpoints.Tablet);
    this.isWeb = this.breakpointObserver.observe([Breakpoints.WebLandscape, Breakpoints.WebPortrait]);
    this.isPortrait = this.breakpointObserver.observe('(orientation: portrait)');
    this.isLandscape = this.breakpointObserver.observe('(orientation: landscape)');

	}
	
	getFolder1(): void {
  	this.http.get("https://ateamma01.feg.com.tw/oauth2/yuedan?site=ecm&action=GetFolder")
             .toPromise()
             .then(response => {
             	this.folderList1 = (response.json() as Folder[]);
             })
             .catch(this.handleError);

	}
	
	getFolder2(): void {
			 		this.httpClient.get('https://ateamma01.feg.com.tw/oauth2/yuedan?site=ecm&action=GetFolder')
			.subscribe(data => {
			  // data is now an instance of type ItemsResponse, so you can do this:
			  //this.results = data.results;
			  this.folderList2 = (data as Folder[]);
			},
			(err: HttpErrorResponse) => {
	      if (err.error instanceof Error) {
	        // A client-side or network error occurred. Handle it accordingly.
	        console.log('An error occurred:', err.error.message);
	      } else {
	        // The backend returned an unsuccessful response code.
	        // The response body may contain clues as to what went wrong,
	        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
	      }
    	});

	}
	
	onSubmit(folderForm: NgForm):void {
		console.log(folderForm.valid);
	}
	
	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}

	}

