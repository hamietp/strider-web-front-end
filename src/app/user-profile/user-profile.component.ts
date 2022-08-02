import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserPostsComponent } from '../components/user-posts/user-posts.component';
import { UserPostsInterface } from '../interfaces/user-posts.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public assetsPath = '../../../assets/portraits/';
  public userPosts: UserPostsInterface[] = [];
  public fetchedData: UserPostsInterface[] = [];
  public userFollowing: string[] = [];
  public followable: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UserProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

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

    console.log(this.followable);
  }

  followUser(): void {
    let updateUserProfile = JSON.parse(localStorage.getItem('payload')!);

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

    console.log(updateUserProfile);

    localStorage.setItem('payload', JSON.stringify(updateUserProfile));
  }

  unfollowUser(): void {}
}
