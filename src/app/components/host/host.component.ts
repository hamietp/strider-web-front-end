import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserProfileComponent } from 'src/app/user-profile/user-profile.component';

@Component({
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss'],
})
export class HostComponent {
  public currentDialog: MatDialogRef<any> = undefined!;
  private destroy = new Subject<any>();

  constructor(
    public dialog: MatDialog,
    public route: ActivatedRoute,
    public router: Router
  ) {
    route.params.pipe(takeUntil(this.destroy)).subscribe((params) => {
      if (this.currentDialog) {
        this.currentDialog.close();
      }

      this.currentDialog = dialog.open(UserProfileComponent, {
        maxHeight: '90vh',
        data: {
          id: params['id'],
        },
      });
      this.currentDialog.afterClosed().subscribe((_) => {
        router.navigateByUrl('/');
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
  }
}
