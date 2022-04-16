

let bullets = document.querySelectorAll(".answer .ans");
 

bullets.forEach((bullet) => {
  bullet.addEventListener("click", function () {
    bullets.forEach((e) => {
      e.classList.remove("active");
    });
    bullet.classList.add("active");

   if(bullet.classList.contains('active')){
    checkedAnswer = []
    checkedAnswer.push(bullet.children[1].textContent)
   }
  });
});



let theH2 = document.querySelector(".quiz h2"),
    answers = document.querySelectorAll(".answer .ans label"),
    counter = document.querySelector('.quiz .quiztion-number span:first-of-type'),
    numberAsk = document.querySelector('.quiz .quiztion-number span:last-of-type'),
    submitButton = document.querySelector(".quiz button"),
    border = document.querySelector('.border'),
    number = 0,
    correctAns = 0,
    borderNumber = 0,
    correntAnswer = [],
    checkedAnswer = [],
    timer = document.querySelector('.timer');
    timer.textContent = 15


fetch("./Quiz.json")
  .then((response) => response.json())
  .then((quiztions) => {
    
    setQuiztion(quiztions)
    
  let quizLen = quiztions.length - 1,
      time = setInterval(() => {
      timer.textContent--
      if (timer.textContent == 0){
        number++
        counter.textContent++
        theH2.textContent = quiztions[number].title;
        let quiztion = Object.values(quiztions[number]);
        answers.forEach((e ,index) =>  e.textContent = quiztion[index + 1]);
        bullets.forEach(bullet => bullet.classList.remove('active'))
        borderNumber += 100 / quizLen ;
        border.style.width = "" +borderNumber+"%";
        timer.textContent = 15
        if (number == quiztions.length - 1){
          finish(quiztions.length - 1)
          clearInterval(time)
        }
      }
    },1000)

    submitButton.addEventListener('click', function(e){
      number++
      counter.textContent++
      theH2.textContent = quiztions[number].title;
      let quiztion = Object.values(quiztions[number]);
       answers.forEach((e ,index) =>  e.textContent = quiztion[index + 1]);
       bullets.forEach(bullet => bullet.classList.remove('active'))
       
       quiztions.forEach(quiz => {
        correntAnswer.push(quiz.correct_answer)
      })
      checkAnswer(quiztions.length - 1)

      timer.textContent = 15
      if (number == quiztions.length - 1){
        finish(quiztions.length - 1)
        clearInterval(time)
      }
     })

  });



function setQuiztion(quiztions){
  
let quiztion = Object.values(quiztions[number]);

theH2.textContent = quiztions[number].title;
quiztion.shift();
answers.forEach((e,index) => e.textContent = quiztion[index]);
numberAsk.textContent = quiztions.length - 1;
counter.textContent = number;
numberAsk.textContent = quiztions.length - 1

}


  

function checkAnswer(quizLen){
      if (checkedAnswer[0] === correntAnswer[number - 1]){
        borderNumber += 100 / quizLen
        correctAns++
        border.style.width = "" +borderNumber+"%";
        }else{
          borderNumber += 100 / quizLen;
          border.style.width = "" +borderNumber+"%";
        }
}


function finish(quizNum){
        let popupContainer = document.createElement("div"),
          popup = document.createElement("div"),
          correctAnswer = document.createElement("span"),
          allAnswer = document.createElement("span"),
          retry = document.createElement("button"),
          spanBox = document.createElement("div"),
          textSpan = document.createTextNode("From");
        allAnswer.textContent = quizNum;
        correctAnswer.textContent = correctAns;
        retry.textContent = "Try Again";
        popupContainer.className = "popup-c";
        popup.className = "popup";
        retry.className = "retry";
        spanBox.appendChild(textSpan);
        spanBox.appendChild(allAnswer);
        spanBox.prepend(correctAnswer);
        popup.appendChild(spanBox);
        popup.appendChild(retry);
        popupContainer.appendChild(popup);
        document.body.appendChild(popupContainer);
}

window.document.addEventListener('click', function(e){
  if (e.target.classList.contains('retry')){
    window.location.reload()
  }
})

