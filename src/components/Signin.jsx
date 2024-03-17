import React, { useState } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import './Signin.css'

function Signin() {

    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        navigate('/landingpage', { state: { email: email } });
    };

    

  return (
    <div className='contain'>
        <div className='sbox'>
            <h1 id='sn'>Sign In</h1>
            <h4>To continue to Mail</h4>
            <form onSubmit={handleSubmit}>
                    <div className='sbox1'>
                        <MDBInput label='Enter Your E-mail' id='typeEmail' type='email' value={email} onChange={handleChange} />
                    </div>
                    <div className='sdiv'>
                    <MDBBtn type="submit" id='bb'>Sign In</MDBBtn>
                    </div>
                </form>

        </div>

    </div>
  )
}

export default Signin