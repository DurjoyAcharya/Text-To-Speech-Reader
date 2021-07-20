const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readbtn = document.getElementById('read');
const togglebtn = document.getElementById('toggle');
const closebtn = document.getElementById('close');

const data = [
    {
        image: './img/drink.JPG',
        text: "I'm Thirsty"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/hungry.JPG',
        text: "I'm Hungry"
    },
    {
        image: './img/sad.JPG',
        text: "I'm Sad"
    },
    {
        image: './img/sleep.JPG',
        text: "I'm going to Sleep"
    },
    {
        image: './img/father.jpg',
        text: "My father is good"
    },
    {
        image: './img/mother.jpg',
        text: "I love my mother"
    },
    {
        image: './img/angry.jpg',
        text: "I'm in anger"
    }
];

data.forEach(createBox);
function createBox(item) {
    const box = document.createElement('div');

    const { image, text } = item;

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}"/>
        <p class="info">${text}</p>
    `;

    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // Add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });
    main.appendChild(box);
}
/**const box2 = document.createElement('div');
box2.classList.add('box2');
box2.innerHTML = `<p class = info2>दिल को चीरती हुई हर रात आई💔
तेरी जुदाई के बाद जब जब भि बरसात आई☔️</p>
<p class = info3 >बिखरे हुए कले घने लबे बल तेरे आंखें बहुत सुन्दर है गुलबी होटं मुसकुरत हुए  चेहरे बहुत स्मडॅ लगती हो जनु तुम बहुत अति खुबसूरत हो मोती जैसे चमक रहा तेरे दंत</p>
`;
**/
//main.appendChild(box2);
//Toggle text box


const message = new SpeechSynthesisUtterance();

let voices = [];

function getVoices() {
    //let voices = [];

    voices = speechSynthesis.getVoices();
    // var voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang};`
        voicesSelect.appendChild(option);
    });
}
// Set text
function setTextMessage(text) {
    message.text = text;
}
// Speak text
function speakText() {
    speechSynthesis.speak(message);
}
// Set voice
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);

}
speechSynthesis.addEventListener('voiceschanged', getVoices)

togglebtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.toggle('show')
);
closebtn.addEventListener('click', () =>
    document.getElementById('text-box').classList.remove('show')
);
// Change voice
voicesSelect.addEventListener('change', setVoice);
readbtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});
getVoices();
