import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadNotice } from '../../../../actions/NoticeAction';
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => {
    return {
        area : {
            border: '1px solid black',
            width : '40%',
            height : '500px',
            borderRadius : '25px 25px 25px 25px',
            boxShadow : '5px 5px 5px rgba(0,0,0,0.3)',
            [theme.breakpoints.down('md')]: {
                marginBottom : '20px',
                width : '60%',
            },
            [theme.breakpoints.down('sm')]: {
                marginBottom : '20px',
                width : '100%',
            },
        },
        title : {
            padding : '30px 0 30px 0',
            align : 'center',
            borderBottom : '1px solid #eeeeee'
        },

        post : {
            padding : '12px',
            justifyContent : 'space-between',
            fontSize : '1.25rem',
        },
        postLink : {
            textDecoration : 'none',
            color : 'black',
            marginBottom : '5px',
            '&:hover' : {
                color : '#999999',
            },
        }
    }
});


function Notice() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const dispatch = useDispatch();
    const user = useSelector(state =>  state.UserReducer.user);
    useEffect(() => {
        dispatch(loadNotice())
        .then(res => {
            setPosts(res.data.slice(0,7));
        })
    },[dispatch])
    return (
        <Box className={classes.area}>
            <Typography variant='h5' align='center' className={classes.title}>공지사항</Typography>
            {posts.map((val, i) => (
                <Box className={classes.post} display='flex' key={i}>
                    <Box>{i+1}</Box>
                    <Link className={classes.postLink} to={user._id ? `/notice/1/${val._id}` : '/login'}  >{val.title}</Link>
                    <Box>{val.author ? val.author.nick : '알수없음'}</Box>
                </Box>
            ))}
        </Box>
    )
}

export default Notice
