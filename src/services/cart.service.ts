import { CART_API } from "../constants/api/cart"
import { ApiResponse, APIResponseData } from "../models/ApiReponse.model"
import { Cart, CartStatusUpdate, SearchCartByStatus } from "../models/Cart.model"
import { deleteRequest, postRequest, putRequest } from "./httpsMethod"

const CartService = {
    createCart(courseId: string):  Promise<ApiResponse>{
        return postRequest(CART_API.CREATE_CART,{course_id: courseId})
    },
    getCartsByStatus(params: SearchCartByStatus):  Promise<ApiResponse<APIResponseData<Cart>>> {
        return postRequest(CART_API.SEARCH_CART, params)
    },
    getCartsAmount(params: SearchCartByStatus):  Promise<ApiResponse<APIResponseData<Cart>>> {
        return postRequest(CART_API.SEARCH_CART, params, false)
    },
    updateStatusCart(params: CartStatusUpdate):  Promise<ApiResponse> {
        return putRequest(CART_API.UPDATE_CART_STATUS, params)
    },
    deleteCart(cartId: string):  Promise<ApiResponse> {
        return deleteRequest(CART_API.DELETE_CART(cartId))
    }   
}

// //exmaple for logging
     
// const searchValues: SearchCartByStatus = {
//     searchCondition: {
//         keyword: 'example', // Optional
//         category_id: '123', // Optional
//         status: CartStatusEnum.CANCEL, // Set this based on your enum
//         is_deleted: false // Required
//     },
//     pageInfo: {
//         pageNum: 1, // Set to desired page number
//         pageSize: 10 // Set to desired items per page
//     }
// };


// const response = await CartService.getCartByStatus(searchValues);
// console.log(response.data?.pageData)



export default CartService