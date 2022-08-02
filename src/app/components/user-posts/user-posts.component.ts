import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { UserPostsInterface } from 'src/app/interfaces/user-posts.interface';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit, AfterContentChecked {
  public assetsPath = '../../../assets/portraits/';

  public postFeed: string[] = [];
  public userPosts: UserPostsInterface[] = [];
  public userPosts$!: Observable<UserPostsInterface[]>;

  private destroy = new Subject<any>();

  constructor(private cdRef: ChangeDetectorRef, private route: ActivatedRoute) {
    this.userPosts$ = new Observable<UserPostsInterface[]>();
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
