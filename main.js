// получение элементов html
let heading = document.querySelector('.question')
let btns = document.querySelectorAll('.btn')
let main_screen = document.querySelector('.main_screen')
let first_screen = document.querySelector('.first_screen')
let input = document.querySelector('.quantity_input')
let start_btn = document.querySelector('.start')


// Получение случайного целого числа (max не включительно)
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

class Question{
    constructor(qst, correct, wrong1, wrong2, wrong3, wrong4){
        this.qst = qst,
        this.correct = correct,
        this.answers = [
            correct,
            wrong1,
            wrong2,
            wrong3,
            wrong4
        ]
    }

    // метод возвращает массив ответов в случайном порядке
    mixAnswers(){
        let arr = []
        let counter = 0
        let randNum = 0
        while (this.answers.length > 0) {
            counter = this.answers.length
            randNum = getRandomInt(counter)
            arr.push(this.answers[randNum])
            this.answers.splice(randNum, 1)
        }
        return arr
    }

    // вывод вопроса и ответов
    display(){
        let mixedAnswers = this.mixAnswers()
        heading.innerHTML = this.qst
        for (let index = 0; index < btns.length; index++) {
            btns[index].innerHTML = mixedAnswers[index]
            
        }
    }
}

// Генерация случайных вопросов
function randomQuestion(quantity){
    let qst_list = []
    let operator_list = ['+','-','*','/']
    for (let index = 0; index < quantity; index++) {

        // получение оператора 
        let operator = operator_list[getRandomInt(4)]

        // два числа, ответ и вопрос
        let x, y, correct, qst

        // проверка оператора и генерация вопросов
        switch (operator){
            case "+":
                x = getRandomInt(100)
                y = getRandomInt(100)
                correct = x + y
                qst = new Question(`${x}+${y}`, correct, getRandomInt(100), getRandomInt(100), getRandomInt(100), getRandomInt(100))
                qst_list.push(qst)
                break
            case "-":
                x = getRandomInt(100)
                y = getRandomInt(100)
                correct = x - y
                qst = new Question(`${x}-${y}`, correct, getRandomInt(100), getRandomInt(100), getRandomInt(100), -getRandomInt(100))
                qst_list.push(qst)
                break
            case "*":
                x = getRandomInt(10)
                y = getRandomInt(10)
                correct = x * y
                qst = new Question(`${x}*${y}`, correct, getRandomInt(100), getRandomInt(100), getRandomInt(100), getRandomInt(100))
                qst_list.push(qst)
                break
            case "/":
                x = getRandomInt(100)
                y = getRandomInt(10)
                correct = x / y
                // на ноль делить нельзя
                while(x % y != 0){
                    x = getRandomInt(100)
                    y = getRandomInt(10) 
                    if(y == 0){
                        y += 1
                    } 
                    correct = x / y
                }
                qst = new Question(`${x}/${y}`, correct, getRandomInt(100), getRandomInt(100), getRandomInt(100), getRandomInt(100))
                qst_list.push(qst)   
        }

    }
    return qst_list
}

// список вопросов
let question_list = []

// счетчик пройденных вопросов, верных ответов и вывод текущего
let qst_counter = 0
let correct_counter = 0
let current_qst 

// Нажатие на кнопки и проверка результата
btns.forEach(el => {
    el.addEventListener('click', function(){
        
        if (el.innerHTML == current_qst.correct){
            console.log('верно')
            correct_counter += 1
            el.classList.add('correct')
            setTimeout(function(){
                el.classList.remove('correct')
            }, 300)
        }else{
            console.log('неверно')
            el.classList.add('incorrect')
            setTimeout(function(){
                el.classList.remove('incorrect')
            }, 300)
        }
        
        // Смена и вывод нового вопроса
        qst_counter += 1
        if (qst_counter == question_list.length){
            alert(`Вопросов пройдено: ${qst_counter};\nВерно: ${correct_counter};\nНеверно: ${qst_counter - correct_counter}`)
            
            main_screen.style.display = 'none'
            first_screen.style.display = 'flex'
            input.value = ''
        }else{
            current_qst = question_list[qst_counter]
            current_qst.display()
        }
        

        
    })
})

start_btn.addEventListener('click', function(){
    //генерация списка вопросов 
    question_list = randomQuestion(+input.value)
    current_qst = question_list[qst_counter]
    current_qst.display()
    first_screen.style.display = 'none'
    main_screen.style.display = 'block'
})



