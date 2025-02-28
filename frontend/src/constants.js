// This file contains the constants used in the application.
export const BASE_URL = process.env.NODE_ENV === 'develeopment' ? 'http://localhost:5000' : '/';
// export const BASE_URL = ''; //If using proxy uncomment this line.
export const PRODUCTS_URL = 'api/products';
export const USERS_URL = 'api/users';
export const ORDERS_URL = 'api/orders';
export const PAYPAL_URL = 'api/config/paypal';