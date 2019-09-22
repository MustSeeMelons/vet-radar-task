import React from "react";
import { AppBar, Toolbar, Button, Typography, Popover, Grid, CardContent, Card, Box, Divider } from "@material-ui/core";
import { Icon } from "@mdi/react";
import { mdiDog } from '@mdi/js'
import blue from '@material-ui/core/colors/lightBlue';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { history } from "../../util/history";
import { connect } from "react-redux";
import { State } from "../../store/store";
import { isCartEmpty } from "../../selectors/cartSelectors";
import { ICart, ICartItemQuantity } from "../../../../_models/cart";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flexGrow: 1,
            marginLeft: theme.spacing(2),
            cursor: "pointer"
        },
        popover: {
            // pointerEvents: 'none',
        },
        popoverEmpty: {
            margin: 5
        },
        paper: {
            padding: theme.spacing(1),
        },
        popCard: {
            padding: 1,
            width: 130
        },
        popCardContent: {
            padding: 3,
            "&:last-child": {
                padding: 3
            }
        }
    }),
);

const toHome = () => {
    history.push("/");
}

export interface HeaderProps {
    cart: ICart,
    isCartEmpty: boolean
}

const Header: React.FC<HeaderProps> = (props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    }

    const handlePopoverClose = () => {
        setAnchorEl(null);
    }

    const toCart = () => {
        handlePopoverClose();
        history.push("/cart");
    }

    const open = Boolean(anchorEl);

    return (<AppBar position="static">
        <Toolbar>
            <Icon
                path={mdiDog} title="Vet Icon"
                size={3}
                color={blue.A100}
            />
            <Typography variant="h4" className={classes.title} onClick={toHome}>
                VetRadar
            </Typography>
            <Button
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onClick={handlePopoverOpen}
                color="inherit">My Cart</Button>
            <Popover
                id="mouse-over-popover"
                className={classes.popover}
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Grid container spacing={2} direction="column">
                    {!props.isCartEmpty &&
                        <>
                            <Button onClick={toCart}>To Cart</Button>
                            <Divider />
                        </>
                    }
                    {props.isCartEmpty ? (
                        <Grid item className={classes.popoverEmpty}>
                            <Typography variant="subtitle1">
                                Mate, your cart is empty.
                            </Typography>
                        </Grid>
                    ) : props.cart.itemQuantities.map((itemQuantity: ICartItemQuantity, index: number) => {
                        return (
                            <Grid item key={index}>
                                <Card className={classes.popCard}>
                                    <CardContent className={classes.popCardContent}>
                                        <Typography variant="body2" >
                                            {itemQuantity.item.itemName}
                                        </Typography>
                                        <Grid container justify="space-between">
                                            <Typography variant="subtitle2">
                                                {`${itemQuantity.item.price}$`}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                {`${itemQuantity.quantity} pcs`}
                                            </Typography>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                    {!props.isCartEmpty &&
                        <>
                            <Divider />
                            <Grid item key={-1}>
                                <Grid container justify="space-between">
                                    <Typography variant="subtitle2">
                                        <Box fontWeight={600}>
                                            Total:
                                        </Box>
                                    </Typography>
                                    <Typography variant="subtitle2">
                                        <Box fontWeight={600}>
                                            {`${props.cart.totalPrice}$`}
                                        </Box>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </>
                    }
                </Grid>
            </Popover>
        </Toolbar>
    </AppBar>);
}

const mapStateToProps = (state: State) => {
    return {
        cart: state.cartReducer.cart,
        isCartEmpty: isCartEmpty(state)
    }
}

const ConnectedHeader = connect(mapStateToProps)(Header);

export { ConnectedHeader as Header }