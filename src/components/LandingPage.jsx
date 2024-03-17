import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LandingPage.css';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router-dom';


function LandingPage({ onSaveDraft, draftDetails }) {
   
    const navigate = useNavigate();
    const [sentDetails, setSentDetails] = useState([]);
    const [showDiv, setShowDiv] = useState(false);
    const [toEmail, setToEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [showDetails, setShowDetails] = useState(false);
    
    const [fromEmail, setFromEmail] = useState('');
    const location = useLocation();

    const [centredModal, setCentredModal] = useState(false); 
    const toggleOpen = () => setCentredModal(!centredModal); 

    useEffect(() => {
        const savedDetails = JSON.parse(localStorage.getItem('sentDetails')) || [];
        if (savedDetails) {
            setSentDetails(savedDetails);
        }
    }, []);

    // useEffect(() => {
    //     localStorage.setItem('sentDetails', JSON.stringify(sentDetails));
        
    // }, [sentDetails]);

    useEffect(() => {
        if (location.state && location.state.email) {
            setFromEmail(location.state.email);
        }
    }, [location.state]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const details = {
            fromEmail: fromEmail,
            toEmail: toEmail,
            subject: subject,
            message: message,
        };
        setSentDetails([...sentDetails, details]);
        setShowDetails(true);
        setShowDiv(true);
        setToEmail('');
        setSubject('');
        setMessage('');
    };

    const handleSendButtonClick = () => {
        handleSubmit(new Event('submit'));
        localStorage.setItem('sentDetails',JSON.stringify(sentDetails));
        toast.success("E-mail Sent")
    };

    const handleSaveButtonClick = () => {
        const draftDetails = {
            fromEmail: fromEmail,
            toEmail: toEmail,
            subject: subject,
            message: message,
        };
        const savedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
        const updatedDrafts = [...savedDrafts, draftDetails];
        localStorage.setItem('drafts', JSON.stringify(updatedDrafts));
        toast.warning("E-mail Saved to Draft")
    };

    const handleOpenDraftButtonClick = () => {
        navigate('/draft');
    };

    const handleDeleteButtonClick = (index) => {
        const updatedSentDetails = [...sentDetails];
        updatedSentDetails.splice(index, 1);
        setSentDetails(updatedSentDetails);
        localStorage.setItem('sentDetails', JSON.stringify(updatedSentDetails));
        toast.error("E-mail Deleted")
       
    };

    const handleSendFromDraft = (draftToSend) => {
        setSentDetails([...sentDetails, draftToSend]); 
        localStorage.setItem('sentDetails', JSON.stringify([...sentDetails, draftToSend]));
        toast.success("E-mail Sent")
    };

    return (
        <div className='contain1'>
            <>
                <MDBModal tabIndex='-1' open={centredModal} setOpen={setCentredModal}>
                    <MDBModalDialog centered>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>New Message</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>From</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={fromEmail} readOnly />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupToEmail">
                                        <Form.Label>To</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" value={toEmail} onChange={(e) => setToEmail(e.target.value)} />
                                    </Form.Group>
                                    <br />
                                    <Form.Control placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                                    <br />
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
                                    </Form.Group>
                                </Form>
                            </MDBModalBody>
                            <MDBModalFooter>
                                <MDBBtn id='sv' color='success' onClick={() => { handleSaveButtonClick(); toggleOpen(); }}>Save</MDBBtn>
                                <MDBBtn onClick={handleSendButtonClick} color='danger' id='jk' type="submit" >Send</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </>
            <MDBBtn onClick={toggleOpen} className='btn btn-success'>Compose</MDBBtn>
            <MDBBtn onClick={handleOpenDraftButtonClick} className='btn btn-warning ml-1'>Open Draft</MDBBtn>
            <div className='containmail'>
                
                <div className='containmail1'>
                    <h2>Sent Mails</h2>
                    {sentDetails.map((detail, index) => (
                        <div key={index} className="minidivs">
                            <p><strong>From:</strong> {detail.fromEmail}</p>
                            <p><strong>To:</strong> {detail.toEmail}</p>
                            <p><strong>Subject:</strong> {detail.subject}</p>
                            <MDBBtn onClick={() => handleDeleteButtonClick(index)} className='btnd btn-danger'>Delete</MDBBtn>
                            
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer
      position='top-center'
      theme='colored'
      autoClose={2000}/>
        </div>
        
    );
}

export default LandingPage;

