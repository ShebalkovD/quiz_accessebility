// получение заголовка и кнопок html
let heading = document.querySelector('h1')
let btns = document.querySelectorAll('.btn')

class Question{
    constructor(qst, correct, wrong1, wrong2, wrong3, wrong4){
        this.qst = qst,
        this.correct = correct,
        this.qst_list = [
            correct,
            wrong1,
            wrong2,
            wrong3,
            wrong4
        ]
    }
    display(){
        heading.innerHTML = this.qst
        for (let index = 0; index < btns.length; index++) {
            btns[index].innerHTML = this.qst_list[index]
            
        }
    }
}

// список вопросов
queston_list = [
    new Question('5+5', 10, 5, 45, 6, 89)
]

// счетчик пройденных вопросов и вывод текущего
let qst_counter = 0
let current_qst = queston_list[qst_counter]
current_qst.display()

// Нажатие на кнопки и проверка результата
btns.forEach(el => {
    el.addEventListener('click', function(){
        if (el.innerHTML == current_qst.correct){
            console.log('верно')
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
    })
})