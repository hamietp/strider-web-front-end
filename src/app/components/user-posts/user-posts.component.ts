import {
  AfterContentChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit, AfterContentChecked {
  public assetsPath = '../../../assets/portraits/';

  public postFeed: string[] = [];
  public userPosts: UserPosts[] = [];
  public userPosts$!: Observable<UserPosts[]>;

  private destroy = new Subject<any>();

  constructor(private cdRef: ChangeDetectorRef) {
    this.userPosts$ = new Observable<UserPosts[]>();
  }

  ngAfterContentChecked(): void {
    this.getPosts();
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.destroy.next(void 0);
    this.destroy.complete();
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
