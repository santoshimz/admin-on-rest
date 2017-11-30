import { combineReducers } from 'redux';
import resources, { getResources as innerGetResources } from './resource';
import loading from './loading';
import notification from './notification';
import record from './record';
import references from './references';
import saving from './saving';
import ui from './ui';
import modals from './modals';

export default combineReducers({
    resources,
    loading,
    notification,
    modals,
    record,
    references,
    saving,
    ui,
});

export const getResources = state => innerGetResources(state.resources);
