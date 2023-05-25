import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register-component/register.component';
import { LoginComponent } from './auth/login-component/login.component';
import { ChatOverviewComponent } from './chat/chat-overview-component/chat-overview.component';

const routes: Routes = [
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'chat', component: ChatOverviewComponent },
	{
		path: '',
		pathMatch: 'full',
		component: LoginComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
