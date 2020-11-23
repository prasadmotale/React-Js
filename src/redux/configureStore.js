import { createStore,combineReducers } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comments';
import { Promotion } from './promotions';
import { Leaders } from './leaders';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes:Dishes,
            comments:Comments,
            promotion:Promotion,
            leaders:Leaders
        })
    );
    return store;
}