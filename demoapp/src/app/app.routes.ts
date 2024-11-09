import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdduserComponent } from './adduser/adduser.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { ShowdetailsComponent } from './showdetails/showdetails.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'add-user', component: AdduserComponent },
    { path: 'update-user/:id', component: UpdateuserComponent },
    { path: 'show-details/:id', component: ShowdetailsComponent },


];
