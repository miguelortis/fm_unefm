import { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../contexts/Context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Socket from "../components/Socket";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePic, userInfo } from "src/redux/actions/userActions";

// const CancelToken = axios.CancelToken
// const source = CancelToken.source()
const useIsLogin = () => {
  const dispatch = useDispatch();
  const { successUserLogin } = useSelector((state) => state.userAuth);
  const { loadingUserInfo, successUserInfo, currentUser } = useSelector(
    (state) => state.user
  );
  const history = useHistory();

  const getDataToUpdate = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_RENEWAL_TEST_URL}/oldUser/user`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("oldUserToken")}`,
          },
        }
      );
      dispatch({
        type: "SAVE_USER",
        payload: data.content,
      });
    } catch (error) {
      //console.log(error)
      if (
        error?.response?.status === 401 &&
        !!localStorage.getItem("oldUserToken")
      ) {
        localStorage.removeItem("oldUserToken");
        dispatch({
          type: "RESET_LOGOUT",
        });
        history.push("/");
      }
    }
  };

  /////////////////SOLICITUD DATOS USUARIO /////////////////////////https://backend-fmunefm.herokuapp.com/
  useEffect(() => {
    if (!!localStorage.getItem("token") && successUserInfo === undefined) {
      dispatch(userInfo());
    } else if (
      !!localStorage.getItem("oldUserToken") &&
      successUserInfo === undefined
    ) {
      getDataToUpdate();
    }
  }, [successUserLogin]);
  useEffect(() => {
    if (successUserInfo) {
      dispatch(getProfilePic());
    }
  }, [currentUser]);

  /////////////PACKAGES////////////////////////////
  useEffect(() => {
    const handlePackages = async () => {
      try {
        const { data } = await axios.get(
          "https://backend-fmunefm.herokuapp.com/package/datas",
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch({
          type: "SET_ PACKAGES",
          payload: data,
        });
      } catch (error) {
        if (error?.response?.status === 401) {
          console.log(error);
        }
      }
    };
    if (
      !!localStorage.getItem("token") &&
      currentUser?.role?.options?.find((role) => role.code === 12)
    ) {
      handlePackages();
    }
  }, [dispatch, successUserInfo]);
  //////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////////
};

export default useIsLogin;
