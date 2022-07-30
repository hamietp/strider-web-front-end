import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit {
  public postFeed: any[] = [];
  public assetsPath = '../../../assets/portraits/';
  public userDailyPosts = 0;

  public formTextarea = new FormControl([], Validators.maxLength(777));

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userDailyPosts = this.getPosts();
  }

  onSubmit(message: string): void {
    let userPosts: string[] = [];
    let newPost: string[] = [];

    if (localStorage.getItem('payload') !== null) {
      userPosts = JSON.parse(localStorage.getItem('payload') || '');
    }

    const newPostObject = {
      username: 'Hamilton',
      nickname: '@lewishamilton',
      message: message,
      timestamp: new Date().toISOString(),
      portrait: 'Lewis-Hamilton',
    };

    newPost = [...userPosts, newPostObject] as string[];

    localStorage.setItem(
      'payload',
      JSON.stringify(newPost) || 'Post something to your feed!'
    )!;
  }

  // get number os posts that the user has made in the last 24 hours
  // TODO: validate this function
  getPosts(): number {
    let userPosts: any[] = [];

    if (localStorage.getItem('payload') !== null) {
      userPosts = JSON.parse(localStorage.getItem('payload') || '');

      // filter by user 'Hamilton'
      userPosts = userPosts.filter((post: any) => post.username === 'Hamilton');
    }

    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const posts = userPosts.filter(
      (post) => new Date(post.timestamp) > yesterday
    );

    return posts.length;
  }
}
