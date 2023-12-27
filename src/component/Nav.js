import React from 'react'

export default function Nav({ filter, handleFilter }) {
    return (
        <div className='col-3'>
            <div className='form-group'>
                <h5>Gender</h5>
                <select
                    className='form-control'
                    value={filter.gender}
                    onChange={handleFilter}
                    name="gender"
                >
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className="form-group">
                <h5>Age</h5>
                <div className="form-check my-2">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="age"
                        defaultValue="option1"
                        value=""
                        onClick={handleFilter}
                        defaultChecked
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                        All
                    </label>
                </div>
                <div className="form-check my-2">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="age"
                        defaultValue="option1"
                        value="10-20"
                        onClick={handleFilter}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio1">
                        10-20
                    </label>
                </div>
                <div className="form-check my-2">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="age"
                        defaultValue="option2"
                        value="20-30"
                        onClick={handleFilter}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                        20-30
                    </label>
                </div>
                <div className="form-check my-2">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="age"
                        defaultValue="option2"
                        value="40-50"
                        onClick={handleFilter}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                        40-50
                    </label>
                </div>
                <div className="form-check my-2">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="age"
                        defaultValue="option2"
                        value="50-60"
                        onClick={handleFilter}
                    />
                    <label className="form-check-label" htmlFor="inlineRadio2">
                        50-60
                    </label>
                </div>
            </div>
        </div>
    )
}
