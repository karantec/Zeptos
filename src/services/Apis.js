import { backend_url } from "../hooks/Auth"

export const GetUser = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(backend_url + '/api/users/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error occurred while fetching user data:", error);
        throw error; // Propagate the error
    }
}

export const GetProduct = async (productId) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(backend_url + '/api/products/' + productId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error occurred while fetching user data:", error);
        throw error; // Propagate the error
    }
}

export const GetCategory = async (category_type) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(backend_url + '/api/products/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                category_type: category_type
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error occurred while fetching user data:", error);
        throw error; // Propagate the error
    }
}



export const GetLiveCategory = async (category_type) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(backend_url + '/api/products/livecategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                category_type: category_type
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error occurred while fetching user data:", error);
        throw error; // Propagate the error
    }
}

export const DeleteProduct = async (productId) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(backend_url + '/api/products/' + productId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error occurred while fetching user data:", error);
        throw error; // Propagate the error
    }
}

export const SearchProducts = async (searchQuery = '') => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(backend_url + '/api/products/search?q=' + encodeURIComponent(searchQuery), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error occurred while fetching user data:", error);
        throw error; // Propagate the error
    }
}




// --------------------------- CART OPERATIONS --------------------------------

export const AddItem = async (productId) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(backend_url + '/api/users/cart/add-item', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                product_id: productId
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error occurred while fetching user data:", error);
        throw error; // Propagate the error
    }
}

export const GetItems = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(backend_url + '/api/users/cart/get-cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });

        const cartData = await response.json();

        return cartData;
    } catch (error) {
        console.log("Error occurred while fetching user data:", error);
        throw error; // Propagate the error
    }
}

export const UpdateQuantity = async (productId, quantity) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(backend_url + '/api/users/cart/update-quantity', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                product_id: productId,
                quantity: quantity
            })
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error occurred while fetching user data:", error);
        throw error;
    }
}

export const DeleteItem = async (productId) => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(backend_url + '/api/users/cart/delete-item', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify({
                product_id: productId
            })
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error occurred while fetching user data:", error);
        throw error; // Propagate the error
    }
}

export const DeleteCart = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(backend_url + '/api/users/cart/clear-cart', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.log("Error occurred while fetching user data:", error);
        throw error; // Propagate the error
    }
}



// --------------------------- ORDERS --------------------------------


export const GetBuyerOrders = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(backend_url + '/api/orders/orders-list', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            }
        });

        const ordersList = await response.json();

        return ordersList;
    } catch (error) {
        console.log("Error occurred while fetching user data:", error);
        throw error; // Propagate the error
    }
}