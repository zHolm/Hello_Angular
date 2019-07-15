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
	deleteTask(taskID){
		console.log('delete route ', '/tasks/'+taskID);
		return this._http.delete('/tasks/'+taskID+'/');
	}
	updateTask(taskID, update_data){
		console.log('update route');
		return this._http.put('/tasks/'+taskID, update_data);
	}
}

