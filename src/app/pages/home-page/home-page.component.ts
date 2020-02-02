import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../authentication/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  user: string;
  isAuthenticated: boolean;

  // userName: string;

  constructor(private authService: AuthService) {
    this.authService.userName.subscribe((userName) => {
      this.user = userName;
      console.log('username in home page ' + this.user);
    });

    this.authService.isAuthenticated.subscribe((authenticated) => {
      this.isAuthenticated = authenticated;
    });

  }


  ngOnInit() {
  }

  onLogOut() {
    this.authService.logOut();
  }


}
