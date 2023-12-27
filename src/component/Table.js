import React from 'react'
import THead from './THead'
import TBody from './TBody'

export default function Table({ subset, handleSelectAll, isCheckAll, isCheck, handleCheckbox, handleEdit, handleDelete }) {
    return (
        <table className='table'>
            <THead
                handleSelectAll={handleSelectAll}
                isCheckAll={isCheckAll}
            />
            <TBody
                subset={subset}
                handleCheckbox={handleCheckbox}
                isCheck={isCheck}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />

        </table>
    )
}
