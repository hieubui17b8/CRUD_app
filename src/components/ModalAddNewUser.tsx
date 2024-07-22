import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CreateUser } from '../services/userService';
import { toast } from 'react-toastify';
import { User } from '../types/user';

interface ModalAddNewUserProps {
    show: boolean;
    handleClose: () => void;
    handleUpdate: (user: User) => void;
}

const ModalAddNewUser: React.FC<ModalAddNewUserProps> = ({ show, handleClose, handleUpdate }) => {
    const [name, setName] = useState<string>("");
    const [job, setJob] = useState<string>("");

    const handleSaveUser = async () => {
        const res: any = await CreateUser(name, job)
        console.log(res);
        if (res && res.name && res.job) {//Check nếu api lỗi không trả về res
            handleUpdate({
                first_name: res.name,
                id: res.id
            })
            toast.success("Create User Successed!!")
            handleClose();
            setName("");
            setJob("");
        } else {
            toast.error("Create User Failed!!")
        }
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Job</label>
                            <input type="text"
                                className="form-control"
                                placeholder="Enter job"
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalAddNewUser;