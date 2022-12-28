var allTasks = [];
var contorAll = 0;

var completedTasks = [];
var contorCompleted = 0;

var unCompletedTasks = [];
var contorUncompleted = 0;

function addTask() {
        let textNou = document.querySelector('#numeTaskNou').value;

        if (textNou != "") { //nu am trimis alerta pentru task gol, doar este ignorat
                let taskuri = document.getElementsByClassName("adaugate")[0];

                if (verificareExistenta(textNou) == 1) {
                        alert("Nu poti adauga un task cu aceasi nume")
                        return;
                }

                var element = document.createElement("div");
                element.classList.add("todos");

                let buton = document.createElement("button");
                buton.innerHTML = "🎄✔";
                buton.setAttribute("onclick", "isCompleted(this)");
                buton.classList.add("check");

                let paragrafe = document.createElement("p");
                paragrafe.innerHTML = textNou;
                paragrafe.setAttribute("contenteditable", "false");
                paragrafe.classList.add("paragrafe");

                let butonEdit = document.createElement("button");
                butonEdit.innerHTML = "Edit";
                butonEdit.setAttribute("onclick", "editTask(this.parentElement)");
                butonEdit.classList.add("edit");

                let butonDelete = document.createElement("button");
                butonDelete.innerHTML = "Delete";
                butonDelete.classList.add("delete");
                butonDelete.setAttribute("onclick", "removeTask(this.parentElement)");

                element.appendChild(buton);
                element.appendChild(paragrafe);
                element.appendChild(butonEdit);
                element.appendChild(butonDelete);

                taskuri.appendChild(element);
                allTasks[contorAll] = element;
                contorAll++;
        }
}
function verificareExistenta(textNou) {

        for (let i = 0; i < contorAll; i++) {
                let comp = allTasks[i].getElementsByClassName("paragrafe")[0].innerHTML;

                if (comp == textNou) {
                        return 1;
                }
        }
        return 0;
}


function removeTask(element) {
        let el = element;
        let text = el.getElementsByClassName("paragrafe")[0].innerHTML;
        for (let i = 0; i < contorAll; i++) {
                if (text == allTasks[i].getElementsByClassName("paragrafe")[0].innerHTML) {
                        for (let j = i; j < contorAll - 1; j++)///stergerea fara functie
                        {
                                allTasks[j] = allTasks[j + 1];
                        }
                        contorAll--;
                }
        }
        showAll();
}
function editTask(element) {
        let el = element.getElementsByClassName("paragrafe")[0];
        if (el.getAttribute("contenteditable") == "false") {
                el.setAttribute("contenteditable", "true");
                el.classList.add("editareInCurs");
        }
        else {
                el.setAttribute("contenteditable", "false");
                el.classList.remove("editareInCurs");
        }
}
function isCompleted(element) {
        let el = element;
        if (el.classList.contains("completed"))
                el.classList.remove("completed");
        else
                el.classList.add("completed");
}
function addTaskEnter(event) {
        event.preventDefault();
        addTask();
}
function update() {

        contorCompleted = 0;
        contorUncompleted = 0;

        if (document.getElementsByClassName("mesajStergere")[0] != null)
                document.getElementsByClassName("mesajStergere")[0].remove();

        for (let i = 0; i < contorAll; i++) {

                let comp = allTasks[i].getElementsByClassName("check")[0];

                if (comp.classList.contains("completed")) {
                        completedTasks[contorCompleted] = allTasks[i];
                        contorCompleted++;
                } else {
                        unCompletedTasks[contorUncompleted] = allTasks[i];
                        contorUncompleted++;
                }
        }
}
function showAll() {
        if (document.getElementsByClassName("mesajStergere")[0] != null)
                document.getElementsByClassName("mesajStergere")[0].remove();

        if (document.getElementsByClassName("adaugate")[0] != null)
                document.getElementsByClassName("adaugate")[0].remove();

        var element = document.createElement("div");
        element.classList.add("adaugate");

        for (let i = 0; i < contorAll; i++) {
                element.appendChild(allTasks[i]);
        }
        let parent = document.getElementsByClassName("container")[0];
        parent.insertBefore(element, parent.children[2]);

}
function showCompleted() {
        update();
        if (document.getElementsByClassName("adaugate")[0] != null)
                document.getElementsByClassName("adaugate")[0].remove();
        if (contorCompleted != 0) {
                var element = document.createElement("div");
                element.classList.add("adaugate");

                for (let i = 0; i < contorCompleted; i++) {
                        element.appendChild(completedTasks[i]);
                }
                let parent = document.getElementsByClassName("container")[0];
                parent.insertBefore(element, parent.children[2]);
        }
        else {
                let element = document.createElement("div");
                element.classList.add("mesajStergere");
                let mesaj = document.createElement("p");
                mesaj.classList.add("mesaj");
                mesaj.innerHTML = "Nu ai niciun cadou primit";
                element.appendChild(mesaj);
                let parent = document.getElementsByClassName("container")[0];
                parent.insertBefore(element, parent.children[2]);
        }
}
function showUnCompleted() {
        update();
        if (document.getElementsByClassName("adaugate")[0] != null)
                document.getElementsByClassName("adaugate")[0].remove();
        if (contorUncompleted != 0) {
                var element = document.createElement("div");
                element.classList.add("adaugate");

                for (let i = 0; i < contorUncompleted; i++) {
                        element.appendChild(unCompletedTasks[i]);
                }
                let parent = document.getElementsByClassName("container")[0];
                parent.insertBefore(element, parent.children[2]);
        }
        else {
                let element = document.createElement("div");
                element.classList.add("mesajStergere");
                let mesaj = document.createElement("p");
                mesaj.classList.add("mesaj");
                mesaj.innerHTML = "Nu ai niciun cadou neprimit";
                element.appendChild(mesaj);
                let parent = document.getElementsByClassName("container")[0];
                parent.insertBefore(element, parent.children[2]);
        }
}
///functie imprumutata de pe net si modificata
///am folosit si countdown ul din laborator (scheletul html si css ul)
function calculateChristmasCountdown() {
        var now = new Date();
        var currentMonth = (now.getMonth() + 1);
        var currentDay = now.getDate();
        var nextChristmasYear = now.getFullYear();

        if (currentMonth == 12 && currentDay > 25) {
                nextChristmasYear = nextChristmasYear + 1;
        }

        var nextChristmasDate = nextChristmasYear + '-12-25T00:00:00.000Z';
        var christmasDay = new Date(nextChristmasDate);
        var diffSeconds = Math.floor((christmasDay.getTime() - now.getTime()) / 1000);
        var days = 0;
        var hours = 0;
        var minutes = 0;
        var seconds = 0;

        if (currentMonth != 12 || (currentMonth == 12 && currentDay != 25)) {
                days = Math.floor(diffSeconds / (3600 * 24));
                diffSeconds -= days * 3600 * 24;
                hours = Math.floor(diffSeconds / 3600);
                diffSeconds -= hours * 3600;
                minutes = Math.floor(diffSeconds / 60);
                diffSeconds -= minutes * 60;
                seconds = diffSeconds;
        }
        document.getElementsByClassName('days')[0].innerHTML = days;
        document.getElementsByClassName('hours')[0].innerHTML = hours;
        document.getElementsByClassName('minutes')[0].innerHTML = minutes;
        document.getElementsByClassName('seconds')[0].innerHTML = seconds;
}
function clearCompleted() {
        for (let i = 0; i < contorAll; i++) {
                let comp = allTasks[i].getElementsByClassName("check")[0];
                if (comp.classList.contains("completed")) {
                        for (let j = i; j < contorAll - 1; j++)///stergerea fara functie
                        {
                                allTasks[j] = allTasks[j + 1];
                        }
                        contorAll--;
                }
        }
        showAll();

}
//am folosit ca in laborator setinterval
setInterval(calculateChristmasCountdown, 1000);

const form = document.getElementById('addTask');
form.addEventListener('submit', addTaskEnter);
