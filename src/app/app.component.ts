import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
	title = 'Restful Tasks API';
	tasks = [];
	task1 = {};
	showAll: boolean;

  	constructor(private _httpService: HttpService){}

	showTask1: boolean;

	ngOnInit(){
		this.showAll = false;
		this.getTasksFromService();
	}

  	getTasksFromService(){
  		let observable = this._httpService.getTasks();
		observable.subscribe(data=>{
			//console.log("Got our tasks!", data);
			this.tasks = data['data'];
			console.log(this.tasks);
		});
  	}
	onButtonClickTasks(){
		this.showAll=true;	
	}
	taskClick(task_id: String){
		//console.log(`this tasks id is ${task_id}`)
		this.showTask1=true;
		let obs = this._httpService.getTask(task_id);
		obs.subscribe(task_data=>{
			//console.log("got this task", task_data);
			this.task1 =task_data['data'][0];
			console.log("found this task:", this.task1)
		});
	}
}
