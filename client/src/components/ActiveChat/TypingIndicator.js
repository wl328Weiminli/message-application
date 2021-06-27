import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FiberManualRecordRoundedIcon from "@material-ui/icons/FiberManualRecordRounded";

const useStyles = makeStyles(() => ({
  sizeOfTheIcon: {
    fontSize: 15,
    color: "rgba(192,192,192, 0.4)",
    opacity: "0.8",
  },
}));

const TypingIndicator = () => {
  const classes = useStyles();
  return (
    <Box>
      <FiberManualRecordRoundedIcon className={classes.sizeOfTheIcon} />
      <FiberManualRecordRoundedIcon className={classes.sizeOfTheIcon} />
      <FiberManualRecordRoundedIcon className={classes.sizeOfTheIcon} />
    </Box>
  );
};

export default TypingIndicator;
