import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { AUTH_ERROR, AUTH_USER, SERVER_ERROR } from "../actions/type";
import { authUser, OauthUser } from "../actions/UserAction";
import getCookie from "../util/getCookie";

function Auth(Component, option, adminRoute = null) {
  //component => hoc를 적용할 컴포넌트
  //option => null: 아무나 출입,
  //          true => 로그인유저만 출입,
  //          false => 로그인 한 유저는 출입불가
  //adminRoute => true : admin User만 출입
  function AuthenticationCheck() {
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
      const access = localStorage.getItem("access");
      if (access) {
        dispatch(authUser(access)).then((res) => {
          if (res.type === AUTH_USER) {
            //재발급 시 토큰 교체
            localStorage.setItem("access", res.data.token);

            //로그인 한 상태 중 관리자가 아닌사람이
            //adminpage를 들어가려할때
            if (adminRoute && res.data.user.role !== 3) {
              return history.push("/");
            }
            if (option === false) {
              return history.push("/");
            }
          }
          if (res.type === AUTH_ERROR) {
            localStorage.removeItem("access");
            alert(res.data.message);
            return history.push("/login");
          }
          if (res.type === SERVER_ERROR) {
            localStorage.removeItem("access");
            return history.push("/error/500");
          }
        });
      }
      // oauth
      if (document.cookie) {
        const { key, value } = getCookie(document.cookie);
        if (key === "oauth" && value === true) {
          dispatch(OauthUser());
        }
      }
    }, [dispatch, history]);

    return <Component />;
  }
  return AuthenticationCheck;
}

export default Auth;
