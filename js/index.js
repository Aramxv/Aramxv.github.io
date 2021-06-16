
const typingDiv = document.getElementById("typingDiv");

const randomText = 'Teachers can be frustrated';

/* 
* For every character wrap it in a span that has a class of a word,
* And as you go through your words by typing
* Move the cursor and change the color. 
*/

/* Split out the characters and wrap each character in a span */

const characters = randomText.split("").map((char) => {
    const span = document.createElement("span");
    span.innerText = char;
    typingDiv.appendChild(span);
    return span;
});

let cursorIndex = 0;
let cursorCharacter = characters[cursorIndex];
cursorCharacter.classList.add("cursor");

let startTime = null;
let endTime = null;

/* Keep track of the user character typing, used an event listener - keydown */
/* Check if the character typed by the user, matches the character in random Text that wraps in a span */

const keylistener = document.addEventListener("keydown", ({ key }) => {
    if (!startTime) {
        startTime = new Date();
    }
    if (key === cursorCharacter.innerText) {
        // Typed the correct key
        cursorCharacter.classList.remove("cursor");
        cursorCharacter.classList.add("done");
        cursorCharacter = characters[++cursorIndex];
        
    }
    if (cursorIndex >= characters.length) {
        /* Display the Words per minute, C per minute */
        endTime = new Date();
        const delta = endTime - startTime; 
        const seconds = delta / 1000; 
        // const minutes = delta / 60; 
        const numberOfWords = randomText.split(" ").length;
        const wps = numberOfWords / seconds; 
        const wpm = wps * 60.0;
        document.getElementById('stats').innerText = `wpm = ${wpm}`;
        document.removeEventListener('keydown', keylistener);
        return;
     
    }
    cursorCharacter.classList.add("cursor");
});