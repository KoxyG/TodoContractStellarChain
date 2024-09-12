#![cfg(test)]

use super::*;
use soroban_sdk::{symbol_short, Env};

#[test]
fn test_add_and_get_task() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TodoContract);
    let client = TodoContractClient::new(&env, &contract_id);

    client.add_todo(
        &symbol_short!("Shopping"),
        &String::from_str(&env, "Buy milk and eggs"),
    );
    client.add_todo(
        &symbol_short!("Work"),
        &String::from_str(&env, "Finish the quarterly report"),
    );

    let task = client.get_task(&0).unwrap();
    assert_eq!(task.title, symbol_short!("Shopping"));
    assert_eq!(
        task.description,
        String::from_str(&env, "Buy milk and eggs")
    );
    assert_eq!(task.completed, false);

    let task2 = client.get_task(&1).unwrap();
    assert_eq!(task2.title, symbol_short!("Work"));
    assert_eq!(
        task2.description,
        String::from_str(&env, "Finish the quarterly report")
    );
    assert_eq!(task2.completed, false);

    assert!(client.get_task(&2).is_none());
}

#[test]
fn test_complete_task() {
    let env = Env::default();
    let contract_id = env.register_contract(None, TodoContract);
    let client = TodoContractClient::new(&env, &contract_id);

    client.add_todo(
        &symbol_short!("Shopping"),
        &String::from_str(&env, "Buy milk"),
    );
    let success = client.complete_task(&0);
    assert!(success);
    let task = client.get_task(&0).unwrap();
    assert!(task.completed);
}
