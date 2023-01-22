import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { USER_LIST_RESET } from "src/redux/constants/userConstants";
import { getUserList } from "src/redux/actions/userActions";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Fab,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Add, Edit, PermContactCalendar } from "@mui/icons-material";
import { showModal } from "src/redux/actions/modalActions";
import RoleList from "./components/RoleList";
import Loading from "src/components/commons/Loading";

const columns = [
  { label: "Cedula", align: "left" },
  { label: "Nombres", align: "left" },
  { label: "Apellidos", align: "left" },
  { label: "Acciones", align: "right" },
];

export default function AssignRoleView() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [users, setUsers] = useState([]);

  const { loadingUserList, successUserList, userListData } = useSelector(
    (state) => state.userList
  );

  useEffect(() => {
    dispatch(getUserList());

    return () => {
      dispatch({ type: USER_LIST_RESET });
    };
  }, []);
  useEffect(() => {
    if (successUserList) {
      setUsers(userListData);
    }
  }, [successUserList]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleChangeRole = (values) => {
    dispatch(
      showModal({
        open: true,
        title: "Asignar rol",
        content: (
          <RoleList
            userInfo={values}
            setUsers={setUsers}
            setLoading={setLoading}
          />
        ),
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
              title="Asignar Roles"
              titleTypographyProps={{ fontSize: 20 }}
              subheader="Asigna y cambia el rol de cada usuario"
            />
            <CardContent>
              <TableContainer sx={{ maxHeight: "calc(100vh - 250px)" }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((value, i) => (
                        <TableCell key={i} align={value.align}>
                          <b>{value.label}</b>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((item, i) => {
                      return (
                        <TableRow key={i} hover role="checkbox" tabIndex={-1}>
                          <TableCell align={"left"}>
                            {item.user.idCard}
                          </TableCell>
                          <TableCell align={"left"}>{item.user.name}</TableCell>
                          <TableCell align={"left"}>
                            {item.user.lastName}
                          </TableCell>
                          <TableCell align={"right"}>
                            <Tooltip title="Asignar rol" placement="top">
                              <IconButton
                                onClick={() => handleChangeRole(item)}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {loading && <Loading />}
    </>
  );
}
