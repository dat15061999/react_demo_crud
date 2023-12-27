import React from 'react'
import { Button } from 'react-bootstrap';

export default function ModalBodyCreateAndEdit({ formCreateAndEdit, handleClose }) {
    return (
        <form onSubmit={formCreateAndEdit.handleSubmit} noValidate>
            <div className="mb-3">
                <label htmlFor="name" className='show'>
                    Name
                </label>
                <input
                    type="text"
                    className={`form-control ${formCreateAndEdit.touched.name && formCreateAndEdit.errors.name ? 'error-input' : ''}`}
                    id="name"
                    aria-describedby="name"
                    value={formCreateAndEdit.values.name}
                    onChange={formCreateAndEdit.handleChange}
                    onBlur={formCreateAndEdit.handleBlur}
                    required
                />
                {formCreateAndEdit.touched.name && formCreateAndEdit.errors.name && (
                    <span className="error" style={{ color: "red" }}>{formCreateAndEdit.errors.name}</span>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="show form-label">
                    Gender
                </label>
                <select
                    className={`form-control ${formCreateAndEdit.touched.gender && formCreateAndEdit.errors.gender ? 'error-input' : ''}`}
                    id="gender"
                    aria-describedby="gender"
                    value={formCreateAndEdit.values.gender}
                    onChange={formCreateAndEdit.handleChange}
                    onBlur={formCreateAndEdit.handleBlur}
                    required
                >
                    <option value="">Please choose gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                {formCreateAndEdit.touched.gender && formCreateAndEdit.errors.gender && (
                    <span className="error" style={{ color: "red" }}>{formCreateAndEdit.errors.gender}</span>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="show form-label">
                    Age
                </label>
                <input
                    value={formCreateAndEdit.values.age}
                    onChange={formCreateAndEdit.handleChange}
                    type="number"
                    className={`form-control ${formCreateAndEdit.touched.age && formCreateAndEdit.errors.age ? 'error-input' : ''}`}
                    id="age"
                    aria-describedby="age"
                    error={formCreateAndEdit.errors.age}
                    onBlur={formCreateAndEdit.handleBlur}
                    required
                />
                {formCreateAndEdit.touched.age && formCreateAndEdit.errors.age && (
                    <span className="error" style={{ color: "red" }}>{formCreateAndEdit.errors.age}</span>
                )}
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="show form-label">
                    Email address
                </label>
                <input
                    type="email"
                    className={`form-control ${formCreateAndEdit.touched.email && formCreateAndEdit.errors.email ? 'error-input' : ''}`}
                    id="email"
                    aria-describedby="email"
                    value={formCreateAndEdit.values.email}
                    onChange={formCreateAndEdit.handleChange}
                    onBlur={formCreateAndEdit.handleBlur}
                    required
                />
                {formCreateAndEdit.touched.email && formCreateAndEdit.errors.email && (
                    <span className="error" style={{ color: "red" }}>{formCreateAndEdit.errors.email}</span>
                )}
            </div>
            <div className="mb-3">
                <label className="show form-label">
                    Address
                </label>
                <input
                    type="text"
                    className={`form-control ${formCreateAndEdit.touched.address && formCreateAndEdit.errors.address ? 'error-input' : ''}`}
                    id="address"
                    value={formCreateAndEdit.values.address}
                    onChange={formCreateAndEdit.handleChange}
                    onBlur={formCreateAndEdit.handleBlur}
                    required
                />
                {formCreateAndEdit.touched.address && formCreateAndEdit.errors.address && (
                    <span className="error" style={{ color: "red" }}>{formCreateAndEdit.errors.address}</span>
                )}
            </div>
            <div className="mb-3 form-check d-flex justify-content-end">
                <Button variant="secondary me-2" onClick={handleClose}>
                    Close
                </Button>
                <Button
                    type="submit"
                    variant="primary">{formCreateAndEdit.values.isEdit ? "Update" : "Create"}</Button>
            </div>
        </form>
    )
}
