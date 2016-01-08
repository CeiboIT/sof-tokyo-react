/**
 * Created by mmasuyama on 1/8/2016.
 */

import { combineReducers } from 'redux';
import { TOGGLE_MENU } from "../actions/Navigation";

export function Navigation(state='Click me', action) {
    switch (action.type) {
        case TOGGLE_MENU:
            return action.text
    }
}