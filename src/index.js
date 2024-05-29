import css from "./styles.css";
import Control from "./logic.js";
import { format, formatDistanceToNow } from "date-fns";

//window.control = new Control()
class Display{
    constructor(){
        this.logic = new Control()
        this.user = this.logic.user
        this.project_list_objects = this.user.project_list;
        this.project_form = document.querySelector('#project_form');
        this.project_list = document.querySelector('#project_list');
        this.project_button = document.querySelector('#submit_project');

        this.project_title = document.querySelector('#project_title');
        this.task_display = document.querySelector('#task_display');
        this.task_info = document.querySelector('#task_info')
        this.task_button = document.querySelector('#submit_task')

        this.change_button = document.querySelector('#change_task')
        this.submit_change = document.querySelector('#submit_change')
        this.dialog = document.querySelector('dialog')
        this.pop_up = document.querySelector('#pop_up')
    
    
        //this.dialog.close()
        this.pop_up.addEventListener('click', () => {
            this.dialog.show()
        })

        this.submit_change.addEventListener('click', (event) => {
            event.preventDefault()
            console.log(`description: ${description.value}`)
            let selected_task = this.logic.returnselectedTask()
            selected_task.add_description(description.value)

           
            let currentDate = new Date()
            let currentYear = currentDate.getFullYear()

            let formattedDate = format(new Date(currentYear, month.value-1, day.value), 'MMMM/d/yyyy')


            let difference = formatDistanceToNow(
                new Date(currentYear, month.value-1, day.value, hour.value, 0, 0),
                {includeSeconds: true}
            )

            console.log(`time left: ${difference}`)
 

            selected_task.add_dueDate(formattedDate)
            selected_task.add_timeLeft(difference)
            this.logic.printTasksProjects()
            this.dialog.close()
            this.updateScreen()
        })


        this.project_button.addEventListener('click', (event) => {
            event.preventDefault()
            let title = document.querySelector('#title').value
            this.logic.addProject(title)
            this.updateScreen()   
        })

        this.task_display.addEventListener('click', (event) => {
            let number = event.target.dataset.task;
            for (let i = 0; i <= this.project_list_objects.length-1; i++){
                if (this.project_list_objects[i].selected){
                    if(number){
                        this.project_list_objects[i].selectTask(number)
                    }
                }
            }
            this.updateScreen()
        })

        this.task_button.addEventListener('click', (event) => {
            event.preventDefault()
            let task_title = document.querySelector('#task_title').value
            let current_project_id;
            for (let i = 0; i <= this.project_list_objects.length-1; i++){
                if(this.project_list_objects[i].selected){
                    current_project_id = this.project_list_objects[i].return_id()
                }
            }
           // (for select task) let task_id = event.task.dataset.task;
            this.logic.addTask(current_project_id, task_title)
            this.updateScreen()
        })


        this.project_list.addEventListener('click', (event) => {
            let number = event.target.dataset.box
            if (number){
                this.user.selectProject(number);
                this.updateScreen()
            }
        }) 
             
    }


    updateScreen(){
        this.project_list.innerHTML = "";
        // project sidebar
        for (let i = 0; i <= this.project_list_objects.length-1; i++){
            let project_box = document.createElement('div')
            let display_id = this.project_list_objects[i].project_id
            project_box.setAttribute('data-box',display_id)
            if(this.project_list_objects[i].selected){
                    project_box.setAttribute('style', 'background: #AFE1AF')
                }
            let title_display = document.createElement('p')
            title_display.innerHTML = this.project_list_objects[i].returnName()
            project_box.appendChild(title_display)
            this.project_list.appendChild(project_box)
        }

       // task section
       this.project_title.textContent = ""
       this.task_display.textContent = ""
       for (let i = 0; i <= this.project_list_objects.length-1; i++){
            let currentProject = this.user.project_list[i]
            if(currentProject.selected){
            this.project_title.textContent = `Your tasks in ${currentProject.title}`
            let task_list = currentProject.tasks;
            console.log(`tasks in project: ${currentProject.tasks}`)
            for (let j = 0; j <= task_list.length - 1; j++){
                let task_name = document.createElement('p')
                let task_description = document.createElement('p');
                let task_date = document.createElement('p');
                let task_grid = document.createElement('div')
                let task_id = task_list[j].id;
               // console.log(`task id: ${task_id}`)
                task_grid.setAttribute('data-task',task_id)
               // console.log(`currrent task: ${task_list[j]}`)
                task_name.textContent = task_list[j].title;
                task_description.textContent = task_list[j].description;
                task_date.textContent = task_list[j].dueDate;
                if (task_list[j].selected){
                    task_grid.setAttribute('style', 'background: #AFE1AF')
                }
                //console.log(`task title: ${task_list[j].title}`)
                task_grid.appendChild(task_name)
                task_grid.appendChild(task_description)
                task_grid.appendChild(task_date)
                //console.log(`task with paragraph: ${task_grid}`)
                this.task_display.appendChild(task_grid)
            }
        }
       } 
       // selected task display
       let current_task = this.logic.returnselectedTask()
       this.task_info.textContent = ""
       if (current_task){
        let task_name = document.createElement('h1')
        let task_description = document.createElement('h3')
        let task_date = document.createElement('h3')
        let task_left = document.createElement('h3')
        task_name.textContent = current_task.title
        console.log(`current_task: ${current_task}`)
        console.log(`current task title: ${current_task.title}`)
        task_description.textContent = current_task.description
        task_date.textContent = current_task.dueDate;
        task_left.textContent = current_task.time;
        console.log(`time left: ${task_left}`)
        this.task_info.appendChild(task_name)
        this.task_info.appendChild(task_description)
        this.task_info.appendChild(task_date)
        let info = document.createElement('h3')
        info.textContent = "Time left:"
        this.task_info.appendChild(info)
        this.task_info.appendChild(task_left)
        //this.task_info.appendChild(task_description)
       // this.task_info.appendChild(task_date)
       }
       
    }

}

window.display = new Display()
display.updateScreen()

/*
display.user.addProject('second project')
display.user.addProject('third project')
console.log(display.user.project_list)
*/


/*
const main = new Projects;
main.addProject('second project')
main.addProject('third project')
let list = main.project_list
for (let i =0; i <= list.length-1; i++){
    console.log(list[i])
}
/*
let second = main.getProject(1)
console.log(second)
let pro = main.outputProjects()
console.log(pro)
//main.removeProject(2)
//console.log('removed')
console.log(main.outputProjects())
second.addTask('make bed', '15th March')
second.addTask('eat', '15th March')
console.log(second)
let secondProject_secondTask = second.getTask(1)
console.log(secondProject_secondTask)
secondProject_secondTask.add_description('I will eat lasagne')
secondProject_secondTask.mark_complete()
console.log(secondProject_secondTask)
console.log(main)
//let allProjects = main.outputProjects()
//console.log(main.project_list(1))
/*
project.addTask('make bed', '15th March')
project.addTask('eat', '15th March')
firstProject = main.getProject(0)
console.log(firstProject) */