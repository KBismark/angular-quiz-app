import { CommonModule } from "@angular/common";
import { Component, Input, input, output } from "@angular/core";
import { Question } from "../interfaces";

@Component({
  selector: 'answer-card',
  templateUrl: './answercard.component.html',
  imports: [CommonModule],
  standalone: true
})

export class AnswerCard{
  @Input({required: true})
  dismis!: boolean;
  @Input({required: true})
  initiateDismis!:boolean;
  question = input<Question|null>();
  onNextQuestion = output<void>()
}
