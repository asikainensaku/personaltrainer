import type { Customer } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

export function getCustomers() {
    return fetch(API_URL + "/customers")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when fetching customers");
            }

            return response.json();
        });
}

export function getTrainings() {
    return fetch(API_URL + "/gettrainings")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when fetching trainings");
            }

            return response.json();
        });
}

export function addCustomer(customer: Customer) {
    return fetch(API_URL + "/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when adding a new customer");
            }

            return response.json();
        });
}

//Help for PUT request: https://jasonwatmore.com/post/2020/11/02/react-fetch-http-put-request-examples 

export function updateCustomer(url: string, customer: Customer) {
    return fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            firstname: customer.firstname,
            lastname: customer.lastname,
            streetaddress: customer.streetaddress,
            postcode: customer.postcode,
            city: customer.city,
            email: customer.email,
            phone: customer.phone
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when updating customer");
            }
            return response.json();
        });
}

export function deleteCustomer(url: string) {
    return fetch(url, { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when deleting customer");
            }
        });
}

export function addTraining(training: {
    date: string;
    duration: number;
    activity: string;
    customer: string;
}) {
    return fetch(API_URL + "/trainings", {
        method: "POST",
        headers: { "Content-Type": "application / json" },
        body: JSON.stringify(training)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error when adding a new training");
            }
            return response.json();
        });
}