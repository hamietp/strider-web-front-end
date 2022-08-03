import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { UserPostsComponent } from '../components/user-posts/user-posts.component';
import { UserPostsInterface } from '../interfaces/user-posts.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, AfterContentChecked {
  public assetsPath = '../../../assets/portraits/';
  public userPosts: UserPostsInterface[] = [];
  public userNumbers: UserPostsInterface[] = [];
  public userNumbers$!: Observable<UserPostsInterface[]>;

  public fetchedData: UserPostsInterface[] = [];
  public userFollowing: string[] = [];
  public followable: boolean = false;

  private destroy = new Subject<any>();

  constructor(
    private cdRef: ChangeDetectorRef,
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
    this.userPosts = JSON.parse(localStorage.getItem('payload')!).sort(
      (a: any, b: any) => {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      }
    );
  }

  fetchUserPosts(): void {
    let userNickname = JSON.parse(localStorage.getItem('payload')!);
    let userFollowing = userNickname[0].following;

    userNickname.forEach((post: any) => {
      if (post.nickname === this.data.id) {
        this.fetchedData.push(post);
        userFollowing.push(post.following);
      }
    });

    userNickname.forEach(() => {
      if (!userFollowing.includes(this.data.id)) {
        this.followable = true;
      }
    });
  }

  followUser(): void {
    let updateUserProfile: UserPostsInterface[] = JSON.parse(
      localStorage.getItem('payload')!
    );

    updateUserProfile.forEach((post: any) => {
      if (post.nickname === this.data.id) {
        post.followers = [
          ...post.followers,
          JSON.parse(localStorage.getItem('payload')!)[0].nickname,
        ];
      }
      if (post.nickname === 'lewishamilton') {
        post.following = [...post.following, this.data.id];
      }
    });

    localStorage.setItem('payload', JSON.stringify(updateUserProfile));
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
  }

  ngOnDestroy(): void {
    this.destroy.next(void 0);
    this.destroy.complete();
  }
}
