import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Add from "@material-ui/icons/Add";
import MaterialTable, { MTableBodyRow } from "material-table";

import Dialog from "../../components/Dialog";

import Props from "../../helpers/Props";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: "100%",
      background: "#fff",
    },
    row: {
      "& .MuiIcon-root": {
        visibility: "hidden",
      },
      "&:hover .MuiIcon-root": {
        visibility: "visible",
      },
      "&:hover, &:hover .MuiIcon-root": {
        backgroundColor: "#f9ebf6",
        color: "#c00077",
        fontWeight: 500,
      },
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
  const [teamToRemove, setTeamToRemove] = useState(0);

  const deleteTeam = (teamName: string, id: number) => {
    setTeamToRemove(id);
    setDialogText(`Do you want to remove team ${teamName}?`);
    setDialogOpen(true);
  };

  const dialogClose = () => {
    setDialogOpen(false);
  };

  const dialogConfirm = () => {
    setDialogOpen(false);
    const teamIndex = props.teams.findIndex((team) => team.id === teamToRemove);
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
          {
            title: "Name",
            field: "name",
            customSort: (a, b) => a.name.localeCompare(b.name),
          },
          {
            title: "Description",
            field: "description",
            customSort: (a, b) => a.description.localeCompare(b.description),
          },
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
            onClick: (event, rowData: any) =>
              deleteTeam(rowData.name, rowData.id),
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
        localization={{ header: { actions: "" } }}
        components={{
          Row: (props) => <MTableBodyRow {...props} className={classes.row} />,
        }}
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
