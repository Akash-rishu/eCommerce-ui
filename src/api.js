import axios from "axios";

// ======================================
// AXIOS INSTANCE
// ======================================
const API = axios.create({

  baseURL:
    "http://localhost:8080/api",

  headers: {
    "Content-Type":
      "application/json"
  }
});

// ======================================
// REQUEST INTERCEPTOR
// AUTO ATTACH JWT TOKEN
// ======================================
API.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    // TOKEN EXISTS
    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(
      error
    );
  }
);

// ======================================
// RESPONSE INTERCEPTOR
// HANDLE TOKEN EXPIRE / 401
// ======================================
API.interceptors.response.use(

  (response) => {

    return response;
  },

  (error) => {

    // TOKEN EXPIRED
    if (

      error.response
      && error.response.status === 401

    ) {

      console.log(
        "Session Expired"
      );

      // CLEAR STORAGE
      localStorage.clear();

      // REDIRECT LOGIN
      window.location.href = "/";
    }

    return Promise.reject(
      error
    );
  }
);

export default API;