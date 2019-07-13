import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class HttpService {
	constructor(private _http: HttpClient) {
		//this.getTasks();
		//this.getTask();
	}


	getTasks(){
		return this._http.get('/tasks');
	}
	getTask(taskID){
		return this._http.get('/tasks/'+taskID);
	}

	addTask(newtask){
		console.log("hitting service addTask with",newtask);
		return this._http.post('/tasks/', newtask, {responseType: 'text'})
	}
}

