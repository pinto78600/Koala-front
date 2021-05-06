import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import Card from './Post/Card';
import { isEmpty } from './Utils';

const Thread = () => {
    const [loadPost, setLoadPost ] = useState(true);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    const posts = useSelector(state => state.postReducer);
    const userData = useSelector(state => state.userReducer);

    const loadMore = ( ) => {
        if(window.innerHeight + document.documentElement.scrollTop + 1 > 
            document.scrollingElement.scrollHeight) {
                setLoadPost(true);
            }
    }

    useEffect(() => {

        if(loadPost && !isEmpty(userData)){
                dispatch(getPosts(count, userData.blocked));
                setLoadPost(false);
                setCount(count + 5);
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore)


    }, [loadPost, count, dispatch, userData])

    return (
        <div className='thread-container' >
            <ul>
                {!isEmpty(posts[0]) && 
                    posts.map(post => {
                        return  <Card post={post} key={post._id}/>
                    })
                }
            </ul>
        </div>
    );
};

export default Thread;