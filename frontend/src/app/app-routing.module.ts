import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register-component/register.component';
import { LoginComponent } from './auth/login-component/login.component';
import { ChatOverviewComponent } from './chat/chat-overview-component/chat-overview.component';
import { loggedIn } from './common/route-guards/logged-in.guard';
import { notLoggedIn } from './common/route-guards/not-logged-in.guard';

const TITLE_POSTFIX = ' | Chat Happens';

const routes: Routes = [
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [notLoggedIn],
		title: 'Register' + TITLE_POSTFIX,
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [notLoggedIn],
		title: 'Login' + TITLE_POSTFIX,
	},
	{
		path: '',
		canActivate: [loggedIn],
		component: ChatOverviewComponent,
		title: 'Home ' + TITLE_POSTFIX,
	},
	{
		path: '**',
		redirectTo: '',
		pathMatch: 'full',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
