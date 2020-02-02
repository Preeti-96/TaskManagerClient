import {Injectable} from '@angular/core';
import {WebRequestService} from './web-request.service';
import {List} from './list';
import {Task} from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) {
  }

  getLists() {
    return this.webRequestService.getL('lists');
  }

  addLists(list: List) {
    return this.webRequestService.postL('list', list);
  }

  deleteList(listId: string) {
    return this.webRequestService.delete(`list/${listId}`);
  }

  updateList(list: List, listId: string) {
    return this.webRequestService.put(`list/${listId}`, list);
  }

  getTasks(listId: any) {
    return this.webRequestService.getT('lists/' + listId + '/tasks');
  }

  addTasks(task: Task, listId: string) {
    return this.webRequestService.postT('lists/' + listId + '/task', task);
  }

  deleteTask(listId: string, taskId: string) {
    return this.webRequestService.delete(`lists/${listId}/task/${taskId}`);
  }

  updateTask(title: string, listId: string, taskId: string) {
    return this.webRequestService.put(`lists/${listId}/task/${taskId}`, {title});
  }


  completed(task: Task) {
    const listId = task.listId;
    const _id = task._id;
    console.log('listId' + listId);
    console.log('tasks' + _id);
    return this.webRequestService.put('lists/' + listId + '/task/' + _id, {completed: !task.completed});
  }

}
