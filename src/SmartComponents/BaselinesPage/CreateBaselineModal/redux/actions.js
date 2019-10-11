import types from './types';
import api from '../../../../api';

function toggleCreateBaselineModal() {
    return {
        type: types.TOGGLE_CREATE_BASELINE_MODAL
    };
}

function createBaseline(newBaseline, uuid = undefined) {
    return {
        type: types.CREATE_BASELINE,
        payload: api.postNewBaseline(newBaseline, uuid)
    };
}

export default {
    toggleCreateBaselineModal,
    createBaseline
};
