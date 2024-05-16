import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

function Book() {
    const api = 'http://localhost:3000'
    const [books, setBooks] = useState([])
    const [isbn, setIsbn] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [id, setId] = useState(0)

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        try {
            axios
                .get(api + "/db/list")
                .then(res => {
                    setBooks(res.data)
                }).catch((err) => {
                    throw err
                })
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e,
                icon: "error"
            })
        }
    }

    const newBooks = () => {
        setIsbn("")
        setName("")
        setPrice(0)
        setId(0)
    };

    const newBooksSave = () => {
        try {
            if (id === 0) {
                axios
                .post(api + "/db/insert", {
                    isbn: isbn,
                    name: name,
                    price: price
                })
                .then((res) => {
                        Swal.fire({
                            title: "Saved",
                            text: "Saved the Data",
                            icon: "success",
                            timer: 1000
                        })

                        fetchData();

                        document.getElementById("btnClose").click()

                    }).catch((err) => {
                        throw err
                    })
            } else {
                axios
                .put(api + "/db/update/" + id, {
                        isbn: isbn,
                        name: name,
                        price: price,
                    })
                    .then((res) => {
                        Swal.fire({
                            title: "saved",
                            text: "Saved the data",
                            icon: "success",
                            timer: 1000,
                        })

                        fetchData()

                        document.getElementById("btnClose").click()
                    })
                    .catch((err) => {
                        throw err;
                    })
            }
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e,
                icon: "error"
            })

        }
    }


    const removeBooks = (item) => {
        try {
            Swal.fire({
                title: "Confirm Delete",
                text: "Are you sure ?",
                icon: "question",
                showCancelButton: true,
                showConfirmButton: true,
            }).then((res) => {
                if (res.isConfirmed) {
                    axios
                        .delete(api + "/db/delete/" + item.id)
                        .then((res) => {
                            Swal.fire({
                                title: "removed row",
                                text: "removed book",
                                icon: "success",
                                timer: 1000,
                            });

                            fetchData();
                        })
                        .catch((err) => {
                            throw err;
                        });
                }
            });
        } catch (e) {
            Swal.fire({
                title: "error",
                text: e,
                icon: "error",
            });
        }
    };


    const editBooks = (item) => {
        setIsbn(item.isbn)
        setName(item.name)
        setPrice(item.price)
        setId(item.id)
    }

    return (
        <div className='container-fluid'>
            <div>Book Data</div>

            <button
                onClick={newBooks}
                data-bs-toggle='modal'
                data-bs-target='#modalForm'
                className='btn btn-primary mt-3'>New Record
            </button>

            <table className="mt-3 table table-bordered table-striped">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>isbn</td>
                        <td>name</td>
                        <td>price</td>
                        <td width="200px"></td>
                    </tr>
                </thead>
                <tbody>
                    {books.length > 0 ? (
                        books.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.isbn}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td className="text-center">
                                    <button
                                        data-bs-toggle='modal'
                                        data-bs-target='#modalForm'
                                        onClick={e => editBooks(item)}
                                        className='btn btn-primary'>
                                        Edit</button>
                                    <button
                                        onClick={e => removeBooks(item)}
                                        className='btn btn-danger'>
                                        Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <></>
                    )
                    }
                </tbody>
            </table>

            <div className="modal" tabIndex="-1" id="modalForm">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Book Data</h5>
                            <button type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                id="btnClose">
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div>
                                    <label>isbn</label>
                                    <input value={isbn} onChange={e => setIsbn(e.target.value)} className='form-control' />
                                </div>
                                <div className='mt -3'>
                                    <label>name</label>
                                    <input value={name} onChange={e => setName(e.target.value)} className='form-control' />
                                </div>
                                <div className='mt -3'>
                                    <label>price</label>
                                    <input value={price} onChange={e => setPrice(e.target.value)} className='form-control' />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer" >
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button
                                onClick={newBooksSave}
                                type="button"
                                className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book