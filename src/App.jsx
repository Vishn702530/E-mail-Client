// App.jsx
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signin from './components/Signin';
import LandingPage from './components/LandingPage';
import Draft from './components/Draft';

import React, { useState } from 'react';

function App() {
    const [draftDetails, setDraftDetails] = useState(() => {
        const savedDrafts = JSON.parse(localStorage.getItem('drafts')) || [];
        return savedDrafts;
    });

    const handleSaveDraft = (details) => {
        setDraftDetails([...draftDetails, details]);
        localStorage.setItem('drafts', JSON.stringify([...draftDetails, details]));
    };

    const handleSendFromDraft = (draftToSend) => {
        const savedSentDetails = JSON.parse(localStorage.getItem('sentDetails')) || [];
        const updatedSentDetails = [...savedSentDetails, draftToSend];
        localStorage.setItem('sentDetails', JSON.stringify(updatedSentDetails));
    };

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Signin />} />
                <Route
                    path='/landingpage'
                    element={<LandingPage />}
                />
                <Route
                    path='/draft'
                    element={<Draft draftDetails={draftDetails} onSend={handleSendFromDraft} />}
                />
                
            </Routes>
        </div>
    );
}

export default App;
