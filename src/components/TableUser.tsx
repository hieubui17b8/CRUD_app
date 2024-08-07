import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { fetchAllUser } from '../services/userService';
import { User } from '../types/user';
import ReactPaginate from 'react-paginate';
import ModalAddNewUser from './ModalAddNewUser';


function TableUser() {
    const [listUsers, setListUsers] = useState<User[]>([]);
    const [totalUsers, setTotalUsers] = useState<number>(0)
    const [totalPages, settotalPages] = useState<number>(0)
    const [isShowAddNewUser, setIsShowAddNewUser] = useState<boolean>(false)
    useEffect(() => {
        //   call apis
        getUsers(1);
    }, [])

    const getUsers = async (page: number) => {
        const res: any = await fetchAllUser(page);
        console.log(res);

        if (res && res.data) {//Check nếu api lỗi không trả về res
            setTotalUsers(res.total)
            setListUsers(res.data);
            settotalPages(res.total_pages);
        }
    }

    console.log(listUsers);

    const handlePageClick = (event: { selected: number; }) => {
        console.log(event);
        getUsers(+event.selected + 1);
    };
    const handleShowModalAddNewUser = () => {
        setIsShowAddNewUser(!isShowAddNewUser)
    };
    const handleCloseModal = () => {
        setIsShowAddNewUser(false)
    }

    const handleUpdatetable = (user: User) => {
        setListUsers([user, ...listUsers])
    }

    return (
        <Container>
            <div className='m-3 d-flex justify-content-between align-items-center'>
                <h5>List User :</h5>
                <div className="btn btn-success"
                    onClick={handleShowModalAddNewUser}
                >
                    Add new user
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 &&
                        listUsers.map((user: User, index) => (
                            <tr key={`user-${index}`}>
                                <td>{index + 1}</td>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />
            <ModalAddNewUser
                show={isShowAddNewUser}
                handleClose={handleCloseModal}
                handleUpdate={handleUpdatetable}
            />
        </Container>
    );
}

export default TableUser;