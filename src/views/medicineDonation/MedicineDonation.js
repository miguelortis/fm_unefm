import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonalInformation from "./step/PersonalInformation";
import FamilyData from "./step/FamilyData";
import PackagesAndTerms from "./step/PackagesAndTerms";
import { useDispatch, useSelector } from "react-redux";
import logoFM from "src/assets/images/logoFMW.png";
import RequestUS from "src/utils/RequestUS";
import { TYPES } from "src/redux/constants/loadingConstants";
import checkFormInput from "src/utils/checkFormInput";
import message from "src/components/commons/message";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      ©
      <Link color="inherit" href="/">
        {" Fondo Mutual UNEFM "}
      </Link>{" "}
      1995 - {new Date().getFullYear()} Todos Los Derechos Reservados.
    </Typography>
  );
}

const theme = createTheme();

export default function MedicineDonation() {
  const CurrentUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userDataToUpdate, setUserDataToUpdate] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [newBeneficiaries, setNewBeneficiaries] = useState([]);
  /* const error = () => {
    for (const property in userDataToUpdate) {
      const element = document.getElementById(`${property}`)
      if(!userDataToUpdate[property] && userDataToUpdate[property] !== 'phone'){
        element.classList.add("error-input")
        setTimeout(() => {
          element && element.classList.remove("error-input")
        }, 4000);
        return true
      }
    }
    return false
  } */

  const steps = [
    "Información personal",
    "Datos de los familiares",
    "Plan de cobertura",
  ];

  function getStepContent(step, setUserDataToUpdate, userDataToUpdate) {
    switch (step) {
      case 0:
        return (
          <PersonalInformation
            title={steps[step]}
            setUserDataToUpdate={setUserDataToUpdate}
            userDataToUpdate={userDataToUpdate}
          />
        );
      case 1:
        return (
          <FamilyData
            title={steps[step]}
            setUserDataToUpdate={setUserDataToUpdate}
            userDataToUpdate={userDataToUpdate}
            beneficiaries={beneficiaries}
            setBeneficiaries={setBeneficiaries}
            newBeneficiaries={newBeneficiaries}
            setNewBeneficiaries={setNewBeneficiaries}
          />
        );
      case 2:
        return (
          <PackagesAndTerms
            title={steps[step]}
            setUserDataToUpdate={setUserDataToUpdate}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = async () => {
    if (checkFormInput(userDataToUpdate)) {
      return message.error("Debe llenar todos los campos");
    }
    console.log(newBeneficiaries);
    /*  dispatch({ type: TYPES.SHOW_LOADING, payload: true })
   const res = await RequestUS.post(`/users`, userDataToUpdate)
   console.log(res)
   if(res.status === 200){
    message.success('Datos Actualizados')
    dispatch({ type: TYPES.SHOW_LOADING, payload: false })
    return setActiveStep(activeStep + 1);
   }else if(res.status === 400){
    dispatch({ type: TYPES.SHOW_LOADING, payload: false })
    return message.error(res.data.message)
   } */
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    if (!userDataToUpdate && CurrentUser) {
      const schema = {
        idCard: CurrentUser?.cedula,
        password: "",
        documentType: CurrentUser?.tipodocument,
        name: CurrentUser?.name,
        lastName: CurrentUser?.lastName,
        address: CurrentUser?.direccion,
        email: CurrentUser?.email,
        gender: CurrentUser?.sexo?.toUpperCase(),
        placeBirth: CurrentUser?.placeBirth,
        dateBirth: CurrentUser?.nacimiento,
        civilStatus: CurrentUser?.edocivil?.toUpperCase(),
        category: CurrentUser?.categoria?.toUpperCase(),
        personalType: CurrentUser?.tipopersonal?.toUpperCase(),
        phone: "",
      };
      setUserDataToUpdate(schema);
    }
  }, [CurrentUser]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <img style={{ width: "200px", margin: "5px 0" }} src={logoFM} />
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h5" align="center">
            Jornada de Medicinas
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(
                  activeStep,
                  setUserDataToUpdate,
                  userDataToUpdate
                )}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1
                      ? "Finalizar Registro"
                      : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
