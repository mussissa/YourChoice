import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import quizz_question from '../../../assets/data/quizz_questions.json'


@Component({
  selector: 'app-quizz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit {


  title:string=""
  question:any
  nuevo:any
  questionSelected:any
  answers:string[] = []
  answersSelected:string=""

  questionIndex:number=0

  questionMaxIndex:number=0


  finished:boolean = false

  citySelected:boolean = false
  cityName:string = ""

  cidades:string[]=['São Paulo', 'Rio de Janeiro', 'Salvador', 'Belo Horizonte', 'Curitiba', 'Goiânia' ]

  
  ngOnInit(): void {
    
   if(quizz_question){
      this.finished = false
      this.title = quizz_question.title
    }

  }



  playerCity(value:string){
    this.cityName = value
    
    this.citySelected = true

    this.nuevo = quizz_question.cidade.find(item => item.sigla ===this.cityName)

    this.question = this.nuevo.questions

    this.questionSelected = this.question[this.questionIndex]

    this.questionMaxIndex = this.question.length

    
  }




  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()

  }

  async nextStep(){
    this.questionIndex+=1
    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.question[this.questionIndex]
    }else{
      const veredito:string = await this.checkResult(this.answers)
      this.finished = true
      this.answersSelected = this.nuevo.results[veredito as keyof typeof this.nuevo.results]
     

      setTimeout(()=>{
 
        location.reload();
      }, 10000)



    }
  }


  async checkResult( answers:string[]){
    const result = answers.reduce((previous, current, i, arr) =>{
      if(arr.filter(item => item === previous).length > 
         arr.filter(item => item === current).length
       ){
       
         return previous
       }else{
        
         return current
       }
    })
    return result
  }

}
