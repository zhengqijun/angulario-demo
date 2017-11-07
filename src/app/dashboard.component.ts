import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	title = "dashboard";
	constructor(  private route: ActivatedRoute,
  private router: Router) {
	}
	
	ngOnInit() {
		let id = this.route.snapshot.paramMap.get('id');
		this.title = this.title + id;
  }

}



