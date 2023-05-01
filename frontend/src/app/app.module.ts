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

@NgModule({
	declarations: [
		AppComponent,
		RegisterComponent,
		InputComponent,
		CardComponent,
		LogoComponent,
		ErrorMessageDirective,
		ToStringArrayPipe,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
