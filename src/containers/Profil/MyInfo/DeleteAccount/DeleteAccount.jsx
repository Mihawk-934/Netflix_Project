import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const DeleteAccount = () => {
    const history = useHistory();
    const [modal, setModal] = useState(false);

    const deleteAccount = () => {
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDJQ2C-WHsJXu5xVCG5Z98XQ31gRJrSV_E',{"idToken": localStorage.getItem('token')}) 
            .then(res =>{
                toast.info('Votre a bien ete supprimer A bientot .', {
                    autoClose: 3000,
                    closeButton: false,
                    className:'toastCss'
                })
                localStorage.removeItem('token')
                localStorage.removeItem('social')
                localStorage.removeItem('id')
                localStorage.removeItem('mail')
                localStorage.removeItem('show')
                setModal(false);
            })
            .catch(err => {
                toast.error('Erreur, veuillez vous reconnectez 😮.',  {
                    autoClose: 3000,
                    closeButton: false,
                    className:'toastCss'
                })
            })
    }

    const Annuler = () => {
        setModal(false)
        toast.info('Ouff .', {
            autoClose: 3000,
            closeButton: false,
            className:'toastCss'
        })
    }

    function MyVerticallyCenteredModal(props) {
        return (
            <Modal
                {...props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header  style={{backgroundColor:'black',color:'white'}}>
                    <Modal.Title>Team Netflix</Modal.Title>
                </Modal.Header>
                <Modal.Body  style={{backgroundColor:'black',color:'white'}}>
                    <p>
                        Nous sommes triste de vous voir partir 😭 <br/>
                        Etes vous sur de vouloir supprimer votre compte ?<br/>
                        Cette action entrainera une supression definitive de vos données
                    </p>
                </Modal.Body>
                <Modal.Footer style={{backgroundColor:'black',color:'white',display:'flex',justifyContent:'space-around'}}>
                    <Button style={{backgroundColor:'grey',color:'white', border:'none'}} onClick={Annuler} >Annuler</Button>
                    <Button style={{backgroundColor:'red',color:'white', border:'none'}} onClick={deleteAccount}>Confirmer</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    if (localStorage.getItem('token')=== null){
        setTimeout(() => {
          return(history.push('/register'))
        }, 5000);
    }

    return (
        <>
            { localStorage.getItem('noSocial') && <p style={{textAlign:'center', color:'black', cursor:'pointer'}} onClick={()=>setModal(true)}>Supprimer mon compte</p>}  
            <MyVerticallyCenteredModal
                show={modal}
                onHide={() => setModal(false)}
                />
        </>
    )
}

export default DeleteAccount;