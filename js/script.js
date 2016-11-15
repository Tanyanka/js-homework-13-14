'use strict';

window.onload = function functionName() {

var html = document.getElementById('content').innerHTML;
var testWrapper = document.querySelector('.test-wrapper');
var arrCorrectAnswers = [];
var arrUserAnswers = [];
//Вопросы теста и ответы
var localTest = [
    {
        question: "Какое значение по-умолчанию для стиля position?",
        answers: [
            {text: "none", valid: false},
            {text: "absolute", valid: false},
            {text: "static", valid: true}
        ]
    },
    {
        question: "В каком порядке нужно указывать CSS свойства с вендорными префиксами и без?",
        answers: [
            {text: "порядок свойств с префиксами и без неважен", valid: false},
            {text: "свойство без префикса должно идти в самом начале", valid: false},
            {text: "свойство без префикса должно идти в самом конце", valid: true}
        ]
    },
    {
        question: "Как вставить элемент перед указанным дочерним элементом родителя?",
        answers: [
            {text: "appendChild()", valid: false},
            {text: "insertBefore()", valid: true},
            {text: "insertAfter()", valid: false}
        ]
    }
];

//записываем в локалсторедж
localStorage.setItem('LOCAL_TEST_STORE', JSON.stringify(localTest));

var test = localStorage.getItem('LOCAL_TEST_STORE');
test = JSON.parse(test);

//формируем HTML
testWrapper.innerHTML = tmpl(html, {data: test});

//записіваем правильные ответы
function correctAnswers () {
    for (var i = 0; i < test.length; i++) {
        for (var j = 0; j < test[i].answers.length; j++) {
            var answerValid = test[i].answers[j].valid;
            arrCorrectAnswers.push(answerValid);
        };
    };
};
correctAnswers();

var btn = document.getElementById('result-on-click');
var modalWrapper = document.querySelector('.modal-wrapper');
var modalWindow = document.querySelector('.modal-window');
var result = document.querySelector('.result');

//
function getUserAnswers() {
    var input = document.getElementsByClassName('check');

    for (var i = 0; i < input.length; i++){
        var check = input[i].checked;
        if (check) {
            arrUserAnswers.push(true);
        } else {
            arrUserAnswers.push(false);
        }
    }
};

btn.addEventListener('click', function () {
    getUserAnswers();

    var compareResuls = JSON.stringify(arrUserAnswers) === JSON.stringify(arrCorrectAnswers);
    console.log(compareResuls);

    if (compareResuls == true){
        result.innerHTML = 'Молодец, ты ответил(a) на все вопросы правильно!';
    } else {
        result.innerHTML = 'Тест провален =(';
    };

    modalWindow.style.display = 'flex';
    modalWrapper.style.display = 'flex';
    //console.log(compareResuls);
    //console.log('arrCorrectAnswers', arrCorrectAnswers);
    //console.log('arrUserAnswers', arrUserAnswers);
});

var closeX = document.querySelector('.close-btn');
var closeInput = document.querySelector('#modal-close');

function closeModalWindow () {
    modalWindow.style.display = 'none';
    modalWrapper.style.display = 'none';
    arrUserAnswers = [];
    testWrapper.reset();
};

closeX.addEventListener('click', function () {
    closeModalWindow();
});
closeInput.addEventListener('click', function () {
    closeModalWindow();
});
//modalWindow.addEventListener('click', function () {
//    closeModalWindow();
//});
};
