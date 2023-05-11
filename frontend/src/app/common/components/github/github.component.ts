import { Component } from '@angular/core';

@Component({
	selector: 'app-github',
	templateUrl: './github.component.html',
	styleUrls: ['./github.component.scss'],
})
export class GithubComponent {
	redirectToGitRepo(): void {
		window.open('https://github.com/TheRealPayPaul/ChatHappens', '_blank');
	}
}
