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
	newTask: any;

  	constructor(private _httpService: HttpService){}

	showTask1: boolean;

	ngOnInit(){
		//this.showAll = false;
		//this.getTasksFromService();
		this.newTask = {"title":"give your task a title", "desc": "describe your task"}
	}

	onSubmit(){
		let observable = this._httpService.addTask(this.newTask);
		console.log("here is the observable", observable);
		observable.subscribe(data=>{
			console.log("got post data", data);
			this.newTask = {"title": "", "desc": ""}
			console.log("empty?", this.newTask);
		});
	}

  	getTasksFromService(){
  		let observable = this._httpService.getTasks();
		observable.subscribe(data=>{
			//console.log("Got our tasks!", data);
			this.tasks = data['data'];
			console.log(this.tasks);
		});
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
