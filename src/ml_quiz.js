import React, { Component } from 'react'
import {Questions} from './questions';
import './styles.css'

export class Quiz extends Component {

    constructor(props) {
      super(props)
    
      this.state = {
        userAnswer:null, //current users answer
        currentIndex:0,  //current questions index
        options: [],     //the four options
        quizStart: false, //if switch to questions 
        quizEnd: false,  //determines if it's the last question
        score: 0,        //holds the score
        disabled_answer: true ,  // button answer status
        disabled_next: true, // button next status
        message:null, // correct or incorrect answer
        message_show: false //when to show message
      }
    }
    startHandler = () =>{
    this.setState({quizStart: true})}

    restartHandler = () =>{ // back to start page if pushed the button to start again
        this.setState({quizStart: false,
            userAnswer:null, 
        currentIndex:0,  
        options: [],   
        quizStart: false,
        quizEnd: false,  
        score: 0,        
        disabled_answer: true ,  
        disabled_next: true,
        message:null,
        message_show: false
        
        })}

    loadQuiz = () => {
    const {currentIndex} = this.state //get the current question index
    this.setState(() => {
        return {
            question: Questions[currentIndex].question,
            options : Questions[currentIndex].options,
            answer: Questions[currentIndex].answer, 
            comment: Questions[currentIndex].comment
        }
         }
        )
        }

    answerClickHandler = () => { //after the user clicks the button answer
            const {userAnswer, answer, comment} = this.state
            if(userAnswer === answer) {
              this.setState({ message: `Верно!`})
        }
            else {
              this.setState({ message: `Неверно:(`});
            }
            this.setState({disabled_next: false, // available next button
            disabled_answer: true, 
            message_show: true})

          }

    nextQuestionHandler = () => {
        const {userAnswer, answer, score} = this.state
        //Check if correct answer and increment score
        if(userAnswer === answer){
            this.setState({
                score: score + 1
            })
            }
        this.setState({
        currentIndex: this.state.currentIndex + 1,
        disabled_next: true,
        message_show: false
        })

    }

    componentDidMount = () =>{
        this.loadQuiz()
    }

    //Check the answer
    checkAnswer = answer => {
    this.setState({
        userAnswer: answer, //when clicks one of the options 
        disabled_answer:false
    });
        }


    //Update the component
    componentDidUpdate(prevProps, prevState){
    const{currentIndex} = this.state;
    if(this.state.currentIndex !== prevState.currentIndex){
        this.setState(() => {
            return {
                // disabled: true,
                question: Questions[currentIndex].question,
                options : Questions[currentIndex].options,
                answer: Questions[currentIndex].answer,
                comment: Questions[currentIndex].comment

            }
        });

    }
}


finishHandler = () => { //when reaches the last question 
    const { userAnswer, answer, score } = this.state
    if (userAnswer === answer) {
      this.setState({
        score: score + 1
      })
    }
    if (this.state.currentIndex === Questions.length - 1) {
      this.setState({
        quizEnd: true,
        disabled_next:false
      })
    }
  }

render() {
    const {
        question, options, currentIndex, userAnswer, quizEnd, quizStart} = this.state //get the current state
    
    
    if(quizEnd) {
        return (
            <div>
                <h1>Вы набрали {this.state.score} балл(ов)</h1>
                <button 
                class="glow-on-hover" 
                role="button"
                onClick = {this.restartHandler}>
                    Пройти тест заново
                </button>
            </div>
        )
    }
    if (quizStart)
            
        return (
            <div>
                <h2>{question}</h2>
                <h3>{`Вопрос ${currentIndex + 1} of ${Questions.length}`}</h3>
                
                {options.map(option => (  //options
                    <p key={option.id} 
                    className={`button
                    // ${userAnswer === option ? "selected" : null}

                    `}
                    onClick= {() => this.checkAnswer(option)}

                    >
                        {option}
                    </p>))}                             

                {/* first 9 questions */}

                {currentIndex < Questions.length -1 &&
                <button 
                className="glow-on-hover"
                disabled = {this.state.disabled_answer}
                onClick = {this.answerClickHandler}
                    >Answer</button> 
                }

                
                {currentIndex < Questions.length -1 &&
                <button 
                className="glow-on-hover"
                disabled = {this.state.disabled_next}
                onClick = {this.nextQuestionHandler}
                    >Next</button> 
                }
                {/*the last question*/}

                {currentIndex === Questions.length -1 &&
                    <button
                    className="glow-on-hover"
                    disabled = {this.state.disabled_answer}
                    onClick = {this.answerClickHandler}
                    >Answer</button> 
                    }

                {currentIndex === Questions.length -1 &&
                    <button
                    className="glow-on-hover"
                    disabled = {this.state.disabled_next}
                    onClick = {this.finishHandler}
                    >Finish</button>
                    }

                {this.state.message_show === true &&
                    <p className='message'>{this.state.message}</p>  
                    }
                {this.state.message_show === true &&
                    <p className='comment'>{this.state.comment}</p>  
                    }
                
            </div>
        )

    return (
            <div>
                <h1>Добро пожаловать на квиз по машинному обучению!</h1>

                <div class="description_text">
                <p>В тесте Вам будет предложено ответить на 10 вопросов по машинному обучению, в конце Вы увидите итоговое количество баллов.</p>
                <p>Удачи!</p>
                </div>
               
                <button 
                class="glow-on-hover" 
                role="button"
                onClick = {this.startHandler}>
                    Начать
                   
                </button>

            </div>
        )    
}
}

export default Quiz






