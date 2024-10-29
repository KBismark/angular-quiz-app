import { Component, Input, input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherX } from '@ng-icons/feather-icons';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'question-card',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ featherX })],
  templateUrl: './questioncard.component.html',
  // styleUrl: './app.component.css'
})
export class QuestionCard {
  // title = 'quiz-app';
  // @Input({
  //   required: true,
  // })
  // title!: string;
  // @Input({
  //   required: true,
  // })
  // caption!: string;
}
