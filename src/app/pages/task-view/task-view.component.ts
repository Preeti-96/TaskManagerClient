import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../task.service';
import {List} from '../../list';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Task} from '../../task';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists: List[];
  tasks: Task[];
  listSelected = false;
  selectedListId: string;


  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {

    this.route.params
      .subscribe((params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
          this.taskService.getTasks(params.listId).subscribe((tasks) => {
            this.tasks = tasks;
            console.log(tasks);
          });
          this.listSelected = true;
        } else {
          this.tasks = undefined;
          this.listSelected = false;
        }

      });

    this.taskService.getLists().subscribe(lists => {
      this.lists = lists;
      console.log(this.lists);
    });


  }


  onTaskClick(task: Task) {
    /* let complete = false;
     if (task.completed) {
       complete = false;
     } else {
       complete = true;
     }*/
    this.taskService.completed(task).subscribe(() => {
      // console.log(complete);
      console.log('Task Completed successfully');
    });
    task.completed = !task.completed;
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      console.log(res);
      this.router.navigate(['/lists']);
    });
  }

  onDeleteTaskClicked(taskId: string) {
    this.taskService.deleteTask(this.selectedListId, taskId).subscribe((task: any) => {
      console.log(task);
      this.tasks = this.tasks.filter(value => value._id !== taskId);
    });
  }

}
