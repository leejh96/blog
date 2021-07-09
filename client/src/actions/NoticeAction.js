import axios from 'axios';
import { 
    LOAD_NOTICE,
    LOAD_ONE_NOTICE,
    CREATE_NOTICE,
    UPDATE_NOTICE,
    LOAD_LIKE,
    ADD_LIKE,
    DELETE_LIKE,
    CREATE_NOTICE_COMMENT,
    LOAD_COMMENT,
    DELETE_NOTICE_COMMENT,
    DELETE_NOTICE
} from './type';
//camelCase
export const loadNotice = () => async dispatch => {
    try {
        const res = await axios.get('/api/notice');
        return dispatch({
            type : LOAD_NOTICE,
            data : res.data.notices,
        });
    } catch (error) {
        console.error(error);
        return ;
    }
}

export const loadOneNotice = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/notice/${id}`);
        return dispatch({
            type : LOAD_ONE_NOTICE,
            data : res.data.notice,
        });
    } catch (error) {
        console.error(error);
        return ;
    }
}

export const loadComment = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/notice/${id}/comment`);
        return dispatch({
            type : LOAD_COMMENT,
            data : res.data.comment 
        });
    } catch (error) {
        console.error(error);
        return ;
    }
}
export const createNotice = data => async dispatch => {
    try {
        const res = await axios.post('/api/notice/', data);
        return dispatch({
            type : CREATE_NOTICE,
            success : res.data.success,
            data : res.data.notice,
        });
    } catch (error) {
        console.error(error);
        return ;
    }
    
}
export const updateNotice = data => async dispatch => {
    try {
        const res = await axios.put(`/api/notice/${data.id}/updatenotice`,data);
        return dispatch({
            type : UPDATE_NOTICE,
            success : res.data.success,
            data : res.data.notice,
        });
    } catch (error) {
        console.error(error);
        return ;
    }
};
export const deleteNotice = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/notice/${id}/deletenotice`);
        return dispatch({
            type : DELETE_NOTICE,
            data : res.data.success,
        })
    } catch (error) {
        console.error(error);
        return ;
    }
}
export const createNoticeComment = data => async dispatch => {
    try {
        const res = await axios.put(`/api/notice/comment`, data);
        return dispatch({
            type : CREATE_NOTICE_COMMENT,
            success : res.data.success,
        });
    } catch (error) {
        console.error(error);
        return ;
    }
    
}

export const loadLike = (id) => async dispatch => {
    try {
        const res = await axios.get(`/api/notice/${id}`);
        return dispatch({
            type : LOAD_LIKE,
            data : res.data.notice.like,
            user : res.data.user,
        });
    } catch (error) {
        console.error(error);
        return ;
    }
    
}

export const addLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/notice/${id}/addlike`);
        return dispatch({
            type : ADD_LIKE,
            data : res.data.notice.like.length,
        });
    } catch (error) {
        console.error(error);
        return ;
    }
    
}

export const deleteLike = (id) => async dispatch => {
    try {
        const res = await axios.put(`/api/notice/${id}/deletelike`);
        return dispatch({
            type : DELETE_LIKE,
            data : res.data.notice.like.length,
        });
    } catch (error) {
        console.error(error);
        return ;
    }
    
}

export const deleteNoticeComment = (commentId, noticeId) => async dispatch => {
    try {
        const res = await axios.put(`/api/notice/${noticeId}/deletecomment`, {
            id : commentId
        });
        return dispatch({
            type : DELETE_NOTICE_COMMENT,
            data : res.data.comment
        })
    } catch (error) {
        console.error(error);
        return ;
    }
}