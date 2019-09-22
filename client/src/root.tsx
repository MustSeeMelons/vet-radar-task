import React, { useEffect, useState } from 'react';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Container } from '@material-ui/core';
import { Router, Route } from 'react-router-dom';
import { history } from './util/history';
import { ItemList } from './components/itemList/itemList';
import { stateActions } from './stateActions/stateActions';
import { connect } from 'react-redux';
import { State } from './store/store';
import { isCartLoaded } from './selectors/cartSelectors';
import { Cart } from './components/cart/cart';
import { Progress } from './components/progress/progress';
import { ErrorInfo } from './components/errorInfo/errorInfo';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            flexGrow: 1,
            padding: 0,
            margin: 0
        },
        container: {
            flexGrow: 1,
            padding: 5
        }
    })
);

interface RootProps {
    userId: string;
    isCartLoaded: boolean;
    lockControls: boolean;
    err: boolean;
}

const Root: React.FC<RootProps> = (props) => {
    const [cartLoadLock, setCartLoadLock] = useState(false);

    const classes = useStyles();

    // Get a user id
    useEffect(() => {
        stateActions.handleSessionSetup();

    }, [])

    // Load the users cart only when we have a user and no cart
    useEffect(() => {
        if (props.userId && !props.isCartLoaded && !cartLoadLock) {
            setCartLoadLock(true);
            stateActions.getCart(props.userId);
        }
    }, [props.userId, props.isCartLoaded, cartLoadLock]);

    return (
        <Container id="rootContainer" className={classes.root} maxWidth={false}>
            {props.lockControls && <Progress />}
            <Router history={history}>
                <Header />
                <Container id="content" className={classes.container}>
                    {props.err && <ErrorInfo />}
                    <Route path="/" exact component={ItemList} />
                    <Route path="/cart" component={Cart} />
                </Container>
                <Footer />
            </Router>
        </Container >
    );
}

const mapStateToProps = (state: State) => {
    return {
        userId: state.globalReducer.userId,
        isCartLoaded: isCartLoaded(state),
        lockControls: state.globalReducer.lockControls,
        err: state.globalReducer.err
    }
}

const ConnectedRoot = connect(mapStateToProps)(Root)

export default ConnectedRoot;
