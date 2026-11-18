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