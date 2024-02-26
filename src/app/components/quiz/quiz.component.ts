import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import quiz_questions from "../../../assets/data/quiz_questions.json"

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {

  titulo :string = ""
  questions :any
  perguntaSelecionada :any
  respostas :string[] = []
  repostaSelecionada :string = ''
  questionIndex :number = 0
  questionMaxIndex :number = 0
  finished :boolean = false

  //Pegando Informações do Json sobre o Questionário
  ngOnInit(): void {
    if(quiz_questions){
      this.finished = false
      this.titulo = quiz_questions.title

      this.questions = quiz_questions.questions
      this.perguntaSelecionada = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  //Colocando a alternativa da Resposta dentro do vetor e indo para Proximo Passo
  repostaEscolhida(value :string){
    this.respostas.push(value)
    this.proximoPasso()
  }

  //Passa para a proxima Pergunta ou o Resultado
 async proximoPasso(){
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex){

      this.perguntaSelecionada = this.questions[this.questionIndex]
    }
    else{
      this.finished = true

      //Verificar Opção ganhadora das Letras e mostrando resposta

      //recebe o valor da função checkResult() que está verificando o vetor Respostas
      const finalResult :string = await this.checkResult(this.respostas)

      //Está recebendo o texto do Resultado após enviar a Letra que mais aparece

      // 'finalResult' pode ser do tipo ANY, por isso temos que dizer que ele vai se comportar como uma chave do tipo Results do JSON, ou seja, que ele é "A" ou "B"
      this.repostaSelecionada = quiz_questions.results[finalResult as keyof typeof quiz_questions.results]

    }
  }

  //Função que verifica quantas vezes esta aparecendo as Letras, retorna a Letra que mais a apareceu e q define o resultado
  async checkResult(anwsers:string[]){
    const result = anwsers.reduce((anterior, atual, i, vetor)=>{

      if(vetor.filter(item => item === anterior).length > vetor.filter(item => item === atual).length){

        return anterior

      }else{

        return atual

      }
      })

    return result
  }


}
