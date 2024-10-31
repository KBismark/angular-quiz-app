import { CommonModule } from "@angular/common";
import { Component, computed, Input, input, output } from "@angular/core";
import { Question, QuestionsData } from "../interfaces";
import { NgIconComponent, provideIcons } from "@ng-icons/core";
import {featherCheck, featherX} from "@ng-icons/feather-icons"
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'answer-card',
  templateUrl: './answercard.component.html',
  imports: [CommonModule, NgIconComponent],
  standalone: true,
  viewProviders: [provideIcons({featherCheck, featherX})]
})

export class AnswerCard{
  constructor(private sanitizer: DomSanitizer){}
  @Input({required: true})
  dismis!: boolean;
  @Input({required: true})
  initiateDismis!:boolean;
  questionsData = input<QuestionsData>();
  question = input<Question|null>();
  nextQuestion = output<void>({alias: 'onNextQuestion'});
  onNextQuestion(){
    if(!this.answerConfirmed||this.questionsData()?.isLastQuestion) return
    this.nextQuestion.emit();
    this.reset()
  }
  reset(){
    this.selectedAnswer = '';
    this.answerConfirmed = false;
  }

  selectedAnswer: string = '';
  answerConfirmed = false;
  correctAnswers = 0;
  wrongAnswers = 0;

  getAnswerOptions = computed(()=>{
    const question = this.question();
    if(!question) return []
    return this.shuffleArray([...question.incorrect_answers, question.correct_answer])
  })
  getCorrectAnswer(){
    const question = this.question();
    if(!question) return ''
    return question.correct_answer
  }
  selectAnswer(option: string){
    if(this.answerConfirmed) return;
    this.selectedAnswer = option
  }
  confirmAnswer(){
    if(!this.selectedAnswer||this.answerConfirmed) return;
    this.answerConfirmed = true;
    if(this.selectedAnswer === this.getCorrectAnswer()){
      this.correctAnswers++;
    }
    else{
      this.wrongAnswers++;
    }
  }
  bypassHTMLSecurity(value: string){
    return this.sanitizer.bypassSecurityTrustHtml(value)
  }
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}
