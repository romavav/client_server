export default class Student {
  constructor(name, surname, lastname, birthday, studyStart, faculty) {
    this.name = name
    this.surname = surname
    this.lastname = lastname
    this.birthday = birthday
    this.studyStart = studyStart
    this.faculty = faculty
  }

  get fio() {
    return this.surname + ' ' + this.name + ' ' + this.lastname
  }

  getTime() {
    const currentTime = new Date()
    return currentTime.getFullYear() - this.studyStart

  }

  getbirthday() {
    const yyyy = this.birthday.getFullYear();
    let mm = this.birthday.getMonth() + 1;
    let dd = this.birthday.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '.' + mm + '.' + yyyy;
  }

  getAge() {
    const today = new Date();
    let age = today.getFullYear() - this.birthday.getFullYear();
    let m = today.getMonth() - this.birthday.getMonth();
    if (m > 0 || (m === 0 && today.getDate() < this.birthday.getDate())) {
      age--;
    }
    return age;
  }

}
