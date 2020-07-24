import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_guards/auth.guard';

import { MemberDetailResolverService } from './_resolver/member-detail.resolver';
import { MemberListResolverService } from './_resolver/member-list.resolver';

import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemeberListComponent } from './members/memeber-list/memeber-list.component';
import { HomeComponent } from './home/home.component';
import { MemeberDetailComponent } from './members/memeber-detail/memeber-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolverService } from './_resolver/member-edit.resolver';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children:
      [
        { path: 'members', component: MemeberListComponent, resolve: { users: MemberListResolverService } },
        { path: 'members/:id', component: MemeberDetailComponent, resolve: { user: MemberDetailResolverService } },
        {
          path: 'member/edit', component: MemberEditComponent, resolve: { user: MemberEditResolverService }
          , canDeactivate: [PreventUnsavedChanges]
        },
        { path: 'messages', component: MessagesComponent },
        { path: 'lists', component: ListsComponent }
      ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
