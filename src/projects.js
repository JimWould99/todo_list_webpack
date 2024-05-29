import Task from "./tasks.js";

class Project {
  constructor(title, project_id) {
    this.title = title;
    this.selected;
    this.tasks = [];
    this.project_id = project_id;
    this.task_id = 0;
  }
  select() {
    this.selected = true;
  }

  unSelect() {
    this.selected = false;
  }

  selectTask(t_id) {
    for (let i = 0; i <= this.tasks.length - 1; i++) {
      if (this.tasks[i].id == t_id) {
        this.tasks[i].select();
      } else {
        this.tasks[i].unSelect();
      }
    }
  }

  addTask(title) {
    let task = new Task(title, this.task_id);
    this.tasks.push(task);
    this.selectTask(this.task_id);

    this.task_id += 1;
  }

  removeTask(task_id) {
    for (let i = 0; i <= this.tasks.length - 1; i++) {
      if (this.tasks[i].id == task_id) {
        this.tasks.splice(i, 1);
      }
    }
  }

  getTask(id) {
    for (let i = 0; i <= this.tasks.length - 1; i++) {
      if (this.tasks[i].id == id) {
        return this.tasks[i];
      }
    }
  }

  return_id() {
    return this.project_id;
  }

  returnName() {
    return this.title;
  }
}

export default Project;
