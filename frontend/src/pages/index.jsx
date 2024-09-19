import Image from "next/image";
import localFont from "next/font/local";
import React, { useCallback, useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import * as Client from "/packages/src/index.ts";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default function Home() {

  const [account, setAccount] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [provider, setProvider] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [toggling, setToggling] = useState(null);
  const [msg, setMsg] = useState("");


const TodoContract = new Client.Client({
  ...Client.networks.testnet,
  rpcUrl: "https://soroban-testnet.stellar.org:443",
});



  useEffect(() => {
    const fetchTodos = async () => {
     
        try {
          
          // Fetch all todos from the contract
          const { result } = await TodoContract.get_tasks({});
          console.log("get contract: ", result);
  
          // Filter out todos with an empty title or empty description
          // const filteredTodos = contractTodos.filter(todo => 
          //   todo.title.trim() !== "" && 
          //   todo.description.trim() !== ""
          // );
  
          // Update state with the filtered todos
          setTodos(result);
        } catch (error) {
          console.error(error);
        }
      }
   
  
    fetchTodos();
  }, []);
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const DeleteTodo = async (index) => {
    try {
      console.log("index: ", index);

      const signer = await getSigner();
      const todoContract = getTodoContractInstance(signer);


      const txn = await todoContract.deleteTodo(index);
      setDeleting(index);
      await txn.wait();
      
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos];
        updatedTodos.splice(index, 1);
        return updatedTodos;
      });
      setDeleting(null);
      
      console.log("txn: ", txn);
      
      
      await txn.wait();
     

      
    } catch (error) {
      console.error(error);
    }
  };

  const UpdateTodo = async (index) => {
    try {
      console.log("index: ", index);
  
      const signer = await getSigner();
      const todoContract = getTodoContractInstance(signer);
  
      setToggling(index);
      // Update the todo status in the contract
      const txn = await todoContract.updateTodoStatus(index);
  
      // Wait for the transaction to be mined
      await txn.wait();
  
      
      const newTodo = await todoContract.showTodo(index);
  
      
      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos];
        updatedTodos[index] = newTodo;
        return updatedTodos;
      });
  
      
      setToggling(null);
  
      // Log the updated todo if needed
      console.log("Updated Todo:", newTodo);
  
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();

    if (title === "" || description === "") {
      alert("All input fields must be filled out");
    } else {
      try {
        console.log("title: ", title);
        console.log("description: ", description);
        const { result } = await TodoContract.add_todo({title, description});
        setMsg(result);
       
        console.log("Result: ", result);
        

        setLoading(true);

        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  
  return (
    <div className="">
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <a className="navbar-brand text-white" href="!#">
          Todo dApp
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto"></ul>

       
        </div>
      </nav>

     
        <>
          <div className="row mt-5">
            <div className="col-md-2"></div>

            <div className="col-md-8">
              <div className="card">
                <div className="card-body">
                  <form action="">
                    <div className="form-group">
                      <label htmlFor="title">Todo Title</label>
                      <input
                        onChange={handleTitleChange}
                        id="title"
                        type="text"
                        placeholder="Todo Title"
                        className="form-control"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="desc">Todo Description</label>
                      <textarea
                        onChange={handleDescriptionChange}
                        id="desc"
                        cols="30"
                        rows="10"
                        className="form-control"
                        placeholder="Todo Description"
                      ></textarea>
                    </div>

                    {loading ? (
                      <p>Loading...</p>
                    ) : (
                      <button
                        onClick={addTodo}
                        className="btn btn-primary btn-lg btn-block"
                      >
                        Add Todo
                      </button>
                    )}
                  </form>
                </div>
              </div>
            </div>

            <div className="col-md-2"></div>
          </div>

          <div className="row mt-5 mb-5">
          <h1>Response: {msg}</h1>

            {todos !== null &&
              todos.length > 0 &&
              todos.map((todo, index) => (
                <div className="col-md-4" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <h4>{todo.title}</h4>
                      <p>{todo.description}</p>
                      {todo.isCompleted === true ? (
                        <span className="badge bg-success">Done</span>
                      ) : (
                        <span className="badge bg-warning">Undone</span>
                      )}
                      <hr />
                      <hr />

                      {deleting === index  ? (
                        <button className="btn btn-secondary" disabled>
                          Deleting
                        </button>
                      ) : (
                        <button
                        onClick={() => DeleteTodo(index)}
                          className="btn btn-secondary"
                        >
                         Delete Todo
                        </button>
                      )}

                     

                      {toggling === index  ? (
                        <button className="btn btn-secondary" disabled>
                          Toggling
                        </button>
                      ) : (
                        <button
                          onClick={() => UpdateTodo(index)}
                          className="btn btn-secondary"
                        >
                         Toggle Status
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      
    </div>
  </div>
  );
}
