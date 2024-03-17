import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Draft.css';
import { MDBBtn } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Draft({ draftDetails, onSend }) {
    const [drafts, setDrafts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedDraftIndex, setSelectedDraftIndex] = useState(null);
    const [editedDraft, setEditedDraft] = useState({
        fromEmail: '',
        toEmail: '',
        subject: '',
        message: '',
    });

    useEffect(() => {
        const savedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
        setDrafts(savedDrafts);
    }, []);

    const handleEdit = (index) => {
        setSelectedDraftIndex(index);
        setEditedDraft(drafts[index]);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedDraftIndex(null);
        setEditedDraft({
            fromEmail: '',
            toEmail: '',
            subject: '',
            message: '',
        });
    };

    const handleSaveEdit = () => {
        const updatedDrafts = [...drafts];
        updatedDrafts[selectedDraftIndex] = editedDraft;
        setDrafts(updatedDrafts);
        localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
        handleModalClose();
        toast.success("Saved Changes")
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedDraft((prevDraft) => ({
            ...prevDraft,
            [name]: value,
        }));
    };

    const handleDelete = (index) => {
        const updatedDrafts = [...drafts];
        updatedDrafts.splice(index, 1);
        setDrafts(updatedDrafts);
        localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
        toast.error("Draft Deleted")
    };

    const handleSend = (index) => {
       
        const draftToSend = drafts[index];
        onSend(draftToSend);
        const updatedDrafts = drafts.filter((_, i) => i !== index);
        setDrafts(updatedDrafts);
        localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
        toast.success("E-mail Sent")
    };

    return (
        <div className='contain2'>
            <h2>Drafts</h2>
            {drafts.length === 0 ? (
                <p>No drafts saved.</p>
            ) : (
                <ul>
                     <div className='containmails'>
                     <div className='containmails1'>
                    {drafts.map((draft, index) => (
                        <div key={index} className='minidivs1'>
                            <p><strong>From:</strong> {draft.fromEmail}</p>
                            <p><strong>To:</strong> {draft.toEmail}</p>
                            <p><strong>Subject:</strong> {draft.subject}</p>
                            <p><strong>Message:</strong> {draft.message}</p>
                            <MDBBtn onClick={() => handleEdit(index)} className='btn2 btn-warning text-light'>Edit </MDBBtn>
                            
                            <MDBBtn onClick={() => handleDelete(index)}   className='btn2 btn-danger ml-1'>Delete </MDBBtn>
                           
                            <MDBBtn onClick={() => handleSend(index)}  className='btn2 btn-success ml-1'>Send </MDBBtn>
                        
                        </div>
                    ))}
                    </div>
                    </div>
                </ul>
            )}
            
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Draft</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId='formFromEmail'>
                            <Form.Label>From</Form.Label>
                            <Form.Control type='text' name='fromEmail' value={editedDraft.fromEmail} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='formToEmail'>
                            <Form.Label>To</Form.Label>
                            <Form.Control type='text' name='toEmail' value={editedDraft.toEmail} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='formSubject'>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type='text' name='subject' value={editedDraft.subject} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId='formMessage'>
                            <Form.Label>Message</Form.Label>
                            <Form.Control as='textarea' rows={3} name='message' value={editedDraft.message} onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleModalClose}>Close</Button>
                    <Button variant='primary' onClick={handleSaveEdit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
      position='top-center'
      theme='colored'
      autoClose={2000}/>
        </div>
    );
}

export default Draft;