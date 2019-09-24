import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        overlay: {
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            backgroundColor: `rgba(0, 0, 0, 0.2)`,
            zIndex: 1000
        }
    })
)

const Progress: React.FC = () => {
    const classes = useStyles();

    return <div className={classes.overlay}>
        <CircularProgress />
    </div>
}

export {
    Progress
}