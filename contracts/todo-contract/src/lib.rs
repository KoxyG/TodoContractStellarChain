#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, log, symbol_short, Env, Symbol, Vec};

const TASKS: Symbol = symbol_short!("TASKS");

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Task {
    title: Symbol,
    description: Symbol,
    completed: bool,
}



#[contract]
pub struct TodoContract;

#[contractimpl]
impl TodoContract {
    //add a task
    pub fn add_todo(env: Env, title: Symbol, description: Symbol) -> u32 {
        //create an instance
        let mut tasks = env.storage().instance().get(&TASKS).unwrap_or_else(|| {
            log!(&env, "Initializing new task list");
            Vec::new(&env)
        });

        //create a new task
        let new_task = Task {
            title,
            description,
            completed: false,
        };
        // add new element to the back of the vector
        tasks.push_back(new_task);

        let task_count = tasks.len();
        log!(&env, "Added task. Total tasks: {}", task_count);

        // set task
        env.storage().instance().set(&TASKS, &tasks);

        // extend storage lifetime by 100 ledgers,
        env.storage().instance().extend_ttl(100, 100);
        
        
        task_count as u32
    }

    // complete a task
    pub fn complete_task(env: Env, index: u32) -> bool {
        let mut tasks: Vec<Task> = env.storage().instance().get(&TASKS).unwrap_or_else(|| {
            log!(&env, "No tasks found");
            Vec::new(&env)
        }); 


        if let Some(task) = tasks.get(index) {
            let mut updated_task = task.clone();
            updated_task.completed = true;
            tasks.set(index, updated_task);
            log!(&env, "Completed task at index: {}", index);
            env.storage().instance().set(&TASKS, &tasks);

            // extend storage lifetime by 100 ledgers,
            env.storage().instance().extend_ttl(100, 100);
            true
        } else {
            log!(&env, "Failed to complete task. Invalid index: {}", index);
            false
        }


    }


    // get all tasks
    pub fn get_tasks(env: &Env) -> Vec<Task> {
        env.storage().instance().get(&TASKS).unwrap_or_else(|| {
          log!(env, "No tasks found, returning empty list");
          Vec::new(env)  
        })
    }

    // get a task
    pub fn get_task(env: Env, index: u32) -> Option<Task> {
        let tasks: Vec<Task> = env.storage().instance().get(&TASKS).unwrap_or_else(|| {
            log!(&env, "No tasks found");
            Vec::new(&env)
        });
        if let Some(task) = tasks.get(index) {
            log!(&env, "Retrieved task at index: {}", index);
            Some(task.clone())
        } else {
            log!(&env, "No task found at index: {}", index);
            None
        }
    }
}

mod test;
