import React, { useEffect, useState } from 'react'
import Swal from "sweetalert2";

export default function Todo() {

    const [todo, setTodo] = useState({
        id: 0,
        name: "",
        type: "Important",
        isEdit: false
    })
    const [filter, setFilter] = useState({
        search: "",
        typeFilter: ""
    })

    const [todos, setTodos] = useState([])

    useEffect(() => {
        async function logMovies() {
            const listTodo = await fetch("https://6582744002f747c8367964f7.mockapi.io/todo");
            const todos = await listTodo.json();
            setTodos(todos)
        }
        logMovies();
    }, [])

    const handleChange = (evt) => {
        const infor = evt.target.name;
        if (infor === "name") {
            setTodo({
                ...todo,
                name: evt.target.value
            })
        } else {
            setTodo({
                ...todo,
                type: evt.target.value
            })
        }
    }

    const incresID = (array) => {
        let currentId = 0;
        for (let i = 0; i < array.length; i++) {
            if (currentId < array[i].id) {
                currentId = parseInt(array[i].id);
            }
        }
        return currentId;
    }

    const handleAddAndEdit = async (evt) => {
        if (todo.isEdit) {
            const obj = {
                name: todo.name,
                type: todo.type
            };
            await fetch('https://6582744002f747c8367964f7.mockapi.io/todo/' + todo.id, {
                method: "PUT",
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            resver();
        }
        else {
            let addTodoApi = async () => {
                const todoApi = {
                    id: incresID(todos) + 1,
                    name: todo.name,
                    type: todo.type
                }
                await fetch("https://6582744002f747c8367964f7.mockapi.io/todo", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type if sending JSON data
                    },
                    body: JSON.stringify(todoApi),
                }).then(async () => {
                    let resTodos = await fetch("https://6582744002f747c8367964f7.mockapi.io/todo");
                    const dataTodo = await resTodos.json();
                    setTodos(dataTodo);
                    resetTodo();
                });

            }
            addTodoApi();
        }

    }
    const resver = async () => {
        let resTodos = await fetch("https://6582744002f747c8367964f7.mockapi.io/todo");
        const dataTodo = await resTodos.json();
        setTodos(dataTodo);
        resetTodo();
    }

    const handleUpdate = (id) => {
        const todo = todos.find(td => td.id === id)
        setTodo({ ...todo, isEdit: true })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await fetch('https://6582744002f747c8367964f7.mockapi.io/todo/' + id, {
                    method: "DELETE"
                })
                resver();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });

    }

    const resetTodo = () => {
        setTodo({
            id: 0,
            name: "",
            type: "Important",
            isEdit: false
        })
    }
    const handleFilter = (evt) => {
        const btn = evt.target.name;
        if (btn === 'search') {
            setFilter({
                ...filter,
                search: evt.target.value
            })
        } else {
            setFilter({
                ...filter,
                typeFilter: evt.target.value
            })
        }
    }

    const filterTodos = async () => {
        let resTodos = await fetch("https://6582744002f747c8367964f7.mockapi.io/todo");
        const dataTodo = await resTodos.json();
        const filteredTodos = dataTodo.filter((todo) => {
            const isNameMatch = filter.search ? todo.name.includes(filter.search) : true;
            const isTypeMatch = filter.typeFilter ? todo.type === filter.typeFilter : true;
            return isNameMatch && isTypeMatch;
        });
        setTodos(filteredTodos);
    }

    return (
        <div className='container' style={{ width: "450px" }}>
            <div className='form-control row my-1 mx-1'>
                <div className='justify-content-center'>
                    <h2>Todo</h2>
                </div>
                <div className='col-12 mb-3'>
                    <label className='mb-3'>Name : </label>
                    <input type="text" name="name" className='form-control' value={todo.name} onChange={handleChange} />
                </div>
                <div className='col-12 mb-3'>
                    <label className='mb-3'>Gender : </label>
                    <select name='type' className='form-control m-with-8' value={todo.type} onChange={handleChange}>
                        <option>Important</option>
                        <option>Normal</option>
                    </select>
                </div>
                <div className='col-12'>
                    <button type="submit" name="name" className='btn btn-success btn-sm me-2' onClick={handleAddAndEdit}>{todo.isEdit ? "Update" : "Add todo"}</button>
                    {todo.isEdit && <button className='btn btn-dark btn-sm' onClick={resetTodo} >Cancel</button>}
                </div>
            </div>
            <div className='form-control row my-1 mx-1'>
                <div className='col-12 mb-3'>
                    <label>Search : </label>
                    <input type="text" name="search" className='form-control mb-1' value={filter.search} onChange={handleFilter} />
                    <label>Filter: </label>
                    <select className='col-4 form-select form-select-sm me-1 btn-sm mb-1' onChange={handleFilter} value={filter.type} name='typeFilter'>
                        <option value={''}>All</option>
                        <option>Important</option>
                        <option>Normal</option>
                    </select>
                    <button className='btn btn-primary btn-sm' onClick={filterTodos}>Search</button>
                </div>
            </div>
            <div className='form-control row my-5 mx-1'>
                <table className="table">
                    <thead className="table-success">
                        <tr >
                            <th>#</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.length > 0 && todos.map((todo) => {
                            return (
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.name}</td>
                                    <td>{todo.type}</td>
                                    <td >
                                        <button className='btn btn-warning btn-sm me-3' onClick={(evt) => handleUpdate(todo.id)}>Edit</button>
                                        <button className='btn btn-danger btn-sm' onClick={(evt) => handleDelete(todo.id)}>Delete</button>
                                    </td>
                                </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    )
}
