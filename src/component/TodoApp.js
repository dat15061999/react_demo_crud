import React, { useState } from 'react'

export default function Todo() {

    const [todo, setTodo] = useState({
        id: 0,
        fullName: "",
        type: "Men",
        isEdit: false
    })

    let initData = [
        {
            id: 1,
            fullName: "Dat",
            type: "Men"
        },
        {
            id: 2,
            fullName: "Quang",
            type: "Women"
        }
    ]

    const [todos, setTodos] = useState([...initData])

    const handleChange = (evt) => {
        const infor = evt.target.name;
        if (infor === "fullName") {
            setTodo({
                ...todo,
                fullName: evt.target.value
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
                currentId = array[i].id;
            }
        }
        return currentId;
    }


    const handleAddAndEdit = (evt) => {
        if (todo.isEdit) {
            let obj = todos.find(td => td.id === todo.id);
            obj.fullName = todo.fullName;
            obj.type = todo.type;
            setTodos([...todos]);
            resetTodo();
        }
        else {
            let addTodoApi = () => {
                const todoApi = {
                    id: incresID(todos) + 1,
                    fullName: todo.fullName,
                    type: todo.type
                }
                console.log(todos);
                let newArray = [...todos, todoApi]

                setTodos(newArray);
                setTodo({
                    id: 0,
                    fullName: "",
                    type: "Men"
                });
            }
            addTodoApi();
        }
    }

    const handleUpdate = (id) => {
        const todo = todos.find(td => td.id === id)
        setTodo({ ...todo, isEdit: true })
    }
    const handleDelete = (id) => {
        let newArray = todos.filter((todo) => todo.id !== id)
        setTodos(newArray);
    }
    const resetTodo = () => {
        setTodo({
            id: 0,
            fullName: "",
            type: "Men",
            isEdit: false
        })
    }

    return (
        <div className='container' style={{ width: "450px" }}>
            <div className='form-control row my-5 mx-1'>
                <div className='justify-content-center'>
                    <h2>Todo</h2>
                </div>
                <div className='col-12 mb-3'>
                    <label className='mb-3'>Name : </label>
                    <input type="text" name="fullName" className='form-control' value={todo.fullName} onChange={handleChange} />
                </div>
                <div className='col-12 mb-3'>
                    <label className='mb-3'>Gender : </label>
                    <select name='type' className='form-control m-with-8' value={todo.type} onChange={handleChange}>
                        <option>Men</option>
                        <option>Women</option>
                    </select>
                </div>
                <div className='col-12'>
                    <button type="submit" name="fullName" className='btn btn-success btn-sm me-2' onClick={handleAddAndEdit}>{todo.isEdit ? "Update" : "Add todo"}</button>
                    {todo.isEdit && <button className='btn btn-dark btn-sm' onClick={resetTodo} >Cancel</button>}
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
                                    <td>{todo.fullName}</td>
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
