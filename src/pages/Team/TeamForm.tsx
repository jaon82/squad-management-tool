import React, { KeyboardEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import ChipInput from "material-ui-chip-input";

import PlayerCard from "./PlayerCard";

import Team from "../../helpers/Team";
import Player from "../../helpers/Player";
import Props from "../../helpers/Props";
import Formation from "./Formation";

import api from "../../services/api";
import CustomAlert from "../../components/CustomAlert";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: 20,
  },
  marginTopSquad: {
    marginTop: 50,
  },
  sectionTitle: {
    color: "#8c8c8c",
    textTransform: "uppercase",
    textAlign: "center",
  },
  formationFormControl: {
    display: "flex",
    flexDirection: "row",
  },
  formationLabel: {
    width: 110,
  },
  formationSelect: {
    width: 200,
  },
  field: {
    background: "linear-gradient(0deg, #6f0084, #cb0074)",
    height: "80vh",
  },
  fullHeight: {
    height: "100%",
  },
  tagInput: {
    alignItems: "flex-start",
    alignContent: "flex-start",
  },
  playersContainer: {
    maxHeight: "90vh",
    overflowY: "auto",
  },
  hide: {
    display: "none",
  },
  chip: {
    backgroundColor: "#d60030",
    color: "#fff",
    "& svg": {
      color: "#fff",
    },
  },
}));

interface RouteParams {
  id: string;
}

type AlertTypes = "warning" | "error" | "success" | "info" | undefined;

export default function TeamForm(props: Props) {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<RouteParams>();
  const formations = [
    "3 - 2 - 2 - 3",
    "3 - 2 - 3 - 2",
    "3 - 4 - 3",
    "3 - 5 - 2",
    "4 - 2 - 3 - 1",
    "4 - 3 - 2 - 1",
    "4 - 3 - 3",
    "4 - 4 - 2",
    "4 - 5 - 1",
    "5 - 4 - 1",
  ];
  const [players, setPlayers] = useState<Player[]>([]);
  const [disabledPlayers, setDisabledPlayers] = useState<number[]>([]);
  const [squad, setSquad] = useState<Player[]>(Array(11));
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertTypes>();
  const [showLoader, setShowLoader] = useState(false);
  const [search, setSearch] = useState("");

  const defaultValues = {
    name: "",
    description: "",
    website: "",
    type: "",
    tags: [],
    formation: "",
  };

  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string(),
    website: yup.string().url().required(),
    type: yup
      .mixed()
      .oneOf(["real", "fantasy"] as const)
      .required(),
    tags: yup.array().of(yup.string()),
  });

  const { handleSubmit, errors, control, reset } = useForm<Team>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (params.id) {
      const team = props.teams.find((team) => team.id === Number(params.id));
      if (!team) {
        history.push("/");
      } else {
        const defaultValues = {
          name: team.name,
          description: team.description,
          website: team.website,
          type: team.type,
          tags: team.tags,
          formation: team.formation,
        };
        reset(defaultValues);
        if (team.squad) {
          setSquad(team.squad);
        }
      }
    }
  }, [history, params.id, props.teams, reset]);

  const squadIsEmpty = () => {
    const players = squad.reduce(
      (sum, player) => sum + (player?.player_id ? 1 : 0),
      0
    );
    return !players;
  };

  const validSquad = () => {
    let valid = true;
    for (let player of squad) {
      if (!player) {
        valid = false;
      }
    }
    return squadIsEmpty() || valid;
  };

  const onSubmit = (teamData: Team) => {
    teamData.id = params.id ? Number(params.id) : Date.now();
    if (!validSquad()) {
      setAlertMessage("Please fill all positions before save.");
      setAlertType("warning");
      setOpenAlert(true);
      return;
    }
    if (squadIsEmpty()) {
      teamData.squad = [];
    } else {
      teamData.squad = squad;
    }
    if (params.id) {
      const teamIndex = props.teams.findIndex(
        (team) => team.id === teamData.id
      );
      const teams = [...props.teams];
      teams[teamIndex] = teamData;
      props.updateTeams(teams);
    } else {
      const teams = [...props.teams, teamData];
      props.updateTeams(teams);
    }
    history.push("/");
  };

  const searchPlayer = () => {
    const playerName = search.trim();
    if (playerName) {
      setShowLoader(true);
      setPlayers([]);
      api
        .get(`players/search/${playerName}`)
        .then((response) => {
          if (response.data.api.results) {
            let apiPlayers: Player[] = response.data.api.players;
            apiPlayers = apiPlayers.filter(
              (item) => !disabledPlayers.includes(item.player_id)
            );
            setPlayers(apiPlayers);
          } else {
            if (response.data.api.players?.length === 0) {
              setAlertMessage("Player not found");
              setAlertType("warning");
              setOpenAlert(true);
            } else if (response.data.api.error) {
              setAlertMessage(response.data.api.error);
              setAlertType("error");
              setOpenAlert(true);
            }
          }
          setShowLoader(false);
          setSearch("");
        })
        .catch((error) => {
          setSearch("");
          setShowLoader(false);
          setAlertMessage("Server error.");
          setAlertType("error");
          setOpenAlert(true);
        });
    }
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchPlayer();
    }
  };

  const disablePlayer = (idPlayer: number) => {
    let actualPlayers = [...players];
    actualPlayers = actualPlayers.filter((item) => item.player_id !== idPlayer);
    setPlayers(actualPlayers);
    setDisabledPlayers((prevState) => {
      return [...prevState, idPlayer];
    });
  };

  const updateSquad = (squad: Player[]) => {
    setSquad(squad);
  };

  const alertClose = () => {
    setOpenAlert(false);
  };

  return (
    <Card>
      <CardHeader
        title="Create your team"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={2}
          >
            <Grid item xs={12}>
              <Typography variant="h6" className={classes.sectionTitle}>
                Team Information
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justify="space-around"
              alignItems="stretch"
            >
              <Grid item xs={12} sm={5}>
                <Controller
                  render={(props) => (
                    <FormControl fullWidth size="small" error={!!errors.name}>
                      <FormLabel>Team name</FormLabel>
                      <OutlinedInput
                        placeholder="Insert team name"
                        onChange={(e) => props.onChange(e.target.value)}
                        value={props.value}
                      />
                    </FormControl>
                  )}
                  name="name"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Controller
                  render={(props) => (
                    <FormControl
                      fullWidth
                      size="small"
                      error={!!errors.website}
                    >
                      <FormLabel>Team website</FormLabel>
                      <OutlinedInput
                        placeholder="http://myteam.com"
                        type="url"
                        onChange={(e) => props.onChange(e.target.value)}
                        value={props.value}
                      />
                    </FormControl>
                  )}
                  name="website"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={5} className={classes.marginTop}>
                <Controller
                  render={(props) => (
                    <FormControl fullWidth size="small">
                      <FormLabel>Description</FormLabel>
                      <OutlinedInput
                        multiline
                        rows={12}
                        onChange={(e) => props.onChange(e.target.value)}
                        value={props.value}
                      />
                    </FormControl>
                  )}
                  name="description"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={5} className={classes.marginTop}>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
                  className={classes.fullHeight}
                >
                  <Grid item>
                    <Controller
                      render={(props) => (
                        <FormControl
                          fullWidth
                          size="small"
                          error={!!errors.type}
                        >
                          <FormLabel>Team type</FormLabel>
                          <RadioGroup
                            aria-label="type"
                            row
                            onChange={(e) => props.onChange(e.target.value)}
                            value={props.value}
                          >
                            <FormControlLabel
                              value="real"
                              control={<Radio />}
                              label="Real"
                            />
                            <FormControlLabel
                              value="fantasy"
                              control={<Radio />}
                              label="Fantasy"
                            />
                          </RadioGroup>
                        </FormControl>
                      )}
                      name="type"
                      control={control}
                    />
                  </Grid>
                  <Grid item xs>
                    <Controller
                      render={(props) => (
                        <FormControl
                          fullWidth
                          size="small"
                          className={classes.fullHeight}
                        >
                          <FormLabel>Tags</FormLabel>
                          <ChipInput
                            fullWidth
                            fullWidthInput
                            newChipKeyCodes={[191]}
                            variant="outlined"
                            classes={{
                              root: classes.fullHeight,
                              inputRoot: classes.tagInput,
                              chipContainer: classes.fullHeight,
                              chip: classes.chip,
                            }}
                            onChange={(chips) => props.onChange(chips)}
                            defaultValue={props.value}
                          />
                        </FormControl>
                      )}
                      name="tags"
                      control={control}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.marginTopSquad}>
              <Typography variant="h6" className={classes.sectionTitle}>
                Configure Squad
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justify="space-around"
              alignItems="stretch"
            >
              <Grid item xs={12} sm={5}>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
                >
                  <Grid item>
                    <Controller
                      render={(props) => (
                        <FormControl
                          fullWidth
                          size="small"
                          className={classes.formationFormControl}
                        >
                          <FormLabel className={classes.formationLabel}>
                            Formation
                          </FormLabel>
                          <Select
                            variant="outlined"
                            className={classes.formationSelect}
                            onChange={(e) => {
                              setSquad(Array(11));
                              props.onChange(e.target.value);
                            }}
                            value={props.value}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            {formations.map((item) => (
                              <MenuItem value={item} key={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                      name="formation"
                      control={control}
                    />
                  </Grid>
                  <Grid item className={clsx(classes.marginTop, classes.field)}>
                    <Formation
                      control={control}
                      players={players}
                      disablePlayer={disablePlayer}
                      squad={squad}
                      updateSquad={updateSquad}
                    />
                  </Grid>
                  <Grid item className={classes.marginTop}>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large"
                      fullWidth
                      type="submit"
                    >
                      Save
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Grid
                  container
                  direction="column"
                  justify="flex-start"
                  alignItems="stretch"
                >
                  <Grid item>
                    <FormControl fullWidth size="small">
                      <FormLabel>Search Players</FormLabel>
                      <OutlinedInput
                        placeholder="Ronal"
                        onChange={(event) => setSearch(event.target.value)}
                        onBlur={searchPlayer}
                        onKeyPress={onKeyPressHandler}
                        value={search}
                      />
                    </FormControl>
                  </Grid>
                  <Grid
                    item
                    className={clsx(
                      classes.marginTop,
                      classes.playersContainer
                    )}
                  >
                    <LinearProgress
                      className={clsx({ [classes.hide]: !showLoader })}
                    />
                    {players.map((player) => (
                      <PlayerCard data={player} key={player.player_id} />
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <CustomAlert
        open={openAlert}
        message={alertMessage}
        type={alertType}
        close={alertClose}
      />
    </Card>
  );
}
