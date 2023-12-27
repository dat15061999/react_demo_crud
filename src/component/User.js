import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";
import { Pagination } from '@mui/material';
import Head from './Head';
import ModalBodyCreateAndEdit from './ModalBodyCreateAndEdit';
import Nav from './Nav';
import Table from './Table';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    age: Yup.string()
        .min(2, 'Too Young!')
        .max(80, 'Too Old!')
        .required('Required'),
    gender: Yup.string()
        .required("Required"),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    address: Yup.string()
        .min(6, 'Too Short!')
        .max(32, 'Too Long!')
        .required('Required')
});
function isUserAgeInRange(userAge, ageRange) {
    const [minAge, maxAge] = ageRange.split('-');
    return userAge >= parseInt(minAge) && userAge <= parseInt(maxAge);
};
function filterUsers(users, filter) {
    return users.filter(user => {
        return (
            (filter.search ? (user.name.includes(filter.search) || user.address.includes(filter.search) || user.email.includes(filter.search)) : true)
            && (filter.age ? isUserAgeInRange(user.age, filter.age) : true)
            && (filter.gender ? user.gender === filter.gender : true)
        );
    });
}
export default function User() {
    const [users, setUsers] = useState([])
    const [id, setId] = useState(0);
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [filter, setFilter] = useState({
        search: "",
        gender: "",
        age: "",
        show: "5"
    })
    const [isCheckAll, setIsCheckAll] = useState(false)
    const [isCheck, setIsCheck] = useState([]);
    const handleClose = () => {
        formCreateAndEdit.resetForm();
        setShow(false);
    }
    const handleShow = () => setShow(true);

    const notifySuccess = (text) => {
        toast.success(text, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const notifyError = (err) => {
        toast.error("Error Notification !" + err, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const formCreateAndEdit = useFormik({
        initialValues: {
            name: "",
            age: "",
            gender: "",
            email: "",
            address: "",
            isEdit: false
        },
        validationSchema: SignupSchema,
        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(false);
            if (formCreateAndEdit.values.isEdit) {
                updateUSer(values);
            } else {
                createUSer(values);
            }
        }
    })

    const handleFilter = (evt) => {
        const { name, value } = evt.target;
        const btn = evt.target.name;
        console.log(btn);
        setFilter(prevFilter => ({
            ...prevFilter,
            [name]: value
        }));
    }

    useEffect(() => {
        getAllUser();
    }, [])

    const createUSer = (values) => {
        fetch('https://6585309f022766bcb8c80b7d.mockapi.io/user/informationUser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then(() => {
            addNewUser(values);
            handleClose();
            notifySuccess("Create successfullly!");
        }).catch((err) => {
            notifyError(err);
        })
    }
    const handleEdit = async (userId) => {
        const user = users.filter((user) => user.id === userId);
        setId(userId);
        formCreateAndEdit.setValues({
            ...user[0],
            isEdit: true
        })
        handleShow();
    }
    const getAllUser = async () => {
        const list = await fetch("https://6585309f022766bcb8c80b7d.mockapi.io/user/informationUser")
        const userList = await list.json();
        setUsers(userList)
        setTotalPages(Math.ceil(userList.length / parseInt(filter.show)));
    }
    const handleCreateShow = () => {
        formCreateAndEdit.values.isEdit = false;
        handleShow()
    }
    const updateUSer = (values) => {
        fetch('https://6585309f022766bcb8c80b7d.mockapi.io/user/informationUser/' + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then(() => {
            updateNewUser(values);
            handleClose();
            notifySuccess("Update successfully!");
        }).catch((err) => {
            notifyError(err);
        })
    }
    const handleDelete = (userID) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to delete user with iD: ' + userID,
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch('https://6585309f022766bcb8c80b7d.mockapi.io/user/informationUser/' + userID, {
                            method: "DELETE"
                        })
                            .then(() => {
                                const newUser = users.filter((user) => { return user.id !== userID })
                                setUsers(newUser);
                                notifySuccess('Deleted user successfully')
                            })
                            .catch((err) => {
                                notifyError(err)
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No')
                }
            ]
        });
    };
    const updateNewUser = (values) => {
        setUsers(prevUsers => {
            const updatedUsers = prevUsers.map(user => {
                if (user.id === id) {
                    return { ...user, ...values };
                }
                return user;
            });
            return updatedUsers;
        });
    }
    const addNewUser = (values) => {
        setUsers(prevUsers => {
            const currentID = Math.max(...prevUsers.map(user => user.id)) + 1;
            const newUser = { ...values, id: currentID };
            const updatedUsers = [...prevUsers, newUser];
            return updatedUsers;
        });
    }
    const startIndex = (currentPage - 1) * parseInt(filter.show);
    const endIndex = startIndex + parseInt(filter.show);
    const subset = filterUsers(users, filter).slice(startIndex, endIndex);
    const handlePageChange = (event, selectedPage) => {
        console.log(selectedPage);
        setCurrentPage(selectedPage);
    };
    useEffect(() => {
        const filteredUsers = filterUsers(users, filter);
        setTotalPages(Math.ceil(filteredUsers.length / parseInt(filter.show)));
    }, [users, filter]);
    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(users.map(li => li.id));
        console.log(isCheck);
        if (isCheckAll) {
            setIsCheck([]);
        }
    };
    const handleCheckbox = e => {
        const { id, checked } = e.target;
        console.log(checked);
        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== id));
        }
    };
    return (
        <div className='container-sm align-content-center my-2 '>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{formCreateAndEdit.values.isEdit ? "Modal Edit" : "Modal Create"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModalBodyCreateAndEdit
                        formCreateAndEdit={formCreateAndEdit}
                        handleClose={handleClose}
                    />
                </Modal.Body>
            </Modal>
            <Head
                img={"https://cdn.hanoi.codegym.vn/wp-content/uploads/sites/7/2022/05/logor.jpg"}
                filter={filter}
                handleFilter={handleFilter}
                handleCreateShow={handleCreateShow}
            />
            <div className='row my-3' style={{ width: "95%" }}>
                <Nav
                    filter={filter}
                    handleFilter={handleFilter}
                />
                <div className='col-md-9'>
                    <div>
                        <Table
                            handleSelectAll={handleSelectAll}
                            isCheckAll={isCheckAll}
                            subset={subset}
                            handleCheckbox={handleCheckbox}
                            isCheck={isCheck}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            size="small"
                            variant="outlined"

                            color="secondary"
                        />
                    </div>

                </div>

            </div>
            <ToastContainer />
        </div >

    )
}

