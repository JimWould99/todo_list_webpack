class Task{
    constructor(title, id){
        this.title = title;
        this.dueDate;
        this.time;
        this.id = id;
        this.description;
        this.selected = false;
        this.priority = false;
        this.complete = false;
    }

    select(){
        this.selected = true;
    }
 
    unSelect(){
        this.selected = false;
    }

    choose_priority(){
        if(!this.priority){
            console.log('made true')
            this.priority = true;
        } else {
            console.log('made false')
            this.priority = false;
        }
    }

    add_description(description){
        this.description = description;
    }

    add_dueDate(date){
        this.dueDate = date;
    }

    add_timeLeft(time){
        this.time = time
    }

    mark_complete(){
        this.complete = true;
    }


}

export default Task;