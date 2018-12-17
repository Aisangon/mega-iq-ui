import {Answer} from '@/_models';

export class Question {
  pic: string;
  answerCorrect: number;
  answerUser: number;
  title: string;
  description: string;
  updateDate: Date;
  answers: Answer[];
}