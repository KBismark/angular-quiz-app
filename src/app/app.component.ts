import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeCard } from './components/homecard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeCard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'quiz-app';
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
