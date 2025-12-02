// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => {
    return localStorage.getItem('adminToken');
};

// Set token in localStorage
const setToken = (token) => {
    localStorage.setItem('adminToken', token);
};

// Remove token from localStorage
const removeToken = () => {
    localStorage.removeItem('adminToken');
};

// API Helper function
const apiCall = async (endpoint, options = {}) => {
    const token = getToken();

    const config = {
        ...options,
        headers: {
            ...options.headers,
        }
    };

    // Add authorization header if token exists
    if (token && !options.skipAuth) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Add Content-Type for JSON if not FormData
    if (!(options.body instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Authentication API
const authAPI = {
    login: async (username, password) => {
        const data = await apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            skipAuth: true
        });
        if (data.token) {
            setToken(data.token);
        }
        return data;
    },

    logout: () => {
        removeToken();
    },

    verifyToken: async () => {
        try {
            return await apiCall('/auth/verify');
        } catch (error) {
            removeToken();
            throw error;
        }
    }
};

// Puppies API
const puppiesAPI = {
    getAll: async () => {
        return await apiCall('/puppies', { skipAuth: true });
    },

    getOne: async (id) => {
        return await apiCall(`/puppies/${id}`, { skipAuth: true });
    },

    create: async (formData) => {
        return await apiCall('/puppies', {
            method: 'POST',
            body: formData
        });
    },

    update: async (id, formData) => {
        return await apiCall(`/puppies/${id}`, {
            method: 'PUT',
            body: formData
        });
    },

    delete: async (id) => {
        return await apiCall(`/puppies/${id}`, {
            method: 'DELETE'
        });
    }
};

// Bookings API
const bookingsAPI = {
    getAll: async () => {
        return await apiCall('/bookings');
    },

    create: async (bookingData) => {
        return await apiCall('/bookings', {
            method: 'POST',
            body: JSON.stringify(bookingData),
            skipAuth: true
        });
    },

    updateStatus: async (id, status) => {
        return await apiCall(`/bookings/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
    },

    delete: async (id) => {
        return await apiCall(`/bookings/${id}`, {
            method: 'DELETE'
        });
    }
};

// Export APIs
window.API = {
    auth: authAPI,
    puppies: puppiesAPI,
    bookings: bookingsAPI,
    setBaseURL: (url) => {
        API_BASE_URL = url;
    }
};
