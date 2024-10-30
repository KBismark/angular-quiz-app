import { HttpClient } from '@angular/common/http';
import { Component, Injectable, input, output, OnInit, signal, computed, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherX } from '@ng-icons/feather-icons';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Question } from '../interfaces';



interface QuizApiResponse {
  response_code: number;
  results: Question[];
}

@Component({
  selector: 'question-card',
  standalone: true,
  imports: [NgIconComponent],
  viewProviders: [provideIcons({ featherX })],
  templateUrl: './questioncard.component.html'
})
@Injectable({ providedIn: 'root' })
export class QuestionCard implements OnInit {
  // Signals for state management
  private questionsSignal = signal<Question[]>([]);
  private loadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);

  // Computed signals for template consumption
  readonly questions = computed(() => this.questionsSignal());
  readonly loading = computed(() => this.loadingSignal());
  readonly error = computed(() => this.errorSignal());

  question = input<Question|null>();
  onQuestionsLoad = output<Question[]>()

  count = 0;
  pingOut = false;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadQuestions();
  }

  getQuestion(){
    const question = this.question();
    return this.sanitizer.bypassSecurityTrustHtml(
      question?question.question:'No question available. Press on load new quiz...'
    )
  }

  private loadQuestions() {
    if(this.question()) return;
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<QuizApiResponse>('https://opentdb.com/api.php?amount=10')
      .pipe(
        map(response => {
          if (response.response_code !== 0) {
            throw new Error('Failed to fetch questions');
          }
          return response.results;
        }),
        catchError(error => {
          console.error('Error fetching questions:', error);
          this.errorSignal.set('Failed to load questions. Please try again.');
          return of(null);
        })
      )
      .subscribe({
        next: (questions) => {
          if (questions) {
            // this.questionsSignal.set(questions);
            this.onQuestionsLoad.emit(questions);
          }
          this.loadingSignal.set(false);
        },
        error: () => {
          this.loadingSignal.set(false);
        }
      });
  }

  // Output event for hiding card
  hideCard = output<void>({ alias: 'hideQuestionCard' });
  beforeClose = output<void>();
  @Input({required: true})
  showCard!: boolean;

  hideQuestionCard() {
    this.pingOut = true;
    this.beforeClose.emit();
    setTimeout(() => {
      this.pingOut = false;
      this.hideCard.emit();
    }, 900);

  }

  // Method to retry loading questions
  retryLoading() {
    this.loadQuestions();
  }
}
