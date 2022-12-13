function addTask() {
        let textNou = document.querySelector('#numeTaskNou').value;

        if (textNou != "") {
                let taskuri = document.getElementsByClassName("adaugate")[0];

                if (verificareExistenta(textNou) == 1) {
                        alert("Nu poti adauga un task cu aceasi nume")
                        return;
                }

                var element = document.createElement("div");
                element.classList.add("todos");

                let buton = document.createElement("button");
                buton.innerHTML = "✔";
                buton.classList.add("check");

                let paragrafe = document.createElement("p");
                paragrafe.innerHTML = textNou;
                paragrafe.classList.add("paragrafe");

                let butonEdit = document.createElement("button");
                butonEdit.innerHTML = "Edit";
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
        el.remove();
}
function addTaskEnter(event) {
        event.preventDefault();
        addTask();
}
const form = document.getElementById('addTask');
form.addEventListener('submit', addTaskEnter);