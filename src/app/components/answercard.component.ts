import { CommonModule } from "@angular/common";
import { Component, computed, effect, Input, input, OnChanges, output, SimpleChanges } from "@angular/core";
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

export class AnswerCard {
  constructor(private sanitizer: DomSanitizer){
    let scores:any = window.localStorage.getItem('scores');
    if(scores){
      try {
        scores = JSON.parse(scores);
        this.wrongAnswers = scores.wrong;
        this.correctAnswers = scores.correct;

      } catch (error) {}
    }
    let actions: any = window.localStorage.getItem('actions');
    if(actions){
      try {
        actions = JSON.parse(actions);
        this.answerConfirmed = actions.confirmed;
        this.selectedAnswer = actions.selected;
        this.showResults = actions.results;
        // this.answerConfirmed&&this.selectedAnswer
      } catch (error) {}
    }
  }
  @Input({required: true})
  dismis!: boolean;
  @Input({required: true})
  initiateDismis!:boolean;
  questionsData = input<QuestionsData>();
  question = input<Question|null>();
  nextQuestion = output<void>({alias: 'onNextQuestion'});
  onNextQuestion(){
    if(!this.answerConfirmed) return;
    this.nextQuestion.emit();
    this.reset()
  }
  reset(){
    this.selectedAnswer = '';
    this.answerConfirmed = false;
    window.localStorage.removeItem('actions');
    // if(this.questionsData()?.isLastQuestion){
    //   this.correctAnswers = 0;
    //   this.wrongAnswers = 0;
    //   this.showResults = false;
    //   window.localStorage.removeItem('scores');
    // }
  }

  selectedAnswer: string = '';
  answerConfirmed = false;
  correctAnswers = 0;
  wrongAnswers = 0;
  updateWrongAnswer = false;
  updateCorrectAnswer = false;
  showResults = false;
  beforeQuizEnd(){
    if(this.questionsData()?.isLastQuestion){
      this.showResults = true
      window.localStorage.setItem('actions',JSON.stringify({
        selected: this.selectedAnswer, confirmed: this.answerConfirmed,
        results: this.showResults,
      }))
    }

  }
  endQuiz(){
    this.showResults = false;
    this.reset()
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   const wrong = changes['wrongAnswers'];
  //   if(wrong){
  //     this.updateWrongAnswer = true;
  //     effect((onCleanup)=>{
  //       let t = setTimeout(() => {
  //         this.updateWrongAnswer = false;
  //       }, 600);
  //       onCleanup(()=>clearTimeout(t))
  //     })
  //   }
  //   const correct = changes['correctAnswers'];
  //   if(correct){
  //     this.updateCorrectAnswer = true;
  //     effect((onCleanup)=>{
  //       let t = setTimeout(() => {
  //         this.updateCorrectAnswer = false;
  //       }, 600);
  //       onCleanup(()=>clearTimeout(t))
  //     })
  //   }
  // }

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
      this.updateCorrectAnswer = true;
      // effect((onCleanup)=>{
        let t = setTimeout(() => {
          this.updateCorrectAnswer = false;
          this.beforeQuizEnd()
        }, 400);

      //   onCleanup(()=>clearTimeout(t))
      // })
    }
    else{
      this.wrongAnswers++;
      this.updateWrongAnswer = true;
      // effect((onCleanup)=>{
        let t = setTimeout(() => {
          this.updateWrongAnswer = false;
          this.beforeQuizEnd()
        }, 400);

      //   onCleanup(()=>clearTimeout(t))
      // })
    }
    window.localStorage.setItem('scores',JSON.stringify({
      correct: this.correctAnswers, wrong: this.wrongAnswers
    }));
    window.localStorage.setItem('actions',JSON.stringify({
      selected: this.selectedAnswer, confirmed: this.answerConfirmed,
      results: this.showResults,
    }))
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
