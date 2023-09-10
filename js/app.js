/*  
====================================================================
    Набор данных для отправки на сервер
====================================================================
*/ 
    
let data = {
    channel: 0, // номер контура/тренажера (целое число от 1 до 21)
    stateIn: 0, // присутствие в зоне тренажера (1 или 0)
    stateOn: 0, // активность тренажера (1 или 0)
    value: 0    // значение сенсора (скорость, количество и т.д.)
};


/*  
====================================================================
    Адрес веб-сокет сервера + порт + путь
====================================================================
*/ 

const serverAddress = 'ws://localhost:8025/device';
const serverConnection = new WebSocket(serverAddress);

// Сообщение об успещном подключении
serverConnection.onopen = function () {
    console.log("connected");
}



/*  
====================================================================
    Обновляем данные для отправки сообщения на сервер 
====================================================================
*/ 

function updateData() {

    data.channel = 1;
    data.stateIn = chin;
    data.stateOn = chon;
    data.value = sval;

    console.log(data); 
    sendData();
}

// Отправка данных на Веб-сокет сервер в формате строчных данных String 
function sendData() {
    let str = JSON.stringify(data);
    serverConnection.send(str);
}








/*  
====================================================================
    Элементы интерфейса для имитации данных тренажера
====================================================================
*/ 

let slider, checkboxIN, checkboxON;

// Локальные переменные для элементов UI
let chnum = 0;
let chin = 0;
let chon = 0
let sval = 0;


// Инициализация интерфейса
function setup() {
    createCanvas(400, 400);

    // определяем находится ли пользователь в зоне тренажера
    checkboxIN = createCheckbox('IN/OUT', false);
    checkboxIN.position(10, 10);
    checkboxIN.changed(f_chIn);

    // определяем занимается ли пользователь на тренажере
    checkboxON = createCheckbox('ON/OFF', false);
    checkboxON.position(10, 40);
    checkboxON.changed(f_chOn);

    // определяем значение сенсора тренажера (скорость, количество и т.д.)
    slider = createSlider(0, 255, 100);
    slider.position(10, 80);
    slider.style('width', '180px');
    slider.changed(f_sVal);
}

//  Основной цикл программы
function draw() {
    background(151);
    textSize(32);
    text(data.value, 10, height - 40);
}

//  Обработка событий интерфейса
function f_chIn() {
    if (checkboxIN.checked()) chin = 1;
    else chin = 0;
    updateData();
}

function f_chOn() {
    if (checkboxON.checked()) chon = 1;
    else chon = 0;
    updateData();
}

function f_sVal() {
    sval = slider.value();
    updateData();
}


