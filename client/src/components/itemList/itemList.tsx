import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { State } from "../../store/store";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { isItemsLoaded } from "../../selectors/itemSelectors";
import { IItem } from "../../../../_models/item";
import { Progress } from "../progress/progress";
import { stateActions } from "../../stateActions/stateActions";

interface ItemListProps {
    isItemsLoaded: boolean;
    items: IItem[];
}

const ItemList: React.FC<ItemListProps> = (props) => {
    // Fetch all items on mount once
    useEffect(() => {
        (async () => {
            await stateActions.loadItems();
        })();
    }, []);

    return (
        <Container>
            {!props.isItemsLoaded ? <Progress /> : "This will be the item list"}
        </Container>
    );
}

const mapStateToProps = (state: State) => {
    return {
        items: state.itemReducer.items,
        isItemsLoaded: isItemsLoaded(state)
    }
}

// TODO add actions to add/remove items from the cart
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {

    }
}

const ConnectedItemList = connect(mapStateToProps, mapDispatchToProps)(ItemList);


export { ConnectedItemList as ItemList }