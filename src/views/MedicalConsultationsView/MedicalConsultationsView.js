import React, { useState, useEffect } from "react";
import {
  ListItemText,
  ListItem,
  List,
  Grid,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  IconButton,
  Tooltip,
  Divider,
  InputBase,
  Typography,
} from "@mui/material";
import { ArrowForward, MedicalServices } from "@mui/icons-material";
import ContentCardView from "src/components/ContentCardView/ContentCardView";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getBeneficiaryList } from "src/redux/actions/beneficiaryActions";
import { BENEFICIARY_LIST_RESET } from "src/redux/constants/beneficiaryConstants";
import { showModal } from "src/redux/actions/modalActions";
import NewAppointment from "./components/NewAppointment";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const array = [
  {
    name: "Pedro Arguelles",
    url: "/static/images/avatar/1.jpg",
    doctor: "jose aguilar",
    especialidad: "urologo",
  },
  {
    name: "Pedro Arguelles",
    url: "/static/images/avatar/1.jpg",
    doctor: "jose aguilar",
    especialidad: "urologo",
  },
  {
    name: "Pedro Arguelles",
    url: "/static/images/avatar/1.jpg",
    doctor: "jose aguilar",
    especialidad: "urologo",
  },
  {
    name: "Pedro Arguelles",
    url: "/static/images/avatar/1.jpg",
    doctor: "jose aguilar",
    especialidad: "urologo",
  },
  {
    name: "Pedro Arguelles",
    url: "/static/images/avatar/1.jpg",
    doctor: "jose aguilar",
    especialidad: "urologo",
  },
  {
    name: "Pedro Arguelles",
    url: "/static/images/avatar/1.jpg",
    doctor: "jose aguilar",
    especialidad: "urologo",
  },
];
export default function MedicalConsultations() {
  const dispatch = useDispatch();

  const [beneficiaries, setBeneficiaries] = useState([]);

  const { loadingBeneficiaryList, successBeneficiaryList, beneficiaryList } =
    useSelector((state) => state.beneficiaryList);

  useEffect(() => {
    dispatch(getBeneficiaryList());

    return () => {
      dispatch({ type: BENEFICIARY_LIST_RESET });
    };
  }, []);
  useEffect(() => {
    if (successBeneficiaryList) {
      setBeneficiaries(beneficiaryList);
    }
  }, [successBeneficiaryList]);

  const handleNewAppointment = () => {
    dispatch(showModal({ open: true, title: "", content: <NewAppointment /> }));
  };

  return (
    <ContentCardView
      title="Consultas"
      subtitle="Crear y gestionar citas"
      Icon={<MedicalServices />}
    >
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <List
            dense
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              maxHeight: "calc(100vh - 260px)",
              overflowY: "auto",
            }}
          >
            {beneficiaries?.map((beneficiary) => {
              const labelId = `checkbox-list-secondary-label-${beneficiary.name}`;
              return (
                <ListItem
                  key={beneficiary._id}
                  secondaryAction={
                    <Tooltip title="Crear Cita">
                      <IconButton onClick={handleNewAppointment}>
                        <ArrowForward />
                      </IconButton>
                    </Tooltip>
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt={beneficiary.name} src={``} />
                    </ListItemAvatar>
                    <ListItemText
                      id={labelId}
                      primary={`${beneficiary.name} ${beneficiary.lastName}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Grid item xs={12} sm={6}>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              maxHeight: "calc(100vh - 260px)",
              overflowY: "auto",
            }}
          >
            {array.map((item, index) => {
              return (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={item.url} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          Dr: {item.doctor}
                        </Typography>
                        <span style={{ display: "block" }}>
                          Especialidad: {item.especialidad}
                        </span>
                      </React.Fragment>
                    }
                  />
                  <Divider variant="inset" component="li" />
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </ContentCardView>
  );
}
