import React from 'react'
import Checkbox from './Checkbox';

export default function TBody({ subset, handleCheckbox, isCheck, handleEdit, handleDelete }) {
    return (
        <tbody>
            {subset.length > 0
                && subset
                    .map((user) => {
                        return (
                            <tr className='align-middle'>
                                <td>
                                    <Checkbox
                                        classN="form-check-input"
                                        name='choose'
                                        type="checkbox"
                                        isChecked={isCheck.includes(user.id)}
                                        handleClick={handleCheckbox}
                                        id={user.id}
                                        key={user.id}
                                    />
                                </td>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>{user.gender}</td>
                                <td>{user.address}</td>
                                <td>{user.email}</td>
                                <td>
                                    <button className='btn btn-warning me-1 btn-sm btn-xs' onClick={() => handleEdit(user.id)}><i className="fa-regular fa-pen-to-square"></i></button>
                                    <button className='btn btn-danger btn-sm btn-xs' onClick={() => handleDelete(user.id)}><i className="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })}

        </tbody>
    )
}
