import {Component, OnInit} from '@angular/core';
import {TaskService} from '../../task.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  task = {
    title: '',
    listId: ''
  };
  listId: string;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.listId = params['listId'];
        console.log(this.listId);
      });
  }


  onCreateTask(title: string) {
    this.task.title = title;
    this.task.listId = this.listId;
    this.taskService.addTasks(this.task, this.listId).subscribe(task => {
      console.log(task);
      this.router.navigate(['../'], {relativeTo: this.route});

    });

  }
}
