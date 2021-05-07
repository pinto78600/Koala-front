import axios from 'axios';
import { isEmpty } from '../components/Utils';

//posts

export const GET_POSTS = "GET_POSTS";
export const GET_POST = "GET_POST";
export const GET_ALL_POSTS = "GET_ALL_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const GET_POST_USER = 'GET_POST_USER';

// comments

export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

//errors
export const GET_POST_ERRORS = 'GET_POST_ERRORS';

//trends
export const GET_TRENDS = 'GET_TRENDS';

export const getPosts = (num, blocked) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: `https://mern-koala.herokuapp.com/api/post`,
        })
        .then(res => {
            if(!isEmpty(blocked)){
                for(let i = 0; i < blocked.length ; i++) {
                   res.data = res.data.filter(fil => fil.posterId !== blocked[i])
                }
                const array = res.data.slice(0, num);
                dispatch({ type : GET_POSTS, payload : array });
                dispatch({ type : GET_ALL_POSTS, payload : res.data });
            }
            else {
                const array = res.data.slice(0, num);
                dispatch({ type : GET_POSTS, payload : array });
                dispatch({ type : GET_ALL_POSTS, payload : res.data });
            }
        })
        .catch(err => console.log(err));
    }
}

export const getPostUser = (id) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/post/friendly/${id}`,
        })
        .then(res => {
            dispatch({ type : GET_POST_USER, payload : res.data });
        })
        .catch(err => console.log(err));
    }
}

export const getPost = (id) => {
    return (dispatch) => {
        return axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
        })
        .then(res => {
            dispatch({ type : GET_POST, payload : res.data });
        })
        .catch(err => console.log(err));
    }
}

export const addPost = data => {
    return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}api/post`, data)
            .then(res => {
                if(res.data.errors) {
                    dispatch({ type : GET_POST_ERRORS , payload : res.data.errors })
                }else{
                    dispatch({ type : GET_POST_ERRORS , payload : '' })
                }
            })
    }
};

export const likePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url:`${process.env.REACT_APP_API_URL}api/post/like-post/${postId}`,
            data: ({id : userId})
        })
        .then(res => {
            dispatch({ type : LIKE_POST, payload : {postId, userId} })
        })
        .catch(err => console.log(err));
    }
}

export const unlikePost = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: 'patch',
            url:`${process.env.REACT_APP_API_URL}api/post/unlike-post/${postId}`,
            data: ({id : userId})
        })
        .then(res => {
            dispatch({ type : UNLIKE_POST, payload : {postId, userId} })
        })
        .catch(err => console.log(err));
    }
}

export const updatePost = (text, postId) => {
    return (dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
            data:({ message : text })
        })
        .then(res => {
            dispatch({ type : UPDATE_POST, payload : {text, postId} })
        })
        .catch(err => console.log(err));
    }
} 

export const deletePost = (postId) => {
    return (dispatch) => {
        return axios({
            method: 'delete',
            url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        })
        .then(res => {
            dispatch({ type : DELETE_POST, payload : { postId } })
        })
        .catch(err => console.log(err));
    }
} 

export const addComment = (postId, commenterId, text, commenterPseudo ) =>{
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${postId}`,
            data:{ commenterId, text, commenterPseudo}
        })
        .then(res => {
            dispatch({ type: ADD_COMMENT, payload : { postId } })
        })
        .catch(err => console.log(err));
    }
}

export const editComment = (postId, commentId, text) =>{
    return (dispatch) => {
        return axios({
            method: 'put',
            url: `${process.env.REACT_APP_API_URL}api/post/edit-comment-post/${postId}`,
            data:{ commentId, text}
        })
        .then(res => {
            dispatch({ type: EDIT_COMMENT, payload : { postId, commentId, text } })
        })
        .catch(err => console.log(err));
    }
}

export const deleteComment = (postId, commentId) =>{
    return (dispatch) => {
        return axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}api/post/delete-comment-post/${postId}`,
            data:{ commentId }
        })
        .then(res => {
            dispatch({ type: DELETE_COMMENT, payload : { postId, commentId } })
        })
        .catch(err => console.log(err));
    }
};

export const getTrends = sortedArray => {
    return (dispatch) => {
        dispatch({ type: GET_TRENDS, payload : sortedArray })
    }
};
