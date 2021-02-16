import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_DETAILS_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_DEACTIVATE_REQUEST,
    PRODUCT_DEACTIVATE_SUCCESS,
    PRODUCT_DEACTIVATE_FAIL,
    PRODUCT_ACTIVATE_REQUEST,
    PRODUCT_ACTIVATE_SUCCESS,
    PRODUCT_ACTIVATE_FAIL,
    PRODUCT_LIST_INACTIVE_REQUEST,
    PRODUCT_LIST_INACTIVE_SUCCESS,
    PRODUCT_LIST_INACTIVE_FAIL,
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, 
                        products: action.payload.products, 
                        pages: action.payload.pages,
                        page: action.payload.page,
                        count: action.payload.count,
                        pageSize: action.payload.pageSize
                    };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch(action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state };
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload };
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_DETAILS_RESET:
            return { product: { reviews: [] } };
        default:
            return state;
    }
}

export const productDeleteReducer = (state = { }, action) => {
    switch(action.type) {
        case PRODUCT_DELETE_REQUEST:
            return { loading: true };
        case PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productCreateReducer = (state = { }, action) => {
    switch(action.type) {
        case PRODUCT_CREATE_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_RESET:
            return { };
        default:
            return state;
    }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
    switch(action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true };
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_UPDATE_RESET:
            return { product: {} };
        default:
            return state;
    }
}

export const productCreateReviewReducer = (state = { }, action) => {
    switch(action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return { loading: true };
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true };
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload };
        case PRODUCT_CREATE_REVIEW_RESET:
            return { };
        default:
            return state;
    }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case PRODUCT_TOP_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_TOP_SUCCESS:
            return { loading: false, products: action.payload };
        case PRODUCT_TOP_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productDeActivateReducer = (state = { product: {} }, action) => {
    switch(action.type) {
        case PRODUCT_DEACTIVATE_REQUEST:
            return { loading: true };
        case PRODUCT_DEACTIVATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_DEACTIVATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productActivateReducer = (state = { product: {} }, action) => {
    switch(action.type) {
        case PRODUCT_ACTIVATE_REQUEST:
            return { loading: true };
        case PRODUCT_ACTIVATE_SUCCESS:
            return { loading: false, success: true, product: action.payload };
        case PRODUCT_ACTIVATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

export const productListInactiveReducer = (state = { products: [] }, action) => {
    switch(action.type) {
        case PRODUCT_LIST_INACTIVE_REQUEST:
            return { loading: true, products: [] };
        case PRODUCT_LIST_INACTIVE_SUCCESS:
            return { loading: false, 
                products: action.payload.products, 
                pages: action.payload.pages,
                page: action.payload.page,
                count: action.payload.count,
                pageSize: action.payload.pageSize
            };
        case PRODUCT_LIST_INACTIVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}