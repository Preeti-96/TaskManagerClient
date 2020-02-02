import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {TaskService} from '../../task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {
  listId: string;
  list = {
    title: ''
  };

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params.listId;
      });
  }

  onEditList(title: string) {
    this.list.title = title;
    this.taskService.updateList(this.list, this.listId).subscribe(
      (list: any) => {
        console.log('inside');
        console.log(list._id);
        this.router.navigate(['/lists', this.listId]);

      });
  }

}
