import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit {
  public postFeed: string[] = [];
  public userPosts: UserPosts[] = [];
  public assetsPath = '../../../assets/portraits/';

  constructor() {}

  ngOnInit(): void {
    this.userPosts = JSON.parse(localStorage.getItem('payload')!).sort(
      (a: any, b: any) => {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      }
    );
  }
}

export interface UserPosts {
  username: string;
  nickname: string;
  message: string;
  timestamp: Date;
  portrait: string;
}
