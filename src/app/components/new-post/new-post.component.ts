import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit, AfterContentChecked {
  public assetsPath = '../../../assets/portraits/';

  public postFeed: any[] = [];
  public userDailyPosts = 0;
  public userDailyPosts$!: Observable<number>;

  @ViewChild('postInput') userInput: any;

  public formTextarea = new FormControl([], Validators.maxLength(777));

  constructor(public dialog: MatDialog, private cdRef: ChangeDetectorRef) {
    this.userDailyPosts$ = new Observable<number>();
  }

  ngAfterContentChecked(): void {
    this.userDailyPosts = this.getPosts();
    this.cdRef.detectChanges();
  }

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

    this.userInput.nativeElement.value = '';
  }

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
