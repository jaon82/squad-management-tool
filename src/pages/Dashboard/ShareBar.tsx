import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

import Team from "../../helpers/Team";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1),
    },
    shareButton: {
      margin: theme.spacing(0, 1),
    },
  })
);

interface Props {
  team?: Team;
}

export default function ShareBar({ team }: Props) {
  const classes = useStyles();
  const shareUrl = `${team?.website}`;
  const title = team?.name;

  return (
    <div className={classes.root}>
      <FacebookShareButton
        url={shareUrl}
        quote={title}
        className={classes.shareButton}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton
        url={shareUrl}
        title={title}
        className={classes.shareButton}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <TelegramShareButton
        url={shareUrl}
        title={title}
        className={classes.shareButton}
      >
        <TelegramIcon size={32} round />
      </TelegramShareButton>

      <WhatsappShareButton
        url={shareUrl}
        title={title}
        separator=":: "
        className={classes.shareButton}
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <LinkedinShareButton url={shareUrl} className={classes.shareButton}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
}
