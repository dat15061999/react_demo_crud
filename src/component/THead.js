import React from 'react'
import Checkbox from './Checkbox';
export default function THead({ handleSelectAll, isCheckAll }) {
    return (
        <thead className='table-primary'>
            <tr>
                <th>
                    <Checkbox
                        classN="form-check-input"
                        type="checkbox"
                        name="selectAll"
                        id="selectAll"
                        handleClick={handleSelectAll}
                        isChecked={isCheckAll}
                    />
                </th>
                <th>ID</th>
                <th>FUllName</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Addess</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
    )
}
