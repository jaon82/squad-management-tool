import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Add from "@material-ui/icons/Add";
import MaterialTable from "material-table";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100%",
      background: "#fff",
    },
  })
);

interface Data {
  id: number;
  name: string;
  description: string;
}

const rows: Data[] = [
  { id: 1, name: "Barcelona", description: "Barcelona Squad" },
  { id: 2, name: "Real Madrid", description: "Real Madrid Squad" },
  { id: 3, name: "Milan", description: "Milan Squad" },
  { id: 4, name: "Liverpool", description: "Liverpool Squad" },
  { id: 5, name: "Bayern Munich", description: "Bayern Munich Squad" },
  { id: 6, name: "Lazio Munich", description: "Lazio Munich Squad" },
];

function AddBoxLarge() {
  return (
    <Add
      fontSize="large"
      style={{
        color: "#fff",
        background: "-webkit-linear-gradient(#620089, #97006b)",
        borderRadius: 10,
      }}
    />
  );
}

function MyTeams() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <MaterialTable
        title="My teams"
        columns={[
          { title: "Name", field: "name" },
          { title: "Description", field: "description" },
        ]}
        data={rows}
        options={{
          sorting: true,
          search: false,
          minBodyHeight: "100%",
          actionsColumnIndex: -1,
          pageSize: 10,
          pageSizeOptions: [10],
        }}
        actions={[
          {
            icon: AddBoxLarge,
            tooltip: "Add Team",
            isFreeAction: true,
            onClick: (event) => history.push("/team"),
          },
          {
            icon: "delete",
            tooltip: "Delete",
            onClick: (event, rowData: any) =>
              alert("You delete " + rowData.name),
          },
          {
            icon: "share",
            tooltip: "Share",
            onClick: (event, rowData: any) =>
              alert("You share " + rowData.name),
          },
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (event, rowData: any) =>
              history.push(`/team/${rowData.id}`),
          },
        ]}
      />
    </div>
  );
}

export default MyTeams;
