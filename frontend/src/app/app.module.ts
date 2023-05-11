import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register-component/register.component';
import { InputComponent } from './common/components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './common/components/card/card.component';
import { LogoComponent } from './common/components/logo/logo.component';
import { ErrorMessageDirective } from './common/directives/error-message/error-message.directive';
import { ToStringArrayPipe } from './common/pipes/to-string-array.pipe';
import { LoginComponent } from './auth/login-component/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ChatOverviewComponent } from './chat/chat-overview-component/chat-overview.component';
import { ChatComponent } from './chat/chat-component/chat.component';
import { ChatSidebarComponent } from './chat/chat-sidebar-component/chat-sidebar.component';
import { UserStatusComponent } from './common/components/user-status/user-status.component';
import { ProfilePictureComponent } from './common/components/profile-picture/profile-picture.component';
import { ChatUserInfoComponent } from './chat/chat-user-info-component/chat-user-info.component';
import { ChatContactComponent } from './chat/chat-contact-component/chat-contact.component';
import { ChatInputBarComponent } from './chat/chat-input-bar-component/chat-input-bar.component';
import { GithubComponent } from './common/components/github/github.component';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';

@NgModule({
	declarations: [
		AppComponent,
		RegisterComponent,
		InputComponent,
		CardComponent,
		LogoComponent,
		ErrorMessageDirective,
		ToStringArrayPipe,
		LoginComponent,
		ChatOverviewComponent,
		ChatComponent,
		ChatSidebarComponent,
		UserStatusComponent,
		ProfilePictureComponent,
		ChatUserInfoComponent,
		ChatContactComponent,
		ChatInputBarComponent,
		GithubComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
