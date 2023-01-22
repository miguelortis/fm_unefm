import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilAccountLogout,
  cilSettings,
  cilTask,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import padre from "../../assets/images/avatars/padre.svg";
import madre from "../../assets/images/avatars/madre.svg";
import conyugeF from "../../assets/images/avatars/conyugeF.svg";
import conyugeM from "../../assets/images/avatars/conyugeM.svg";
import Socket from "../../components/Socket";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "src/redux/actions/userActions";
import calculateAge from "src/utils/calculateAge";
import { CircularProgress } from "@mui/material";
const AppHeaderDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { currentUser } = useSelector((state) => state.user);
  const { loadingProfilePic, successProfilePic, ProfilePicData } = useSelector(
    (state) => state.profilePic
  );

  const [picture, setPicture] = useState("");

  useEffect(() => {
    if (successProfilePic) {
      setPicture(ProfilePicData);
    }
  }, [successProfilePic, loadingProfilePic]);

  const handleLogout = () => {
    history.push("/");
    Socket.disconnect();
    dispatch(logout());
  };

  const age = calculateAge(currentUser?.user?.dateBirth);
  //
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={true}>
        <CAvatar
          src={
            loadingProfilePic
              ? ""
              : /*  : age < 50 && currentUser?.user?.sex === "MASCULINO"
              ? conyugeM
              : age < 50 && currentUser?.user?.sex === "FEMENINO"
              ? conyugeF
              : age > 50 && currentUser?.user?.sex === "MASCULINO"
              ? padre
              : age > 50 && currentUser?.user?.sex === "FEMENINO"
              ? madre */
                `data:image/png;base64,${picture}`
          }
          size="lg"
        >
          <CircularProgress color="inherit" />{" "}
        </CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Account
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilBell} className="me-2" />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilTask} className="me-2" />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCommentSquare} className="me-2" />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Settings
        </CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilCreditCard} className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilFile} className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem style={{ cursor: "pointer" }} onClick={handleLogout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Cerrar Sesión
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
