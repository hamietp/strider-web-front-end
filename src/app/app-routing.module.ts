import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HostComponent } from './components/host/host.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: 'all', component: HomePageComponent },
  { path: 'following', component: HomePageComponent },
  { path: ':id', component: HostComponent },
  { path: '**', redirectTo: 'all' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
