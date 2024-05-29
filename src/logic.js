import Project from "./projects.js";

class Projects {
  constructor() {
    this.default_project = new Project("Default", 0);
    this.default_project.select();
    this.project_list = [this.default_project];
    this.id = 1;
  }
  addProject(title) {
    let project = new Project(title, this.id);
    this.project_list.push(project);
    this.selectProject(this.id);
    this.id += 1;
  }
  removeProject(id) {
    for (let i = 0; i <= this.project_list.length - 1; i++) {
      console.log(`test: ${this.project_list[i].project_id}`);
      if (this.project_list[i].project_id == id) {
        console.log("removing");
        this.project_list.splice(i, 1);
      }
    }
  }
  outputProjects() {
    for (let i = 0; i <= this.project_list.length - 1; i++) {
      console.log(this.project_list[i]);
    }
  }
  getProject(id) {
    for (let i = 0; i <= this.project_list.length; i++) {
      if (this.project_list[i].project_id == id) {
        return this.project_list[i];
      }
    }
  }

  selectProject(id) {
    for (let i = 0; i <= this.project_list.length - 1; i++) {
      if (this.project_list[i].project_id == id) {
        console.log(`selected: ${this.project_list[i].title}`);
        this.project_list[i].select();
      } else {
        this.project_list[i].unSelect();
      }
    }
  }
}

class Control {
  constructor() {
    this.user = new Projects();
  }

  printTasksProjects() {
    let list = this.user.project_list;
    for (let i = 0; i <= list.length - 1; i++) {
      let current_project = list[i];
      console.log(`project: ${current_project.title}`);
      console.log(`project id: ${current_project.project_id}`);
      if (current_project.selected) {
        console.log("selected");
      }
      let task_list = current_project.tasks;
      for (let j = 0; j <= task_list.length - 1; j++) {
        console.log(`    Task: ${task_list[j].title}, id: ${task_list[j].id}`);
        console.log(`     selected- ${task_list[j].selected}`);
        console.log(`     priority- ${task_list[j].priority}`);
        console.log(`     description- ${task_list[j].description}`);
        console.log(`     date- ${task_list[j].date}`);
      }
    }
  }

  returnselectedTask() {
    let list = this.user.project_list;
    for (let i = 0; i <= list.length - 1; i++) {
      let current_project = list[i];
      if (current_project.selected) {
        console.log("selected");
        let task_list = current_project.tasks;
        for (let j = 0; j <= task_list.length - 1; j++) {
          if (task_list[j].selected) {
            return task_list[j];
          }
        }
      }
    }
  }

  addProject(project_name) {
    this.user.addProject(project_name);
  }
  addTask(pro_id, task_name) {
    let list = this.user.project_list;
    for (let i = 0; i <= list.length - 1; i++) {
      if (list[i].project_id == pro_id) {
        list[i].addTask(task_name);
      }
    }
  }
  selectProject(pro_id) {
    this.user.selectProject(pro_id);
  }
  selectTask(pro_id, t_id) {
    let project = this.user.getProject(pro_id);
    if (project.selected) {
      project.selectTask(t_id);
    }
  }
  deleteProject(pro_id) {
    this.user.removeProject(pro_id);
  }
  deleteTask(pro_id, tas_id) {
    let project = this.user.getProject(pro_id);
    project.removeTask(tas_id);
  }
  taskPriority(pro_id, tas_id) {
    let project = this.user.getProject(pro_id);
    let task = project.getTask(tas_id);
    console.log(`task chosen: ${task.title}`);
    task.choose_priority();
  }
  taskComplete(pro_id, tas_id) {
    let project = this.user.getProject(pro_id);
    let task = project.getTask(tas_id);
    task.mark_complete();
  }
}
export default Control;
