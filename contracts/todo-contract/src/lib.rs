#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, vec, Env, Symbol, Vec};

#[contract]
pub struct TodoContract;

#[contractimpl]
impl TodoContract {
    pub fn addTodo(env: Env, to: Symbol) -> Vec<Symbol> {
        
    }

    pub fn getTodo(env: Env, to: Symbol) -> Vec<Symbol> {
        
    }
}

mod test;
