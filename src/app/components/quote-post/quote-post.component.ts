import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserPostsInterface } from 'src/app/interfaces/user-posts.interface';

@Component({
  selector: 'app-quote-post',
  templateUrl: './quote-post.component.html',
  styleUrls: ['./quote-post.component.scss'],
})
export class QuotePostComponent implements OnInit {
  public assetsPath = '../../../assets/portraits/';

  public dialogData: UserPostsInterface[] = [];
  public quoteTextarea = new FormControl([], Validators.maxLength(777));

  constructor(
    public dialogRef: MatDialogRef<QuotePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserPostsInterface
  ) {}

  ngOnInit(): void {}

  onSubmit(message: string): void {
    this.dialogRef.close([true, message]);
  }
}
