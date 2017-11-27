import { all, call, put, race, take, takeEvery } from 'redux-saga/effects';

import { CRUD_DELETE_SUCCESS, crudDelete } from '../../actions';
import {
    changeListSelection,
    CRUD_EXECUTE_LIST_ACTION,
} from '../../actions/listActions';
import { refreshView } from '../../actions/uiActions';
import { CRUD_DELETE_FAILURE } from '../../actions/dataActions';
import { showNotification } from '../../actions/notificationActions';

const defaultListActionsSaga = () => {
    function* deleteItem(resource, id, skipNotification) {
        yield put(
            crudDelete(resource, id, null, null, false, skipNotification)
        );
        const { success } = yield race({
            success: take(
                action =>
                    action.type === CRUD_DELETE_SUCCESS &&
                    action.requestPayload.id === id
            ),
            failure: take(
                action =>
                    action.type === CRUD_DELETE_FAILURE &&
                    action.requestPayload.id === id
            ),
        });
        return !!success;
    }

    function* handleSelectDeleteAction(action) {
        const {
            payload: { reload = true, ids, skipNotification = true },
            meta,
        } = action;

        let result = yield all(
            ids.map(id => call(deleteItem, meta.resource, id, skipNotification))
        );
        result = result.reduce(
            (result, success) =>
                Object.assign(result, {
                    successCount: success
                        ? result.successCount + 1
                        : result.successCount,
                    errorCount: !success
                        ? result.errorCount + 1
                        : result.errorCount,
                }),
            {
                successCount: 0,
                errorCount: 0,
            }
        );
        if (reload) {
            yield put(refreshView());
        }
        yield showNotification('ra.notification.deleted');
    }

    function* handleDeleteSuccessResponse({
        payload: { data },
        meta: { resource },
    }) {
        if (data && data.id) {
            yield put(
                changeListSelection(resource, {
                    id: data.id,
                })
            );
        }
    }

    return function* watchSelectActions() {
        yield all([
            takeEvery(
                action =>
                    action.type === CRUD_EXECUTE_LIST_ACTION &&
                    action.meta.action === 'delete',
                handleSelectDeleteAction
            ),
            takeEvery(CRUD_DELETE_SUCCESS, handleDeleteSuccessResponse),
        ]);
    };
};

export default defaultListActionsSaga;
