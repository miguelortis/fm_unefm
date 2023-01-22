import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Fab,
  Grid,
} from "@mui/material";
import { Add, PermContactCalendar } from "@mui/icons-material";
import { blue, red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "src/redux/actions/modalActions";
import RoleRegistrationForm from "./components/RoleRegistrationForm";
import { ROLE_LIST_RESET } from "src/redux/constants/roleConstants";
import { getRoleList } from "src/redux/actions/roleActions";

const columns = [{ label: "Nombre del Rol" }];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

export default function AssignRoleView() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [roles, setRoles] = useState([]);

  const { loadingRoleList, successRoleList, roleList } = useSelector(
    (state) => state.roleList
  );
  const { loadingRoleRegister, successRoleRegister, roleRegister } =
    useSelector((state) => state.registeredRoleData);
    
  useEffect(() => {
    dispatch(getRoleList());
    return () => {
      dispatch({ type: ROLE_LIST_RESET });
    };
  }, []);
  useEffect(() => {
    if (successRoleList) {
      setRoles(roleList);
    }
  }, [successRoleList]);
  useEffect(() => {
    if (successRoleRegister) {
      setRoles([...roles, roleRegister]);
    }
  }, [successRoleRegister]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddRole = () => {
    dispatch(
      showModal({
        open: true,
        title: "Agregar nuevo rol",
        content: <RoleRegistrationForm />,
      })
    );
  };

  return (
    <>
      <Grid container spacing={2}></Grid>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              avatar={
                <Avatar
                  variant="rounded"
                  sx={{ bgcolor: blue[300] }}
                  aria-label="recipe"
                >
                  <PermContactCalendar />
                </Avatar>
              }
              action={
                <Fab
                  sx={{ mr: 2 }}
                  color="primary"
                  size="small"
                  aria-label="add"
                  onClick={handleAddRole}
                >
                  <Add />
                </Fab>
              }
              title="Administrar Roles"
              titleTypographyProps={{ fontSize: 20 }}
              subheader="Puedes crear y editar roles"
            />
            <CardContent>
              <TableContainer sx={{ maxHeight: "calc(100vh - 250px)" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((value, i) => (
                        <TableCell key={i} align={"left"}>
                          {value.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {roles.map((role, i) => {
                      return (
                        <TableRow key={i} hover role="checkbox" tabIndex={-1}>
                          <TableCell align={"left"}>{role.name}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={roles.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
