import React, { useEffect } from "react";
import { Container, Card, CardContent, CardActions, Button, Typography, Grid, Theme, CardHeader } from "@material-ui/core";
import { State } from "../../store/store";
import { connect } from "react-redux";
import { isItemsLoaded, isItemInCart } from "../../selectors/itemSelectors";
import { IItem } from "../../../../_models/item";
import { stateActions } from "../../stateActions/stateActions";
import { makeStyles, createStyles } from "@material-ui/styles";
import { ICart } from "../../../../_models/cart";
import { history } from "../../util/history";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            width: 200
        },
        container: {
            marginTop: 10
        }
    })
);

interface ItemListProps {
    isItemsLoaded: boolean;
    items: IItem[];
    userId: string;
    cart: ICart;
    lockControls: boolean;
}

const ItemList: React.FC<ItemListProps> = (props) => {
    const classes = useStyles();

    // Fetch all items on mount once
    useEffect(() => {
        (async () => {
            await stateActions.loadItems();
        })();
    }, []);

    // Add item to cart, after wich fetch the updated cart
    const addToCart = async (item: IItem) => {
        await stateActions.addItemToCart(props.userId, item);
        await stateActions.getCart(props.userId);
    }

    const toCart = () => {
        history.push("/cart");
    }

    return (
        <Container className={classes.container}>
            <Grid container spacing={2} justify="space-evenly">
                {props.isItemsLoaded && props.items.map((item: IItem, index: number) => {
                    const isInCart = isItemInCart(item, props.cart);

                    return (
                        <Grid item key={index}>
                            <Card className={classes.card}>
                                <CardHeader title={item.itemName}>
                                </CardHeader>
                                <CardContent>
                                    <Typography color="secondary">
                                        {`${item.price} $`}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button disabled={props.lockControls} variant="contained" color={isInCart ? "primary" : "secondary"} fullWidth onClick={() => { isInCart ? toCart() : addToCart(item) }}>
                                        {isInCart ? "To Cart" : "Buy"}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    );
}

const mapStateToProps = (state: State) => {
    return {
        items: state.itemReducer.items,
        isItemsLoaded: isItemsLoaded(state),
        userId: state.globalReducer.userId,
        cart: state.cartReducer.cart,
        lockControls: state.globalReducer.lockControls
    }
}

const ConnectedItemList = connect(mapStateToProps)(ItemList);

export { ConnectedItemList as ItemList }