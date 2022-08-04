import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UserPostsInterface } from 'src/app/interfaces/user-posts.interface';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent implements OnInit, AfterContentChecked {
  public assetsPath = '../../../assets/portraits/';
  @ViewChild('postInput') userInput: any;
  
  public postFeed: UserPostsInterface[] = [];
  public postFeed$!: Observable<UserPostsInterface[]>;
  public userDailyPosts = 0;
  public userDailyPosts$!: Observable<number>;
  
  isSlideChecked: boolean = false;
  userPosts: UserPostsInterface[] = [];
  
  
  currentRoute: string = this.router.url.split('/')[1];
  public formTextarea = new FormControl([], Validators.maxLength(777));

  private destroy = new Subject<any>();

  constructor(
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
    this.userDailyPosts$ = new Observable<number>();
    this.postFeed$ = new Observable<UserPostsInterface[]>();
  }

  ngAfterContentChecked(): void {
    this.userDailyPosts = this.getPosts();
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.userDailyPosts = this.getPosts();
    this.isSlideChecked = this.slideUrlCheck();
  }

  onSubmit(message: string): void {
    let userPosts: UserPostsInterface[] = [];
    let newPost: UserPostsInterface[] = [];

    if (localStorage.getItem('payload') !== null) {
      userPosts = JSON.parse(localStorage.getItem('payload')!) as UserPostsInterface[];
    }

    const newPostObject = {
      username: 'Hamilton',
      nickname: 'lewishamilton',
      message: message,
      timestamp: new Date().toISOString(),
      portrait: 'Lewis-Hamilton',
      following: [] as string[],
      followers: [] as string[],
    };

    newPost = [newPostObject, ...userPosts] as UserPostsInterface[];

    localStorage.setItem('payload', JSON.stringify(newPost));

    this.userInput.nativeElement.value = '';
  }

  getPosts(): number {
    let userPosts: UserPostsInterface[] = [];

    if (localStorage.getItem('payload') !== null) {
      userPosts = JSON.parse(localStorage.getItem('payload')!);
      userPosts = userPosts.filter((post: UserPostsInterface) => post.username === 'Hamilton');
    }

    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const posts = userPosts.filter(
      (post) => new Date(post.timestamp) > yesterday
    );

    return posts.length;
  }

  onTogglePosts($event: MatSlideToggleChange): void {
    const url = this.router.url.split('/')[1];

    if (url === 'all') {
      this.router.navigate(['/following']);
      this.isSlideChecked = true;
      $event.source.checked = true;
    } else {
      this.router.navigate(['/all']);
      this.isSlideChecked = false;
      $event.source.checked = false;
    }
  }

  // method to enable the user to type the url 
  // as /all or /following and get the correct post feed
  slideUrlCheck(): boolean {
    if (this.router.url.split('/')[1] === 'all') {
      return false;
    } else if (this.router.url.split('/')[1] === 'following') {
      return true;
    } else {
      return false;
    }
  }

  ngOnDestroy(): void {
    this.destroy.next(void 0);
    this.destroy.complete();
  }
}
