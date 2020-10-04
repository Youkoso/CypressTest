import {URL_API} from "./apiSettings";

export const createUser = (body, failedByCode = true) => {
    return cy.request({
        method: 'POST',
        url: `${URL_API}`,
        body: body,
        failOnStatusCode: failedByCode
    });
}

export const updateUser = (body, username, failedByCode = true) => {
    return cy.request({
        method: 'PUT',
        url: `${URL_API}/${username}`,
        body: body,
        failOnStatusCode: failedByCode
    });
}

export const deleteUser = (username, failedByCode = true) => {
    return cy.request({
        method: 'DELETE',
        url: `${URL_API}/${username}`,
        failOnStatusCode: failedByCode
    });
}

export const getUserByUserName = (username, failedByCode = true) => {
    return cy.request({
        method: 'GET',
        url: `${URL_API}/${username}`,
        failOnStatusCode: failedByCode
    });
}