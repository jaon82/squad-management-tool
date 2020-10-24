import React, { useEffect, useState } from "react";
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
import ChipInput from "material-ui-chip-input";

import PlayerCard from "./PlayerCard";

import Team from "../../helpers/Team";
import Player from "../../helpers/Player";
import Props from "../../helpers/Props";

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
}));

const players: Player[] = [
  {
    player_id: 154,
    player_name: "L. Messi",
    firstname: "Lionel Andrés",
    lastname: "Messi Cuccittini",
    number: null,
    position: "Attacker",
    age: 32,
    birth_date: "24/06/1987",
    birth_place: "Rosario",
    birth_country: "Argentina",
    nationality: "Argentina",
    height: "170 cm",
    weight: "72 kg",
  },
  {
    player_id: 90421,
    player_name: "Giuseppe Messina",
    firstname: "Giuseppe",
    lastname: "Messina",
    number: null,
    position: "Goalkeeper",
    age: 26,
    birth_date: "12/02/1993",
    birth_place: "Enna",
    birth_country: "Italy",
    nationality: "Italy",
    height: "186 cm",
    weight: "71 kg",
  },
  {
    player_id: 21849,
    player_name: "Messi Yagousseti Essomba",
    firstname: "Messi",
    lastname: "Yagousseti Essomba",
    number: null,
    position: "Attacker",
    age: 30,
    birth_date: "18/11/1989",
    birth_place: "Yaoundé",
    birth_country: "Cameroon",
    nationality: "Cameroon",
    height: "186 cm",
    weight: "90 kg",
  },
];

interface RouteParams {
  name: string;
}

export default function TeamForm(props: Props) {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams<RouteParams>();

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
    if (params.name) {
      const team = props.teams.find((team) => team.name === params.name);
      if (!team) {
        history.push("/");
      }
      const defaultValues = {
        name: team?.name,
        description: team?.description,
        website: team?.website,
        type: team?.type,
        tags: team?.tags,
        formation: team?.formation,
      };
      reset(defaultValues);
    }
  }, [history, params.name, props.teams, reset]);

  const onSubmit = (teamData: Team) => {
    const teamIndex = props.teams.findIndex(
      (team) => team.name === teamData.name
    );
    if (teamIndex !== -1 && !params.name) {
      alert("Team exists");
    } else if (teamIndex !== -1 && params.name) {
      const teams = [...props.teams];
      teams[teamIndex] = teamData;
      props.updateTeams(teams);
      history.push("/");
    } else {
      const teams = [...props.teams, teamData];
      props.updateTeams(teams);
      history.push("/");
    }
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
                            onChange={(e) => props.onChange(e.target.value)}
                            value={props.value}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      )}
                      name="formation"
                      control={control}
                    />
                  </Grid>
                  <Grid
                    item
                    className={clsx(classes.marginTop, classes.field)}
                  ></Grid>
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
                  <Grid item className={classes.marginTop}>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={() => {
                        history.push("/");
                      }}
                    >
                      Cancel
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
                      <OutlinedInput placeholder="Ronal" />
                    </FormControl>
                  </Grid>
                  <Grid item className={classes.marginTop}>
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
    </Card>
  );
}
