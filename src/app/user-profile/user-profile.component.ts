import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
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
  followers?: number;
  following?: number;
}
