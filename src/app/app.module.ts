import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { NewPostComponent } from './components/new-post/new-post.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HostComponent } from './components/host/host.component';

const MATERIAL_MODULES = [
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTooltipModule
];

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NewPostComponent,
    UserCardComponent,
    UserPostsComponent,
    UserProfileComponent,
    HostComponent,
  ],
  imports: [
    ...MATERIAL_MODULES,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
