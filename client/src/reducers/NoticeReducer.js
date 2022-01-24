// redux의 reducer 함수는 순수함수여야 한다.
// 즉 Date 나 random 같이 변하는 값은 사용하면 안되고 DB에 접근하는 것도 안된다.

import {
  LOAD_NOTICE,
  CREATE_NOTICE,
  LOAD_COMMENT,
  LOAD_ONE_NOTICE,
  CREATE_NOTICE_COMMENT,
  LOAD_LIKE,
  ADD_LIKE,
  DELETE_LIKE,
  DELETE_NOTICE_COMMENT,
  UPDATE_NOTICE,
  DELETE_NOTICE,
  NOTICE_ERROR,
  LOAD_COMMENT_ERROR,
  LOAD_LIKE_ERROR,
  LOAD_NOTICE_ERROR,
  LOAD_ONE_NOTICE_VALID_ERROR,
  LOAD_ONE_NOTICE_ERROR,
  LOAD_COMMENT_VALID_ERROR,
  CREATE_NOTICE_ERROR,
  SERVER_ERROR,
  UPDATE_NOTICE_ERROR,
  DELETE_NOTICE_ERROR,
  CREATE_NOTICE_COMMENT_ERROR,
  LOAD_LIKE_VALID_ERROR,
  ADD_LIKE_ERROR,
  DELETE_LIKE_ERROR,
  DELETE_NOTICE_COMMENT_ERROR,
  NOTICE_SEARCH_ERROR,
  NOTICE_SEARCH,
  COUNT_NOTICE,
  COUNT_NOTICE_ERROR,
} from "../actions/type";

const initialState = {
  noticeCount: 0,
  commentLength: 0,
  searchNotice: [],
  search: false,
  selectedNotice: {},
  likeCount: 0,
  error: false,
};
const NoticeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTICE:
      return {
        ...state,
        search: false,
        error: false,
      };
    case LOAD_ONE_NOTICE:
      return {
        ...state,
        searchNotice: [],
        selectedNotice: { ...action.data },
        error: false,
      };
    case CREATE_NOTICE_COMMENT:
      return {
        ...state,
        commentLength: state.commentLength + 1,
        error: false,
      };
    case LOAD_LIKE:
      return {
        ...state,
        likeCount: action.data.length,
        error: false,
      };
    case NOTICE_SEARCH:
      return {
        ...state,
        search: true,
        searchNotice: action.data,
      };
    case ADD_LIKE:
      return {
        ...state,
        likeCount: state.likeCount + 1,
        error: false,
      };
    case DELETE_LIKE:
      return {
        ...state,
        likeCount: state.likeCount - 1,
        error: false,
      };
    case CREATE_NOTICE:
      return {
        ...state,
        noticeCount: state.noticeCount + 1,
        error: false,
      };
    case LOAD_COMMENT:
      return {
        ...state,
        commentLength: action.data.length,
        error: false,
      };
    case DELETE_NOTICE_COMMENT:
      return {
        ...state,
        commentLength: state.commentLength - 1,
        error: false,
      };
    case UPDATE_NOTICE:
      return {
        ...state,
        error: false,
      };
    case DELETE_NOTICE:
      return {
        ...state,
        noticeCount: state.noticeCount - 1,
        error: false,
      };
    case COUNT_NOTICE:
      return {
        ...state,
        noticeCount: action.data,
      };
    case COUNT_NOTICE_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case NOTICE_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case LOAD_COMMENT_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case LOAD_LIKE_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case LOAD_ONE_NOTICE_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case LOAD_ONE_NOTICE_VALID_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case LOAD_NOTICE_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case LOAD_COMMENT_VALID_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case CREATE_NOTICE_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case SERVER_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case UPDATE_NOTICE_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case DELETE_NOTICE_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case CREATE_NOTICE_COMMENT_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case LOAD_LIKE_VALID_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case ADD_LIKE_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case DELETE_LIKE_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case DELETE_NOTICE_COMMENT_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    case NOTICE_SEARCH_ERROR:
      return {
        ...state,
        searchNotice: [],
        noticeCount: 0,
        commentLength: 0,
        selectedNotice: {},
        likeCount: 0,
        error: true,
      };
    default:
      return state;
  }
};

export default NoticeReducer;
