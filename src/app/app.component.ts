import { Component, computed, input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeCard } from './components/homecard.component';
import { QuestionCard } from './components/questioncard.component';
import { CommonModule } from '@angular/common';
import { AnswerCard } from './components/answercard.component';
import { Question, QuestionsData } from './interfaces';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeCard, QuestionCard, CommonModule, AnswerCard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  constructor(){
    // setTimeout(() => {
    //   this.isVisible = true;
    // }, 500);
  }
  // Signals for state management
  private questionsSignal = signal<Question[]>([]);
  private loadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);

  // Computed signals for template consumption
  readonly questions = computed(() => this.questionsSignal());
  readonly loading = computed(() => this.loadingSignal());
  readonly error = computed(() => this.errorSignal());

  onQuestionsLoaded(questions: Question[]){
    this.nextQuestionNumber = 0;
    this.lastQuestionShowed = false;
    this.questionsData = {
      totalQuestions: questions.length,
      isLastQuestion: this.lastQuestionShowed,
      currentQuestionNumber: this.nextQuestionNumber
    }
    this.questionsSignal.set(questions);
    this.getNextQuestion();
  }
  questionsData:QuestionsData = {} as QuestionsData;
  currentQuestion = signal<Question|null>(null);;
  lastQuestionShowed = false
  nextQuestionNumber = 0;
  getNextQuestion(){
    if(this.lastQuestionShowed) return;
    const questions = this.questions();
    this.currentQuestion.set(questions[this.nextQuestionNumber++])
    // Only one unanswered question remaining
    if(this.nextQuestionNumber>=questions.length){
      this.lastQuestionShowed = true;
    }
    this.questionsData = {
      isLastQuestion: this.lastQuestionShowed,
      totalQuestions: this.questionsData.totalQuestions,
      currentQuestionNumber: this.nextQuestionNumber
    }
  }

  isVisible = true;
  title = 'quiz-app';
  quizOn = signal(false);
  dismisAnswerCard = false;
  onDismisQuizCard(){
    this.dismisAnswerCard = true;
  }
  setQuizStatus(state:boolean){
    if(state){
      this.dismisAnswerCard = false;
    }
    this.isVisible = !state;
    this.quizOn.set(state);
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
