import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Add from "@material-ui/icons/Add";
import MaterialTable from "material-table";

import Dialog from "../../components/Dialog";

import Props from "../../helpers/Props";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100%",
      background: "#fff",
    },
  })
);

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

function MyTeams(props: Props) {
  const classes = useStyles();
  const history = useHistory();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const [teamToRemove, setTeamToRemove] = useState("");

  const deleteTeam = (teamName: string) => {
    setTeamToRemove(teamName);
    setDialogText(`Do you want to remove team ${teamName}?`);
    setDialogOpen(true);
  };

  const dialogClose = () => {
    setDialogOpen(false);
  };

  const dialogConfirm = () => {
    setDialogOpen(false);
    const teamIndex = props.teams.findIndex(
      (team) => team.name === teamToRemove
    );
    if (teamIndex !== -1) {
      let teams = [...props.teams];
      teams.splice(teamIndex, 1);
      props.updateTeams(teams);
    }
  };

  return (
    <div className={classes.root}>
      <MaterialTable
        title="My teams"
        columns={[
          { title: "Name", field: "name" },
          { title: "Description", field: "description" },
        ]}
        data={props.teams}
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
            onClick: (event, rowData: any) => deleteTeam(rowData.name),
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
              history.push(`/team/${rowData.name}`),
          },
        ]}
      />
      <Dialog
        open={dialogOpen}
        close={dialogClose}
        confirm={dialogConfirm}
        title="Remove team?"
        text={dialogText}
      />
    </div>
  );
}

export default MyTeams;
