import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../../task.service';
import {Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit, OnDestroy {
  list = {
    title: ''
  };
  subscription: Subscription;
  error = new Subject<string>();

  constructor(
    private taskService: TaskService,
    private router: Router) {
  }

  ngOnInit() {
  }

  onCreateList(title: any) {
    this.list.title = title;
    this.subscription = this.taskService.addLists(this.list)
      .subscribe((list) => {
        console.log('List created successfully');
        // @ts-ignore
        this.router.navigate(['/lists', list._id]);
      }, error => {
        this.error.next(error.message);
      });


  }

  ngOnDestroy(): void {
   // this.subscription.unsubscribe();
  }
}
