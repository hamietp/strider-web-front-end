import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UserPostsInterface } from 'src/app/interfaces/user-posts.interface';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';
import { QuotePostComponent } from '../quote-post/quote-post.component';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit, AfterContentChecked {
  public assetsPath = '../../../assets/portraits/';

  public filteredPosts: UserPostsInterface[] = [];
  public filteredPosts$!: Observable<UserPostsInterface[]>;
  public userDailyPosts = 0;

  private destroy = new Subject<any>();

  currentRoute: string = this.router.url.split('/')[1];

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.filteredPosts = JSON.parse(localStorage.getItem('payload')!);
    this.filteredPosts$ = new Observable<UserPostsInterface[]>();
  }

  ngAfterContentChecked(): void {
    this.getPosts();
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.getPosts();
    this.userDailyPosts = this.getUserDailyPosts();
    console.log(this.filteredPosts);
  }

  getPosts(): void {
    if (this.router.url.split('/')[1] === 'all') {
      this.filteredPosts = JSON.parse(localStorage.getItem('payload')!);
    } else if (this.router.url.split('/')[1] === 'following') {
      this.filteredPosts = JSON.parse(localStorage.getItem('payload')!).filter(
        (posts: UserPostsInterface) => {
          return (
            posts.nickname.includes('lewishamilton') ||
            posts.followers?.includes('lewishamilton')
          );
        }
      );
    } else {
      this.filteredPosts = JSON.parse(localStorage.getItem('payload')!).filter(
        (posts: UserPostsInterface) => {
          return posts.nickname.includes(this.router.url.split('/')[1]);
        }
      );
    }
  }

  getUserDailyPosts(): number {
    let userPosts: UserPostsInterface[] = JSON.parse(
      localStorage.getItem('payload')!
    ).filter((post: UserPostsInterface) => post.nickname === 'lewishamilton');

    const today = new Date();
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const posts = userPosts.filter(
      (post) => new Date(post.timestamp) > yesterday
    );

    return posts.length;
  }

  repost(post: UserPostsInterface): void {
    let allPosts: UserPostsInterface[] = JSON.parse(
      localStorage.getItem('payload')!
    ) as UserPostsInterface[];
    let currentUserPosts = JSON.parse(localStorage.getItem('payload')!).filter(
      (user: UserPostsInterface) => {
        return user.nickname === 'lewishamilton';
      }
    );

    const newRepostObject: UserPostsInterface = {
      username: currentUserPosts[0].username,
      nickname: currentUserPosts[0].nickname,
      message: post.message,
      timestamp: new Date().toISOString(),
      portrait: currentUserPosts[0].portrait,
      following: currentUserPosts[0].following,
      followers: currentUserPosts[0].followers,
      repost: true,
      repostFrom: post.username,
      repostNickname: post.nickname,
      repostTimestamp: post.timestamp,
      repostPortrait: post.portrait,
    };

    allPosts = [newRepostObject, ...allPosts] as UserPostsInterface[];
    localStorage.setItem('payload', JSON.stringify(allPosts));
    this.dialog.closeAll();
  }

  quotePost(post: UserPostsInterface): void {
    this.dialog
      .open(QuotePostComponent, { data: post })
      .afterClosed()
      .subscribe((res: any) => {
        try {
          if (res[0] === true) {
            let allPosts: UserPostsInterface[] = JSON.parse(
              localStorage.getItem('payload')!
            ) as UserPostsInterface[];
            let currentUserPosts = JSON.parse(
              localStorage.getItem('payload')!
            ).filter((user: UserPostsInterface) => {
              return user.nickname === 'lewishamilton';
            });

            const newQuoteObject: UserPostsInterface = {
              username: currentUserPosts[0].username,
              nickname: currentUserPosts[0].nickname,
              message: res[1] || '',
              timestamp: new Date().toISOString(),
              portrait: currentUserPosts[0].portrait,
              following: currentUserPosts[0].following,
              followers: currentUserPosts[0].followers,
              quotePost: true,
              quoteMessage: post.message,
              repostFrom: post.username,
              repostNickname: post.nickname,
              repostTimestamp: post.timestamp,
              repostPortrait: post.portrait,
            };

            allPosts = [newQuoteObject, ...allPosts] as UserPostsInterface[];
            localStorage.setItem('payload', JSON.stringify(allPosts));
            this.dialog.closeAll();
          }
        } catch (error) {
          this.dialog.closeAll();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy.next(void 0);
    this.destroy.complete();
  }
}
