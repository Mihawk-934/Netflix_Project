import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdAddCircle } from 'react-icons/md';
import * as actions from '../../../../store/actions/index';
import firebase from '../../../../fire';
import './PhotoUser.css';
import axios from 'axios';

let fileName = 'image';
let newDirectory = localStorage.getItem('id');
let id = localStorage.getItem('id');
let storage = firebase.storage().ref(`images/${newDirectory}/${fileName}`);

class PhotoUser extends Component {
    state = {
        image: null,
        imageTmp: null,
        good: false
    }

    componentDidMount() {
        if (localStorage.getItem('photo')) {
            this.setState({image : localStorage.getItem('photo')})
            this.props.photoProfil(localStorage.getItem('photo'));
        }
        else if (localStorage.getItem('photoPhone')){
            this.setState({image : localStorage.getItem('photoPhone')})
            this.props.photoProfil(localStorage.getItem('photoPhone'));
        }
        else {
            let ref = this
            axios.get(`https://movies-52928.firebaseio.com/${id}/photo.json/`)
            .then(response => { 
                if(response.data.photo === true) {
                    storage.getDownloadURL()
                    .then(function(url) {
                        if (url) {
                            ref.setState({image: url});
                            ref.props.photoProfil(url);
                        }
                    })
                }
                else
                    this.setState({image : 'https://lebackyard.fr/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'})
            })
            .catch(err => this.setState({image : 'https://lebackyard.fr/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'}))
        }
    }

    handleChange = (e) => {
        if (e.target.files[0]) {
            if (e.target.files[0] !== this.state.image ) {
                this.setState({imageTmp: e.target.files[0], good: true}, () => {
                    if(this.state.good) {
                        if (this.state.image !== undefined) {
                            storage.put(this.state.imageTmp)
                            .then(res => { 
                                let ref = this
                                storage.getDownloadURL()
                                .then(function(url) {
                                    ref.props.photoProfil(url);
                                    ref.setState({image:url, good: false})
                                    const photo = { photo : true };
                                    axios.put(`https://movies-52928.firebaseio.com/${id}/photo.json/`, photo)
                                })
                            })
                        } 
                    }        
                })
            }            
        }         
    };
    
    render () {
        return (
            <div className="BlockContainer">
                <div className="TitleBackground">
                    <h4 className='h4'>Photo de Profil</h4>
                </div>
                <div className="BlockImageProfil">
                    <img src={this.state.image} className='ImgProfil'alt=''/>
                    {
                        (!localStorage.getItem('photo') && !localStorage.getItem('photoPhone')) && 
                        <div className='BlockLogo'>
                            <input style={{display: 'none'}} type='file' accept="image/*" onChange={this.handleChange} ref={fileInput => this.fileInput = fileInput}/>
                            <MdAddCircle className='LogoAdd' onClick={() => this.fileInput.click()}/>
                        </div>
                    }    
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        photoProfil: (image) => dispatch(actions.photoUrl(image)),
    };
};

export default connect(null, mapDispatchToProps) (PhotoUser);
