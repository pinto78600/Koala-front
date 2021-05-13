import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../actions/user.actions';

const UploadImg = () => {
    const [ file, setFile ] = useState();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userReducer);
    const [loadPost, setLoadPost] = useState(false);

    const handlePicture = e => {
        e.preventDefault();
        setLoadPost(true);
        const data = new FormData();
        data.append('name', userData.pseudo);
        data.append('userId', userData._id);
        data.append('file', file);

        dispatch(uploadPicture(data, userData._id));
        setTimeout(() => {
            document.location.reload();
        }, 4000)
    }

    return (
        <form action='' onSubmit={handlePicture} className="upload-pic" >
            <label htmlFor="file">Changer d'image</label>
            <input type="file" id="file" name="file" 
            accept='.jpg, .jpeg, .png' onChange={e => { setFile(e.target.files[0])}}/>
            <br/> 
            {loadPost ? (
                <div className='icon' >
                    <i className='fas fa-spinner fa-pulse'></i>
                </div>
            )
            :
            (
                <input type='submit' value='Envoyer' />
            )}

        </form>
    );
};

export default UploadImg;