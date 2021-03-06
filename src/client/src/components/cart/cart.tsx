import React from "react";
import { Grid, Card, CardContent, Divider, Typography, CardHeader, Button, Theme, Box } from "@material-ui/core";
import { connect } from "react-redux";
import { State } from "../../store/store";
import { isCartEmpty } from "../../selectors/cartSelectors";
import { ICart, ICartItemQuantity } from "../../../../_models/cart";
import { makeStyles, createStyles } from "@material-ui/styles";
import { stateActions } from "../../stateActions/stateActions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        gridItem: {
            width: "50%"
        },
        cardHeader: {
            padding: 5,
            marginLeft: 20
        },
        cardContent: {
            padding: 0,
            margin: 20,
            "&:last-child": {
                padding: 0
            }
        },
        cardTexts: {
            width: 200
        },
        cardActions: {

        },
        cardButton: {
            margin: 5
        },
        itemGrid: {
            margin: 0,
            width: "100%"
        },
        countField: {
            width: 30
        },
        emptyItem: {
            paddingBottom: 15,
            paddingTop: 15
        },
        priceGrid: {
            padding: 10
        }
    })
);

interface CartProps {
    cart: ICart;
    isCartEmpty: boolean;
    userId: string;
    lockControls: boolean;
}

const Cart: React.FC<CartProps> = (props) => {
    const classes = useStyles();

    return (
        <>
            {props.isCartEmpty &&
                <Grid item className={classes.emptyItem}>
                    <Typography variant="h4">
                        Nothing here.
                    </Typography>
                </Grid>
            }
            <Grid id="itemGrid" container spacing={3} className={classes.itemGrid}>
                {!props.isCartEmpty && props.cart.itemQuantities.map((itemQuantity: ICartItemQuantity, index: number) => {
                    return (
                        <Grid item key={index} className={classes.gridItem}>
                            <Card>
                                <CardHeader title={itemQuantity.item.itemName} className={classes.cardHeader} />
                                <Divider />
                                <CardContent className={classes.cardContent}>
                                    <Grid container justify="space-between" alignItems="center">
                                        <Grid item className={classes.cardTexts}>
                                            <Typography variant="h5">
                                                {`${itemQuantity.item.price}$ - ${itemQuantity.quantity} pcs`}
                                            </Typography>
                                        </Grid>
                                        <Grid item className={classes.cardActions}>
                                            <Button className={classes.cardButton} disabled={props.lockControls} variant="outlined" color="primary" onClick={async () => {
                                                await stateActions.addItemToCart(props.userId, itemQuantity.item);
                                                await stateActions.getCart(props.userId);
                                            }}>Add</Button>
                                            <Button className={classes.cardButton} disabled={props.lockControls} variant="outlined" color="secondary" onClick={async () => {
                                                await stateActions.removeItemFromCaer(props.userId, itemQuantity.item);
                                                await stateActions.getCart(props.userId);
                                            }}>Remove</Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <Divider />
            <Grid container alignItems="flex-end" justify="center" className={classes.priceGrid}>
                <Grid item>
                    <Box fontWeight={600}>
                        {`Total: ${props.cart.totalPrice || "0.00"}$`}
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

const mapStateToProps = (state: State) => {
    return {
        cart: state.cartReducer.cart,
        isCartEmpty: isCartEmpty(state),
        userId: state.globalReducer.userId,
        lockControls: state.globalReducer.lockControls
    }
}

const ConnectedCart = connect(mapStateToProps)(Cart);

export { ConnectedCart as Cart }