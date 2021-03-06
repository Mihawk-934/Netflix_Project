import React from 'react';
import PhotoUser from './PhotoUser/PhotoUser';
import InfoUser from './InfoUser/InfoUser';
import CbUser from './CbUser/CbUser';
import DeleteAccount from './DeleteAccount/DeleteAccount';
import './MyInfo.css';

const MyInfo = () => {
    return (
        <div className='PageMyInfo'>
            <h1 className='Title'>Info Perso</h1>
            <PhotoUser/>
            <InfoUser/>
            <CbUser/>
            <DeleteAccount />
        </div>
    )
} 

export default MyInfo;