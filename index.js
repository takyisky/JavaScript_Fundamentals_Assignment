const readline = require("readline");

// The interface to handle user input/output
const rl = readline.createInterface({
  input: process.stdin, //take the input
  output: process.stdout,
});

let tasks = []; // Array to hold the tasks

// Function to add a task with 2-second delay
function addTask(description) {
  return new Promise((resolve) => {
    setTimeout(() => {
      tasks.push(description);
      console.log(`Task added: ${description}`); //when the task has been sucessfully added then log this.
      resolve();
    }, 2000);
  });
}

// Function to view all tasks with 1-second delay
function viewTasks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (tasks.length === 0) {
        console.log("No tasks to show"); //If the user asks to view the and there are no tasks log this.
      } else {
        console.log("Tasks:");
        tasks.forEach((task, index) => {
          console.log(`${index + 1}. ${task}`); //If there are tasks to show then log "1. ( The task )"
        });
      }
      resolve();
    }, 1000);
  });
}

async function promptUser() {
  while (true) {
    const action = await new Promise((resolve) => {
      rl.question(
        "Do you want to (a)dd a task, (v)iew tasks, or (q)uit? ",
        resolve
      ); //Ask Question
    });

    if (action.toLowerCase() === "a") {
      const taskDescription = await new Promise((resolve) => {
        rl.question("Enter task description: ", resolve); //If the response is a request for the task.
      });
      await addTask(taskDescription);
    } else if (action.toLowerCase() === "v") {
      await viewTasks(); //If the answer is v run the view task function
    } else if (action.toLowerCase() === "q") {
      console.log("Goodbye!");
      rl.close(); //If the answer is q display good Bly and end task
      break; //force stop
    } else {
      console.log("Invalid action. Please try again."); //If non of the inputs here are given run this
    }
  } //The while true
}

promptUser(); //Main function to be run.
