import React from 'react'
import { Button } from 'react-bootstrap';

export default function Head({ img, handleFilter, filter, handleCreateShow }) {
    return (
        <div className='row d-flex'>
            <div className='d-flex justify-content-between'>
                <div>
                    <img src={img} alt="" style={{ width: "300px" }} />

                </div>
                <div className='align-middle my-3'>
                    <input
                        type="search"
                        name='search'
                        className='form-control'
                        placeholder='Search'
                        value={filter.search}
                        onChange={handleFilter}
                    />
                </div>
            </div>
            <div className='d-flex justify-content-end align-content-center'>
                <label className='show my-2 me-2'>Select show item</label>
                <div className='me-2'>
                    <select className='form-select' value={filter.show} onChange={handleFilter} name="show">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
                <Button variant="primary" onClick={handleCreateShow} style={{ height: "40px" }} >
                    Create
                </Button>
            </div>
        </div>
    )
}
