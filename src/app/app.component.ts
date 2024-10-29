import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeCard } from './components/homecard.component';
import { QuestionCard } from './components/questioncard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeCard, QuestionCard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'quiz-app';
  quizOn: boolean = false;
  setQuizStatus(state:boolean){
    this.quizOn = state;
  }
  sections: {title: string; caption: string}[] =  [
    {
      title: 'Any Category',
      caption: 'Take a quiz on any field in the world to test your knowledge on global, natural and other matters.'
    },
    {
      title: 'General Knowledge',
      caption: 'Take a quiz on any field in the world to test your knowledge on global, natural and other matters.'
    },
    {
      title: 'Entertainment - music',
      caption: 'Take a quiz on any field in the world to test your knowledge on global, natural and other matters.'
    },
    {
      title: 'Entertainment - Celebrities',
      caption: 'Take a quiz on any field in the world to test your knowledge on global, natural and other matters.'
    },
  ];
}
