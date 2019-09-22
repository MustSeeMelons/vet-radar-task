import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography, makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: "100%",
            backgroundColor: theme.palette.error.light,
            textAlign: "center"
        }
    })
);

export const ErrorInfo: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid container alignContent="center" justify="center">
            <Grid item className={classes.container}>
                <Typography variant="h6" color="textSecondary">
                    We are experiancing some technical problems. Please try again later.
                </Typography>
            </Grid>
        </Grid>
    );
}