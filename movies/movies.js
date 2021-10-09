const make_p = (num_of_films) => {
    const paragraf = document.createElement('p');
    paragraf.innerText = `Number of movies you haven't seen: ${num_of_films}`;
    paragraf.style.margin = "20px";
    paragraf.style.fontWeight = "bold";
    paragraf.id = "number";
    document.querySelector('.first').appendChild(paragraf);
}

function myFunction() {
    var elem = document.getElementById("semititle");
    var theCSSprop = window.getComputedStyle(elem, "first-letter").getPropertyValue("font-size");
    const paragraf = document.createElement('p');
    paragraf.id = "size";
    paragraf.innerText = "The size of the text above is: ";
    paragraf.innerText += theCSSprop;
    document.querySelector('.first').appendChild(paragraf);
}

const setBg = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.querySelector('.first').style.backgroundColor = "#" + randomColor;
}

const setSize = () => {
    const randomSize = Math.floor(Math.random() * 51);
    document.getElementById('semititle').style.fontSize = `${randomSize}px`;
    var myobj = document.getElementById('size');
    myobj.remove();
    myFunction();
}

function keyfunct1() {
    alert("You pressed a key inside the input field");
}

function logKey(e) {
    type.textContent += ` ${e.code}`;
}

window.onload = () => {

    genNew.addEventListener("click", setBg);
    genDim.addEventListener("click", setSize);
    inputfilm.addEventListener("keydown", keyfunct1);
    document.querySelector('.first').addEventListener('keydown', logKey);
    setBg();
    let num_of_films = document.getElementsByTagName('input').length;
    make_p(num_of_films);
    myFunction();
    const submit = document.getElementById('submit');
    var todel = [];
    submit.onclick = () => {
        let seen = 0;

        for (let i = 0; i < document.getElementsByTagName('input').length; i++) {
            if (document.getElementsByTagName('input')[i].checked && document.getElementsByTagName('input')[i].disabled == false) {
                seen++;
                todel.push(i);
            }
        }

        if (num_of_films == 0) {
            alert("You have seen all the movies, you are a true fan!")
        } else {
            alert(`You have seen ${seen}/${num_of_films} movies.`);
        }
        while (todel.length != 0) {
            document.getElementsByTagName('input')[todel[todel.length - 1]].checked = true;
            document.getElementsByTagName('input')[todel[todel.length - 1]].disabled = true;
            todel.pop();
            num_of_films--;
        }

        var myobj = document.getElementById('number');
        myobj.remove();
        make_p(num_of_films);

    }

}