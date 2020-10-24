import Team from "./Team";

export default interface Props {
  teams: Team[];
  updateTeams: (teams: Team[]) => void;
}
