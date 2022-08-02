import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserPostsInterface } from '../interfaces/user-posts.interface';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initializeUserPosts();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserProfileComponent);

    dialogRef.afterClosed().subscribe((result) => {});
  }

  initializeUserPosts(): void {
    let userPosts: string[] = [];

    // Initialize a few mocked-up user posts if they don't exist
    if (localStorage.getItem('payload') === null) {
      const newPostObject: UserPostsInterface[] = [
        {
          username: 'Hamilton',
          nickname: 'lewishamilton',
          message: 'Great race yesterday!',
          timestamp: new Date().toISOString(),
          portrait: 'Lewis-Hamilton',
          following: [],
          followers: [],
        },
        {
          username: 'Anne-Marie',
          nickname: 'annepostrr',
          message: 'Hello World!',
          timestamp: new Date().toISOString(),
          portrait: 'Anne-Goldberg',
          following: [],
          followers: [],
        },
        {
          username: 'Fields, David',
          nickname: 'fieldsdavid',
          message: 'Starting spanish course today. Thanks for the advice!',
          timestamp: new Date().toISOString(),
          portrait: 'David-fields',
          following: [],
          followers: [],
        },
      ];

      newPostObject.forEach((post: UserPostsInterface) => {
        userPosts = [...userPosts, post] as string[];
      });

      localStorage.setItem('payload', JSON.stringify(userPosts));
    }
  }
}
