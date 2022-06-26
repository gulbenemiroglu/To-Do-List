const inputBar = document.querySelector("#task");
const successToast = document.querySelector(".success");
const errorToast = document.querySelector(".error");
const tasks = localStorage.getItem("tasks")
  ? JSON.parse(localStorage.getItem("tasks"))
  : [];
localStorage.setItem("tasks", JSON.stringify(tasks));
let idNumber = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0;

for (let i = 0; i < tasks.length; i++) {
  const link = document.createElement("a");
  link.href = "#";
  link.classList.add("delete-item");
  link.innerHTML = '<i class="fa fa-remove close"></i>';
  const liDom = document.createElement("li");
  liDom.appendChild(document.createTextNode(tasks[i].value));
  liDom.appendChild(link);
  liDom.setAttribute("id", tasks[i].id.toString());
  document.querySelector("#list").append(liDom);
  if (tasks[i].checked) liDom.classList.add("checked");
}

function showToast(boolean) {
  let toast = errorToast;
  if (boolean) toast = successToast;
  toast.classList.remove("hide");
  toast.classList.add("show");
  toast.onclick = (e) => {
    if (!e.target.classList.contains("toast-body")) {
      toast.classList.remove("show");
      toast.classList.add("hide");
    }
  };
}

function check(value) {
  if (value.trim() == "") return false;
  return true;
}

function newElement() {
  if (!check(inputBar.value)) {
    showToast(false);
    return;
  }
  const link = document.createElement("a");
  link.href = "#";
  link.classList.add("delete-item");
  link.innerHTML = '<i class="fa fa-remove close"></i>';
  const liDom = document.createElement("li");
  liDom.appendChild(document.createTextNode(inputBar.value));
  liDom.appendChild(link);
  liDom.setAttribute("id", idNumber.toString());
  document.querySelector("#list").append(liDom);
  showToast(true);
  tasks.push({ value: inputBar.value, checked: false, id: idNumber });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  idNumber += 1;
  inputBar.value = "";
}

const ul = document.querySelector("#list");

ul.onclick = (e) => {
  let flag = false;
  let id = e.target.id;
  if (e.target.classList.contains("fa-remove")) {
    e.target.parentElement.parentElement.remove();
    id = e.target.parentElement.parentElement.id;
    flag = true;
  }
  for (let i = 0; i < tasks.length; i++) {
    if (id == tasks[i].id) {
      var index = i;
      break;
    }
  }
  if (flag) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return;
  }
  if (e.target.classList.contains("checked")) {
    e.target.classList.remove("checked");
    tasks[index].checked = false;
  } else {
    e.target.classList.add("checked");
    tasks[index].checked = true;
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
