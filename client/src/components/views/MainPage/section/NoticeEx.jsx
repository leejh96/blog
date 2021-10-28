import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadNotice } from '../../../../actions/NoticeAction';
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { LOAD_NOTICE, LOAD_NOTICE_ERROR, SERVER_ERROR } from '../../../../actions/type';


const useStyles = makeStyles(theme => {
    return {
        title : {
            padding : '30px 12px 30px 12px',
            align : 'center',
            borderBottom : '1px solid #eeeeee'

        },
        post : {
            padding : '12px',
            justifyContent : 'space-between',
            alignItems :'center',
            fontSize : '1.25rem',
        },
        postLink : {
            textDecoration : 'none',
            color : 'black',
            '&:hover' : {
                color : '#999999',
            },
        },
    }
});


function Notice({ title }) {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state =>  state.UserReducer.user);
    useEffect(() => {
        dispatch(loadNotice())
        .then(res => {
            if(res.type === LOAD_NOTICE){
                return setPosts(res.data.slice(0,8));
            }
            if(res.type === LOAD_NOTICE_ERROR){
                return alert(res.data.message);
            }
            if(res.type === SERVER_ERROR){
                return history.push('/error/500');
            }
        })
        return () => {
            setPosts([]);
        }
    },[dispatch, history])
    return (
        <>
            <Typography variant='h5' align='center' className={classes.title}>{title}</Typography>
            {posts.map((val, i) => (
                <Box className={classes.post} display='flex' key={i}>
                    <Box>{i+1}</Box>
                    <Box><Link className={classes.postLink} to={user._id ? `/notice/1/${val._id}` : '/login'}  >{val.title}</Link></Box>
                    <Box>{val.author ? val.author.nick : '알수없음'}</Box>
                </Box>
            ))}
        </>
    )
}

export default Notice