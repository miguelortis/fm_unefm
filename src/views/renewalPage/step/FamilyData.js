import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Delete, AddCircleOutline } from "@mui/icons-material";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { TYPES } from "src/redux/actions/modalAction";
import RegisterFamily from "src/components/registerFamily";
import Empty from "src/components/commons/Empty/Empty";
import Request from "src/utils/Request";
import RequestUS from "src/utils/RequestUS";
import checkFormInput from "src/utils/checkFormInput";
import TransferList from "src/components/commons/TransferList";
import message from "src/components/commons/message";

const relationShip = (key) => {
  switch (key) {
    case "Padre":
      return "PADRE";
    case "Madre":
      return "MADRE";
    case "Hijo con cedula":
      return "HIJO/A";
    case "Hijo sin cedula":
      return "HIJO/A";
    case "Hijo sin cedula":
      return "HIJO/A";
    case "Conyugue":
      return "CONYUGE";

    default:
      return key;
  }
};

export default function FamilyData({
  title,
  setUserDataToUpdate,
  userDataToUpdate,
  beneficiaries,
  setBeneficiaries,
  newBeneficiaries,
  setNewBeneficiaries,
}) {
  const [checked, setChecked] = useState([]);
  const currentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1 && value !== undefined) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  useEffect(() => {
    if (
      beneficiaries.length === 0 &&
      newBeneficiaries.length === 0 &&
      currentUser
    ) {
      const beneficiarySchemas = currentUser.afiliados.map((item, i) => {
        let names = item.nombre.replace(/[ ]+/g, " ");
        names = names.replace(/^ /, "");
        names = names.replace(/ $/, "");
        names = names.split(" ");
        const name = names.length === 2 ? names.slice(0, 1) : names.slice(0, 2);
        const lastName = names.length === 4 ? names.slice(-2) : names.slice(-1);
        return {
          id: `${i}${item.cedula}`,
          documentType: "V",
          idCard: `${item.cedula}`,
          name: name.toString().replace(/,/g, " "),
          lastName: lastName.toString().replace(/,/g, " "),
          relationship: relationShip(item.parentesco),
          placeBirth: "calle",
          gender: "",
          dateBirth: item.fecha,
          phone: "",
        };
      });
      setBeneficiaries(beneficiarySchemas);
    }
  }, [currentUser]);

  const handlerDelete = () => {
    if (checked.length > 0) {
      const relatives = userDataToUpdate.beneficiaries.filter(
        (relative) => !checked.includes(relative.idCard)
      );
      setUserDataToUpdate({ ...userDataToUpdate, beneficiaries: relatives });
    }
  };

  const handlerBeneficiaries = async (values, type) => {
    console.log(values);
    if (checkFormInput(values)) {
      message.error('Debe llenar los campos obligatorios "*"');
      return console.log(values);
    }
    if (values.relationship !== "HIJO/A") {
      if (
        newBeneficiaries.find(
          (el) =>
            el.relationship === values.relationship &&
            el.idCard !== values.idCard
        ) ||
        beneficiaries.find(
          (el) =>
            el.relationship === values.relationship &&
            el.idCard !== values.idCard
        )
      ) {
        return message.error(
          `Solo puede haber un usuario con el parentesco ${values.relationship}`
        );
      }
    }
    if (type === "new") {
      if (
        newBeneficiaries.find((el) => el.idCard === values.idCard) ||
        beneficiaries.find((el) => el.idCard === values.idCard)
      ) {
        return message.error("Ya existe este usuario en su carga familiar");
      } else {
        setNewBeneficiaries([
          ...newBeneficiaries,
          { ...values, id: `${values.idCard}${newBeneficiaries.length}` },
        ]);
      }
    } else {
      console.log(
        beneficiaries.map((beneficiary) =>
          beneficiary.id === values.id ? values : beneficiary
        )
      );
      setBeneficiaries(
        beneficiaries.map((beneficiary) =>
          beneficiary.id === values.id ? values : beneficiary
        )
      );
      setNewBeneficiaries(
        newBeneficiaries.map((beneficiary) =>
          beneficiary.id === values.id && type === "edit" ? values : beneficiary
        )
      );
    }
    handlerClose();
    /* return
    const res = await RequestUS.post(`/beneficiaries`, {values})
     */
  };
  const handlerClose = () => {
    dispatch({ type: TYPES.HIDDEN_MODAL });
  };

  const handlerADD = () => {
    dispatch({
      type: TYPES.SHOW_MODAL,
      payload: {
        title: "Agregar familiar",
        open: true,
        content: (
          <RegisterFamily
            type="new"
            valuesToCheck={[...newBeneficiaries, ...beneficiaries]}
            onChange={handlerBeneficiaries}
          />
        ),
      },
    });
  };

  const handlerEdit = (value) => {
    console.log(value);
    dispatch({
      type: TYPES.SHOW_MODAL,
      payload: {
        title: "Editar familiar",
        open: true,
        content: (
          <RegisterFamily
            type="edit"
            valuesToCheck={[...newBeneficiaries, ...beneficiaries]}
            value={value}
            onChange={handlerBeneficiaries}
          />
        ),
      },
    });
  };
  const handlerList = (left, right) => {
    setBeneficiaries(left);
    setNewBeneficiaries(right);
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Tooltip title="Agregar familiar" placement="top">
            <IconButton
              aria-label="add"
              size="large"
              color="primary"
              onClick={handlerADD}
            >
              <AddCircleOutline sx={{ fontSize: 30 }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      {/* {beneficiaries?.length <= 0 && <Empty text='Sin Beneficiarios'/>} */}
      <TransferList
        handleCloseModal={handlerClose}
        handlerEdit={handlerEdit}
        rightDefaults={newBeneficiaries}
        leftDefaults={beneficiaries}
        onChange={handlerList}
      />
      {/* <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {beneficiaries?.map((value, i) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem
              key={value?.idCard}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value?.idCard)}
                  checked={checked.indexOf(value?.idCard) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              }
              disablePadding
            >
              <ListItemButton onClick={()=>handleEdit(value)}>
                <ListItemAvatar>
                  <Avatar
                    alt={value?.name?.toUpperCase()}
                    src={``}
                  />
                </ListItemAvatar>
                <ListItemText sx={{width: '100px'}} id={labelId} primary={`${value?.documentType}- ${value?.idCard}`} />
                <ListItemText sx={{width: '200px'}} id={labelId} primary={value?.name} />
                <ListItemText sx={{width: '80px'}} id={labelId} primary={value?.relationship} />
                <ListItemText id={labelId} primary={value?.dateBirth} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List> */}
    </React.Fragment>
  );
}
FamilyData.propTypes = {
  title: PropTypes.string.isRequired,
  setUserDataToUpdate: PropTypes.func,
  userDataToUpdate: PropTypes.object,
  beneficiaries: PropTypes.array,
  setBeneficiaries: PropTypes.func,
  newBeneficiaries: PropTypes.array,
  setNewBeneficiaries: PropTypes.func,
};
