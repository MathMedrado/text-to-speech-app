const main = document.querySelector('main');
const buttonInsertText = document.querySelector('.btn-toggle');
const textAreaContainer = document.querySelector('.text-box');
const textAreaClose = document.querySelector('.close');
const selectDom = document.querySelector('select');
const buttonReadText = document.querySelector("#read");
const textArea = document.querySelector('textarea');


const humanExpresions = [
{ img: "./img/drink.jpg" , text: "Estou com sede"},
{ img: "./img/angry.jpg" , text: "Estou com raiva"},
{ img: "./img/food.jpg" , text: "Estou com fome"},
{ img: "./img/grandma.jpg" , text: "Quero ver a vovó"},
{ img: "./img/happy.jpg" , text: "Estou feliz"},
{ img: "./img/home.jpg" , text: "Quero ir para casa"},
{ img: "./img/hurt.jpg" , text: "Estou machucado"},
{ img: "./img/outside.jpg" , text: "Quero ir lá fora"},
{ img: "./img/sad.jpg" , text: "Estou triste"},
{ img: "./img/school.jpg" , text: "Quero ir para a escola"},
{ img: "./img/tired.jpg" , text: "Estou cansado"},
{ img: "./img/scared.jpg" , text: "Estou assustado"}
]

const utterance = new SpeechSynthesisUtterance();

const setTextMenssage = text =>{
    utterance.text = text;
}

const speakText = () => {
    speechSynthesis.speak(utterance);
}

const setvoice = event => {
    let clickedVoice = voices.find(voice => voice.name === event.target.value);
    utterance.voice =  clickedVoice;
}


const createExpresionBox = ({ img, text }) => {
    const div = document.createElement('div');
    div.classList.add('expression-box');
    div.innerHTML = ` 
        <img src="${ img }" alt="${ text }">
        <p class="info"> ${ text } </p>
    `;
    div.addEventListener('click', () =>{
        setTextMenssage(text);
        speakText();
        div.classList.add('active');
        setTimeout(() => div.classList.remove('active'), 1000);
    })

    main.appendChild(div);
}

humanExpresions.forEach(createExpresionBox);
let voices = [];

speechSynthesis.addEventListener('voiceschanged', () => {
    voices = speechSynthesis.getVoices();
    // let i;
    // for( i = 0; i < voices.length; i++){
    //     selectDom.innerHTML += ` <option> ${voices[i].name}</option>`;
    // }
    voices.forEach( ({ name, lang }) => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = `${name} || ${lang}`;
        selectDom.appendChild(option);

    })

})

buttonInsertText.addEventListener('click', () => {
    textAreaContainer.classList.add('show');
})

textAreaClose.addEventListener('click', () => {
    textAreaContainer.classList.remove('show');
})

selectDom.addEventListener('change', setvoice);

buttonReadText.addEventListener('click', () => {
    setTextMenssage(textArea.value);
    speakText();
})



