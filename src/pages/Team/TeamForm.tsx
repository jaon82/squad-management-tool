import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import PlayerCard from "./PlayerCard";
import Player from "../../helpers/Player";

const useStyles = makeStyles((theme) => ({
  form: {},
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
}));

interface Team {
  id: number;
  name: string;
  description: string;
  website: string;
  type: string;
  tags: string[];
}

const defaultValues = {
  name: "",
  description: "",
  website: "",
  type: "",
  tags: [],
};

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  website: yup.string().required(),
  type: yup.string().required(),
  tags: yup.string(),
});

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

export default function TeamForm() {
  const classes = useStyles();

  const { handleSubmit, errors, control, reset } = useForm<Team>({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (data: Team) => console.log(data);

  return (
    <Card>
      <CardHeader
        title="Create your team"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
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
                  as={
                    <FormControl fullWidth size="small">
                      <FormLabel>Team name</FormLabel>
                      <OutlinedInput placeholder="Insert team name" />
                    </FormControl>
                  }
                  name="name"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Controller
                  as={
                    <FormControl fullWidth size="small">
                      <FormLabel>Team website</FormLabel>
                      <OutlinedInput
                        placeholder="http://myteam.com"
                        type="url"
                      />
                    </FormControl>
                  }
                  name="website"
                  control={control}
                />
              </Grid>
              <Grid item xs={12} sm={5} className={classes.marginTop}>
                <Controller
                  as={
                    <FormControl fullWidth size="small">
                      <FormLabel>Description</FormLabel>
                      <OutlinedInput multiline rows={12} />
                    </FormControl>
                  }
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
                >
                  <Grid item>
                    <Controller
                      as={
                        <FormControl fullWidth size="small">
                          <FormLabel>Team type</FormLabel>
                          <RadioGroup aria-label="type" row>
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
                      }
                      name="description"
                      control={control}
                    />
                  </Grid>
                  <Grid item>
                    <Controller
                      as={
                        <FormControl fullWidth size="small">
                          <FormLabel>Tags</FormLabel>
                          <OutlinedInput multiline rows={8} />
                        </FormControl>
                      }
                      name="description"
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
                      as={
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
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                          </Select>
                        </FormControl>
                      }
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
