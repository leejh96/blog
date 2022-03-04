import axios from "axios";
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
  DELETE_NOTICE,
  LOAD_ONE_NOTICE_ERROR,
  LOAD_COMMENT_ERROR,
  LOAD_LIKE_ERROR,
  SERVER_ERROR,
  LOAD_NOTICE_ERROR,
  AUTH_ERROR,
  LOAD_ONE_NOTICE_VALID_ERROR,
  LOAD_COMMENT_VALID_ERROR,
  UPDATE_NOTICE_ERROR,
  CREATE_NOTICE_COMMENT_ERROR,
  LOAD_LIKE_VALID_ERROR,
  DELETE_LIKE_ERROR,
  NOTICE_SEARCH,
  NOTICE_SEARCH_ERROR,
  MAIN_LOAD_NOTICE,
  MAIN_LOAD_NOTICE_ERROR,
  COUNT_NOTICE,
  COUNT_NOTICE_ERROR,
} from "./type";

//camelCase
export const loadNotice = (page) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/notice/${page}`);
    if (res.data.success) {
      return dispatch({
        type: LOAD_NOTICE,
        data: res.data.notices,
      });
    }
    return dispatch({
      type: LOAD_NOTICE_ERROR,
      data: res.data.message,
    });
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};

export const mainLoadNotice = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/notice/main");
    if (res.data.success) {
      return dispatch({
        type: MAIN_LOAD_NOTICE,
        data: res.data.notices,
      });
    }
    return dispatch({
      type: MAIN_LOAD_NOTICE_ERROR,
      data: res.data.message,
    });
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};

export const noticeCount = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/notice/count");
    if (res.data.success) {
      return dispatch({
        type: COUNT_NOTICE,
        data: res.data.count,
      });
    }
    return dispatch({
      type: COUNT_NOTICE_ERROR,
      data: res.data.message,
    });
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};

export const loadOneNotice = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/notice/detail/${postId}`);
    if (res.data.success && res.data.auth) {
      return dispatch({
        type: LOAD_ONE_NOTICE,
        data: res.data.notice,
      });
    }
    if (!res.data.success && res.data.auth && res.data.valid) {
      return dispatch({
        type: LOAD_ONE_NOTICE_ERROR,
        data: res.data,
      });
    }
    if (!res.data.success && res.data.auth && !res.data.valid) {
      return dispatch({
        type: LOAD_ONE_NOTICE_VALID_ERROR,
        data: res.data,
      });
    }
    if (!res.data.success && !res.data.auth) {
      return dispatch({
        type: AUTH_ERROR,
        data: res.data,
      });
    }
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};

export const loadComment = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/notice/${id}/comment`);
    if (res.data.success && res.data.auth) {
      return dispatch({
        type: LOAD_COMMENT,
        data: res.data,
      });
    }
    if (!res.data.success && res.data.auth && res.data.valid) {
      return dispatch({
        type: LOAD_COMMENT_ERROR,
        data: res.data,
      });
    }
    if (!res.data.success && res.data.auth && !res.data.valid) {
      return dispatch({
        type: LOAD_COMMENT_VALID_ERROR,
        data: res.data,
      });
    }
    if (!res.data.success && !res.data.auth) {
      return dispatch({
        type: AUTH_ERROR,
        data: res.data,
      });
    }
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};
export const createNotice = (data) => async (dispatch) => {
  try {
    const res = await axios.post("/api/notice", data);
    if (res.data.success && res.data.auth) {
      return dispatch({
        type: CREATE_NOTICE,
        data: res.data,
      });
    }
    if (!res.data.auth && !res.data.success) {
      return dispatch({
        type: AUTH_ERROR,
        data: res.data,
      });
    }
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};
export const updateNotice = (data) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/notice/${data.postId}`, data);
    if (res.data.success && res.data.auth) {
      return dispatch({
        type: UPDATE_NOTICE,
        data: res.data,
      });
    }
    if (!res.data.success && res.data.auth) {
      return dispatch({
        type: UPDATE_NOTICE_ERROR,
        data: res.data,
      });
    }
    if (!res.data.success && !res.data.auth) {
      return dispatch({
        type: AUTH_ERROR,
        data: res.data,
      });
    }
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};
export const deleteNotice = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/notice/${postId}`);
    if (res.data.auth && res.data.success) {
      return dispatch({
        type: DELETE_NOTICE,
        data: res.data,
      });
    }
    if (!res.data.auth && !res.data.success) {
      return dispatch({
        type: AUTH_ERROR,
        data: res.data,
      });
    }
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};
export const searchNotice = (text, type) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/notice/search?text=${text}&type=${type}`);
    if (res.data.success) {
      return dispatch({
        type: NOTICE_SEARCH,
        data: res.data.notices,
      });
    }
    return dispatch({
      type: NOTICE_SEARCH_ERROR,
      data: res.data,
    });
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};
export const createNoticeComment = (data) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/notice/comment`, data);
    if (res.data.auth && res.data.success) {
      return dispatch({
        type: CREATE_NOTICE_COMMENT,
        data: res.data,
      });
    }
    if (res.data.auth && !res.data.success) {
      return dispatch({
        type: CREATE_NOTICE_COMMENT_ERROR,
        data: res.data,
      });
    }
    if (!res.data.auth && !res.data.success) {
      return dispatch({
        type: AUTH_ERROR,
        data: res.data,
      });
    }
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};

export const loadLike = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/notice/${id}/like`);
    if (res.data.success && res.data.auth) {
      return dispatch({
        type: LOAD_LIKE,
        data: res.data,
      });
    }
    if (!res.data.success && res.data.auth && res.data.valid) {
      return dispatch({
        type: LOAD_LIKE_ERROR,
        data: res.data,
      });
    }
    if (!res.data.success && res.data.auth && !res.data.valid) {
      return dispatch({
        type: LOAD_LIKE_VALID_ERROR,
        data: res.data,
      });
    }
    if (!res.data.success && !res.data.auth) {
      return dispatch({
        type: AUTH_ERROR,
        data: res.data,
      });
    }
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};

export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/notice/${postId}/like`);
    if (res.data.success && res.data.auth) {
      return dispatch({
        type: ADD_LIKE,
        data: res.data,
      });
    }
    if (!res.data.auth && !res.data.success) {
      return dispatch({
        type: AUTH_ERROR,
        data: res.data,
      });
    }
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};

export const deleteLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/notice/${postId}/like`);
    if (res.data.auth && res.data.success) {
      return dispatch({
        type: DELETE_LIKE,
        data: res.data,
      });
    }
    if (res.data.auth && !res.data.success) {
      return dispatch({
        type: DELETE_LIKE_ERROR,
        data: res.data,
      });
    }
    if (!res.data.auth && !res.data.success) {
      return dispatch({
        type: AUTH_ERROR,
        data: res.data,
      });
    }
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};

export const deleteNoticeComment = (commentId, postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/notice/${postId}/${commentId}`);
    if (res.data.auth && res.data.success) {
      return dispatch({
        type: DELETE_NOTICE_COMMENT,
        data: res.data,
      });
    }
    if (!res.data.auth && !res.data.success) {
      return dispatch({
        type: AUTH_ERROR,
        data: res.data,
      });
    }
  } catch (error) {
    return dispatch({
      type: SERVER_ERROR,
      data: {
        success: false,
      },
    });
  }
};
