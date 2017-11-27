import {
    CRUD_CHANGE_LIST_SELECTION,
    CRUD_CHANGE_LIST_PARAMS,
    CRUD_CLEAR_LIST_SELECTION,
} from '../../../../actions/listActions';

const defaultState = {
    selectMode: 'bulk',
    ids: [],
};

export default resource => (
    previousState = defaultState,
    { type, payload, meta }
) => {
    if (!meta || meta.resource !== resource) {
        return previousState;
    }
    switch (type) {
        case CRUD_CHANGE_LIST_PARAMS: {
            switch (previousState.selectMode) {
                case 'page':
                    return {
                        ...previousState,
                        ids: [],
                    };
                default:
                    return previousState;
            }
        }
        case CRUD_CLEAR_LIST_SELECTION: {
            return {
                ...previousState,
                ids: [],
            };
        }
        case CRUD_CHANGE_LIST_SELECTION: {
            let {
                id,
                selectMode = previousState.selectMode,
                selected,
            } = payload;
            id = Array.isArray(id) ? id : [id];

            switch (selectMode) {
                case 'bulk':
                case 'page':
                    return {
                        selectMode,
                        ids: selected
                            ? id.reduce(
                                  (acc, item) =>
                                      acc.indexOf(item) === -1
                                          ? acc.concat(item)
                                          : acc,
                                  previousState.ids
                              )
                            : previousState.ids.filter(
                                  prevId => id.indexOf(prevId) === -1
                              ),
                    };
                default:
                    return {
                        selectMode,
                        ids: selected ? id : [],
                    };
            }
        }
        default:
            return previousState;
    }
};
export const getSelection = (state, resource) =>
    state.admin.resources[resource]
        ? state.admin.resources[resource].list.selection.ids
        : [];
