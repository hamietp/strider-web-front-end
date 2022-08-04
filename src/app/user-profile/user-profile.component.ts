import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserPostsInterface } from '../interfaces/user-posts.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, AfterContentChecked {
  public assetsPath = '../../../assets/portraits/';
  public userPosts: UserPostsInterface[] = [];
  public userNumbers$!: Observable<UserPostsInterface[]>;

  public fetchedData: UserPostsInterface[] = [];
  public userFollowing: string[] = [];
  public followable: boolean = false;

  private destroy = new Subject<any>();

  currentRoute: string = this.router.url.split('/')[1];


  constructor(
    private cdRef: ChangeDetectorRef,
    public router: Router,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userNumbers$ = new Observable<UserPostsInterface[]>();
  }
  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.fetchUserPosts();
    this.getPosts();
  }

  getPosts(): void {
    this.userPosts = JSON.parse(localStorage.getItem('payload')!)
      .filter((post: any) => {
        return post.nickname === this.data.id;
      })
      .sort((a: any, b: any) => {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });
  }

  fetchUserPosts(): void {
    let userNickname = JSON.parse(localStorage.getItem('payload')!).filter(
      (post: any) => post.nickname === this.data.id
    );
    let userFollowing: UserPostsInterface[] = userNickname.filter(
      (user: any) => {
        return user.following === this.data.id;
      }
    );

    userNickname.forEach((post: any) => {
      if (post.nickname === this.data.id) {
        this.fetchedData.push(post);
        userFollowing.push(post.following);
      }

      if (!userNickname[0].followers!.includes('lewishamilton')) {
        this.followable = true;
      } else {
        this.followable = false;
      }
    });
  }

  followUser(): void {
    let updateUserProfile: UserPostsInterface[] = JSON.parse(
      localStorage.getItem('payload')!
    );

    updateUserProfile.forEach((post: any) => {
      if (post.nickname === this.data.id) {
        post.followers = [...post.followers, 'lewishamilton'];
      }
      if (post.nickname === 'lewishamilton') {
        post.following = [...post.following, this.data.id];
      }
    });

    localStorage.setItem('payload', JSON.stringify(updateUserProfile));
    this.dialogRef.close();
  }

  unfollowUser(): void {
    let updateUserProfile: UserPostsInterface[] = JSON.parse(
      localStorage.getItem('payload')!
    );

    updateUserProfile.forEach((post: any) => {
      if (post.nickname === 'lewishamilton') {
        post.following = post.following.filter(
          (following: string) => following !== this.data.id
        );
      }
      if (post.nickname === this.data.id) {
        post.followers = post.followers.filter(
          (follower: string) => follower !== 'lewishamilton'
        );
      }
    });

    localStorage.setItem('payload', JSON.stringify(updateUserProfile));
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.destroy.next(void 0);
    this.destroy.complete();
  }
}
