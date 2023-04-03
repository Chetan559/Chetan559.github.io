alert("For Better Experience , Open This Site On Laptop/Desktop PC browser!! :)");
document.addEventListener("DOMContentLoaded" , () => {
    
    let dynamicContent = document.querySelector("#dynamic-text");
    console.log(dynamicContent);
    const phrases = ["Student..." , "Developer..." , "Learner..." ];
    let phraseIndex = 0
    let letterInx = 0 ;
    let typingSpeed = 150;
    let erasingSpeed = 100
    function printLetters(phrase){
        if(letterInx === phrase.length){ 
            clearLetters(phrase);
        }
        else if (letterInx <= phrase.length){
                dynamicContent.textContent += phrase.charAt(letterInx);
                letterInx += 1;
                setTimeout(function () {
                    console.log(1)
                    printLetters(phrase);
            } , 200)
        }
    }

    function clearLetters(phrase){
        if (letterInx == -1){
            phraseIndex = (phraseIndex + 1) % phrases.length;
            letterInx=0;
            printLetters(phrases[phraseIndex]);
        }
        // else if (letterInx > -1) {
        //     dynamicContent.textContent = dynamicContent.textContent.substring(0 ,dynamicContent.textContent.length - 1);
        //     console.log(dynamicContent.textContent)
        //     letterInx -= 1;
        //     setTimeout(function () {
        //         clearLetters(phrase);
        //     } , 100)
        // }
    }
})