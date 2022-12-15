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
                buton.innerHTML = "✔";
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
        let todos = document.getElementsByClassName("adaugate")[0];

        let taskuri = document.getElementsByClassName("todos");

        for (let i = 0; i < todos.childNodes.length - 2; i++) {
                let comp = taskuri[i].getElementsByClassName("paragrafe")[0].innerHTML;

                if (comp == textNou) {
                        return 1;
                }
        }
        return 0;
}
function removeTask(element) {
        let el = element;
        let text = el.getElementsByClassName("paragrafe")[0].innerHTML;
        console.log(allTasks);
        for (let i = 0; i < contorAll; i++) {
                if (text == allTasks[i].getElementsByClassName("paragrafe")[0].innerHTML) {
                        console.log("aici");
                        for (let j = i; j < contorAll - 1; j++)///stergerea fara functie
                        {
                                allTasks[j] = allTasks[j + 1];
                        }
                        contorAll--;
                }
        }
        console.log(allTasks);
        showAll();
}
function editTask(element) {
        let el = element.getElementsByClassName("paragrafe")[0];
        if (el.getAttribute("contenteditable") == "false")
                el.setAttribute("contenteditable", "true");
        else
                el.setAttribute("contenteditable", "false");
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
        document.getElementsByClassName("adaugate")[0].remove();
        var element = document.createElement("div");
        element.classList.add("adaugate");

        for (let i = 0; i < contorCompleted; i++) {
                element.appendChild(completedTasks[i]);
        }
        let parent = document.getElementsByClassName("container")[0];
        parent.insertBefore(element, parent.children[2]);
}
function showUncompleted() {
        update();
        document.getElementsByClassName("adaugate")[0].remove();
        var element = document.createElement("div");
        element.classList.add("adaugate");

        for (let i = 0; i < contorUncompleted; i++) {
                element.appendChild(unCompletedTasks[i]);
        }
        let parent = document.getElementsByClassName("container")[0];
        parent.insertBefore(element, parent.children[2]);
}
const form = document.getElementById('addTask');
form.addEventListener('submit', addTaskEnter);
