import Player from "./Player";

export default interface Team {
  id: number;
  name: string;
  description: string;
  website: string;
  type: string;
  tags: string[];
  formation: string;
  squad: Player[];
}
