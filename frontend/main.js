import Student from "./student.js"

const SERVER_URL = 'http://localhost:3000'

async function serverAddStudent(obj) {
  let response = await fetch(SERVER_URL + '/api/students', {
    method: "POST",
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(obj),
  })

  let data = await response.json()

  return data
}

async function fetchStudentsList() {
  let response = await fetch(SERVER_URL + '/api/students');
  let data = await response.json();
  return data;
}

console.log(await fetchStudentsList());
const studentsList = [
  // new Student('Андрей', 'Антипов', 'Алексеевич', new Date(2001, 3, 21), 2019, 'ФМО'),
  // new Student('Александр', 'Андропов', 'Сергеевич', new Date(1999, 2, 12), 2018, 'ФМП'),
  // new Student('Иван', 'Челнов', 'Антонович', new Date(1997, 1, 14), 2014, 'ФМИ'),
  // new Student('Сергей', 'Самайлов', 'Игоревич', new Date(1992, 9, 28), 2019, 'ФММП'),
  // new Student('Иван', 'Сатурн', 'Владимирович', new Date(2003, 12, 25), 2022, 'ФИТР')
]

async function init() {
  studentsList = await fetchStudentsList()
  renderStudentsTable()
}

init()

const $studentsList = document.getElementById('students-list'),
  $studentsListTHAll = document.querySelectorAll('.studentsTable th')

let column = 'fio',
  columnDir = true

function newStudentTR(student) {
  const $studentTR = document.createElement('tr'),
    $fioTD = document.createElement('td'),
    $birthdayTD = document.createElement('td'),
    $studyStartTD = document.createElement('td'),
    $facultyTD = document.createElement('td')

  $fioTD.textContent = student.fio
  $birthdayTD.textContent = student.getbirthday() + ' (' + student.getAge() + ' лет)'
  $studyStartTD.textContent = student.studyStart + ' (' + student.getTime() + ' курса)'
  if (student.getTime() > 4) $studyStartTD.textContent = 'закончил'
  $facultyTD.textContent = student.faculty

  $studentTR.append($fioTD)
  $studentTR.append($birthdayTD)
  $studentTR.append($studyStartTD)
  $studentTR.append($facultyTD)

  return $studentTR;
}

function renderStudentsTable() {
  let studentsCopy = [...studentsList]

  studentsCopy = getSortStudents(column, columnDir)

  $studentsList.innerHTML = ''

  for (const student of studentsCopy) {
    $studentsList.append(newStudentTR(student))
  }
}

function getSortStudents(prop, dir) {
  const studentsCopy = [...studentsList]
  return studentsCopy.sort(function (studentA, studentB) {
    if ((!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]))
      return -1;
  })
}

$studentsListTHAll.forEach(element => {
  element.addEventListener('click', function () {
    column = this.dataset.column;
    columnDir = !columnDir
    renderStudentsTable()
  })
})
document.getElementById('add-student').addEventListener('submit', async function (e) {
  e.preventDefault();

  studentsList.push(new Student(
    document.getElementById('input-name').value,
    document.getElementById('input-surname').value,
    document.getElementById('input-lastname').value,
    new Date(document.getElementById('input-birthday').value),
    Number(document.getElementById('input-studyStart').value),
    document.getElementById('input-faculty').value,
  ))

  const newStudent = new Student(
    document.getElementById('input-name').value,
    document.getElementById('input-surname').value,
    document.getElementById('input-lastname').value,
    new Date(document.getElementById('input-birthday').value),
    Number(document.getElementById('input-studyStart').value),
    document.getElementById('input-faculty').value,
  );

  const response = await serverAddStudent(newStudent);
  renderStudentsTable()

})

renderStudentsTable()

