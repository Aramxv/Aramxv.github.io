
const typingDivision = document.getElementById("typingDivision");
const statsDivision = document.getElementById("statsDivision");
const startGameButton = document.getElementById("start-game");

const randomArrText = [
    'Pass substantial servant rude', // obtainable whirl strong ready word blade analyze communicate',
    'Sun cute belief book somber', //examine level pan eggnog delicate whirl stereotyped',
    'Ambitious jaded cowardly obese' // whole aloof greedy tame quick disagreeable glistening seemly'
];

const startGame = () => {
    startGameButton.classList.add('hidden');
    typingDivision.innerHTML = "";
    statsDivision.innerHTML = "";

    const randomText = randomArrText[parseInt(Math.random() * randomArrText.length)];
    /* 
    * For every character wrap it in a span that has a class of a word,
    * And as you go through your words by typing
    * Move the cursor and change the color. 
    */

    /* Split out the characters and wrap each character in a span */

    const characters = randomText.split("").map((char) => {
        const span = document.createElement("span");
        span.innerText = char;
        typingDivision.appendChild(span);
        return span;
    });

    let cursorIndex = 0;
    let cursorCharacter = characters[cursorIndex];
    cursorCharacter.classList.add("cursor");

    let startTime = null;

    /* Keep track of the user character typing, used an event listener - keypress */
    /* Used keypress instead of keydown for counting errors */
    /* Check if the character typed by the user, matches the character in random Text that wraps in a span */

    const keylistener = document.addEventListener("keypress", ({ key }) => {
        if (!startTime) {
            startTime = new Date();
        }
        if (key === cursorCharacter.innerText) {
            // Typed the correct key
            cursorCharacter.classList.remove("cursor");
            cursorCharacter.classList.add("done");
            cursorCharacter = characters[++cursorIndex];        
        }

        console.log(keylistener);
        if (cursorIndex >= characters.length) {
            /* End game - Display the Words per minute, C per minute */
            const endTime = new Date();
            const delta = endTime - startTime; 
            const seconds = delta / 1000; 
            // const minutes = delta / 60; 
            // const numberOfWords = randomText.split(" ").length;
            const wps = cursorIndex / seconds; 
            const wpm = parseInt(wps * 60.0 / 5.0);
            document.getElementById('statsDivision').innerText = `Words Per Min = ${wpm}`;
            document.removeEventListener('keypress', keylistener);
            startGameButton.classList.remove("hidden");
            return;
        
        }
        cursorCharacter.classList.add("cursor");
    });
};