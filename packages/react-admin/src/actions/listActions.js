export const CRUD_CHANGE_LIST_PARAMS = 'AOR/CRUD_CHANGE_LIST_PARAMS';
export const CRUD_CHANGE_LIST_SELECTION = 'AOR/CRUD_CHANGE_LIST_SELECTION';
export const CRUD_CLEAR_LIST_SELECTION = 'AOR/CRUD_CLEAR_LIST_SELECTION';
export const CRUD_EXECUTE_LIST_ACTION = 'AOR/CRUD_EXECUTE_LIST_ACTION';

export const changeListParams = (resource, params) => ({
    type: CRUD_CHANGE_LIST_PARAMS,
    payload: params,
    meta: { resource },
});

export const changeListSelection = (resource, selection) => ({
    type: CRUD_CHANGE_LIST_SELECTION,
    payload: selection,
    meta: { resource },
});

export const clearListSelection = resource => ({
    type: CRUD_CLEAR_LIST_SELECTION,
    meta: { resource },
});

export const executeListAction = (
    resource,
    action,
    actionOptions,
    selection
) => ({
    type: CRUD_EXECUTE_LIST_ACTION,
    payload: {
        ...actionOptions,
        ids: selection,
    },
    meta: { action, resource },
});
