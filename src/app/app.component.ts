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
	updateTask: any;
  	constructor(private _httpService: HttpService){}
	edit_task = false
	showTask1: boolean;
	task_obj: any ;
	update_data = {};

	ngOnInit(){
		//this.showAll = false;
		//this.getTasksFromService();
		this.newTask = {"title":"give your task a title", "desc": "describe your task"}
	}

	onSubmit(e){
		let observable = this._httpService.addTask(this.newTask);
		e.preventDefault();
		console.log("here is the observable", observable);
		observable.subscribe(data=>{
			console.log("got post data", data);
			this.newTask = {"title": "", "desc": ""}
			console.log("empty?", this.newTask);
		});
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
	deleteTask(task_id: String){
		console.log(`deleting task ${task_id}`)
		let obs = this._httpService.deleteTask(task_id);
		obs.subscribe();
		this.getTasksFromService();
	}
	showEditTask(task_id: String){
		let obs = this._httpService.getTask(task_id);
		obs.subscribe(task_data=>{
			this.task_obj = task_data['data'][0];
			console.log("task obj: ",this.task_obj);
			this.updateTask = this.task_obj; 
			console.log(task_data['data'][0])
			this.edit_task=true;	
			console.log(this.updateTask.title, this.updateTask.desc)
			console.log(this.task_obj._id)
		});
	}
	onUpdate(task_id: String){
		console.log(`editing task ${task_id}`)
		console.log("data being sent", this.updateTask)
		let obs = this._httpService.updateTask(task_id, this.updateTask)
		obs.subscribe(data=>{
			console.log("got post data", data);
			this.getTasksFromService();
			this.taskClick(task_id);
		});
	}
}
