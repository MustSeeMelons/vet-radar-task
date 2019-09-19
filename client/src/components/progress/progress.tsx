import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        circularProgress: {
            margin: "auto",
            width: "100%",
            height: "100%"
        }
    })
)

const Progress: React.FC = () => {
    const classes = useStyles();

    return <CircularProgress className={classes.circularProgress} />
}

export {
    Progress
}