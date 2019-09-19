import React from "react";
import { AppBar, Grid, Typography } from "@material-ui/core";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Icon } from "@mdi/react";
import { mdiCopyright } from '@mdi/js'
import blue from '@material-ui/core/colors/lightBlue';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            top: "auto",
            bottom: 0,
        },
        grid: {
            margin: "10px"
        },
        svg: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginLeft: "5px"
        }
    }),
);


const Footer: React.FC = () => {
    const classes = useStyles();

    return (<AppBar position="static" className={classes.appBar}>
        <Grid className={classes.grid} container justify="center" alignContent="center">
            <Typography variant="h6">
                A truly beefy solution
            </Typography>
            <div className={classes.svg}>
                <Icon
                    path={mdiCopyright} title="Beefy Icon"
                    size={1}
                    color={blue.A100}
                />
            </div>

        </Grid>
    </AppBar>);
}

export { Footer }