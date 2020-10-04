import Chance from "chance";
import {URL_API} from "../../../helpers/apiSettings";
import {getUserRequestData} from "../../../helpers/apiDataGenerators";
import {createUser, updateUser, getUserByUserName} from "../../../helpers/userApiRequests";


describe('Test for Update user', () => {

    it('Positive: Update user data', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.username = initialRequestData.username;
        newRequestData.id = initialRequestData.id;
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        })    
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body).to.have.property('message', String(newRequestData.id));
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', newRequestData.id);
            expect(response.body).to.have.property('username', newRequestData.username);
            expect(response.body).to.have.property('firstName', newRequestData.firstName);
            expect(response.body).to.have.property('lastName', newRequestData.lastName);
            expect(response.body).to.have.property('email', newRequestData.email);
            expect(response.body).to.have.property('password', newRequestData.password);
            expect(response.body).to.have.property('phone', newRequestData.phone);
            expect(response.body).to.have.property('userStatus', newRequestData.userStatus);
        })
    });

    it('Positive: Update user data through another user endpoint', () => {
        let endPointRequestData = getUserRequestData();
        let endPoint = endPointRequestData.username;
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.username = initialRequestData.username;
        newRequestData.id = initialRequestData.id;
        createUser(endPointRequestData).then(response => {
            expect(response.status).to.eq(200);
        })
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, endPoint).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body).to.have.property('message', String(newRequestData.id));
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', newRequestData.id);
            expect(response.body).to.have.property('username', newRequestData.username);
            expect(response.body).to.have.property('firstName', newRequestData.firstName);
            expect(response.body).to.have.property('lastName', newRequestData.lastName);
            expect(response.body).to.have.property('email', newRequestData.email);
            expect(response.body).to.have.property('password', newRequestData.password);
            expect(response.body).to.have.property('phone', newRequestData.phone);
            expect(response.body).to.have.property('userStatus', newRequestData.userStatus);
        })
    });

    it('Positive: Update non existing user through non-existing user endpoint', () => {
        let requestData = {id: getUserRequestData().id, username: getUserRequestData().username};   
        updateUser(requestData, requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body).to.have.property('message', String(requestData.id));
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', requestData.id);
            expect(response.body).to.have.property('username', requestData.username);
            expect(response.body).to.have.property('userStatus', 0);
        })
    });

    it('Positive: Update user data with id as valid string value instead of int64', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = String(initialRequestData.id);
        newRequestData.username = initialRequestData.username;
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body.message).to.be.eq(newRequestData.id);
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', Number(newRequestData.id));
            expect(response.body).to.have.property('username', newRequestData.username);
            expect(response.body).to.have.property('firstName', newRequestData.firstName);
            expect(response.body).to.have.property('lastName', newRequestData.lastName);
            expect(response.body).to.have.property('email', newRequestData.email);
            expect(response.body).to.have.property('password', newRequestData.password);
            expect(response.body).to.have.property('phone', newRequestData.phone);
            expect(response.body).to.have.property('userStatus', newRequestData.userStatus);
        })
    });

    it('Positive: Update user by invalid username type - number instead of string', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = initialRequestData.id;
        newRequestData.username = Chance().integer();
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body.message).to.be.eq(String(newRequestData.id));
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', newRequestData.id);
            expect(response.body).to.have.property('username', String(newRequestData.username));
            expect(response.body).to.have.property('firstName', newRequestData.firstName);
            expect(response.body).to.have.property('lastName', newRequestData.lastName);
            expect(response.body).to.have.property('email', newRequestData.email);
            expect(response.body).to.have.property('password', newRequestData.password);
            expect(response.body).to.have.property('phone', newRequestData.phone);
            expect(response.body).to.have.property('userStatus', newRequestData.userStatus);
        })
    });

    it('Positive: Update user by invalid firstName type - number instead of string', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = initialRequestData.id;
        newRequestData.username = initialRequestData.username;
        newRequestData.firstName = Chance().integer();
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body.message).to.be.eq(String(newRequestData.id));
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', newRequestData.id);
            expect(response.body).to.have.property('username', newRequestData.username);
            expect(response.body).to.have.property('firstName', String(newRequestData.firstName));
            expect(response.body).to.have.property('lastName', newRequestData.lastName);
            expect(response.body).to.have.property('email', newRequestData.email);
            expect(response.body).to.have.property('password', newRequestData.password);
            expect(response.body).to.have.property('phone', newRequestData.phone);
            expect(response.body).to.have.property('userStatus', newRequestData.userStatus);
        })
    });

    it('Positive: Update user by invalid lastName type - number instead of string', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = initialRequestData.id;
        newRequestData.username = initialRequestData.username;
        newRequestData.lastName = Chance().integer();
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body.message).to.be.eq(String(newRequestData.id));
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', newRequestData.id);
            expect(response.body).to.have.property('username', newRequestData.username);
            expect(response.body).to.have.property('firstName', newRequestData.firstName);
            expect(response.body).to.have.property('lastName', String(newRequestData.lastName));
            expect(response.body).to.have.property('email', newRequestData.email);
            expect(response.body).to.have.property('password', newRequestData.password);
            expect(response.body).to.have.property('phone', newRequestData.phone);
            expect(response.body).to.have.property('userStatus', newRequestData.userStatus);
        })
    });

    it('Positive: Update user by invalid email type - number instead of string', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = initialRequestData.id;
        newRequestData.username = initialRequestData.username;
        newRequestData.email = Chance().integer();
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body.message).to.be.eq(String(newRequestData.id));
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', newRequestData.id);
            expect(response.body).to.have.property('username', newRequestData.username);
            expect(response.body).to.have.property('firstName', newRequestData.firstName);
            expect(response.body).to.have.property('lastName', newRequestData.lastName);
            expect(response.body).to.have.property('email', String(newRequestData.email));
            expect(response.body).to.have.property('password', newRequestData.password);
            expect(response.body).to.have.property('phone', newRequestData.phone);
            expect(response.body).to.have.property('userStatus', newRequestData.userStatus);
        })
    });

    it('Positive: Update user by invalid password type - number instead of string', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = initialRequestData.id;
        newRequestData.username = initialRequestData.username;
        newRequestData.password = Chance().integer();
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body.message).to.be.eq(String(newRequestData.id));
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', newRequestData.id);
            expect(response.body).to.have.property('username', newRequestData.username);
            expect(response.body).to.have.property('firstName', newRequestData.firstName);
            expect(response.body).to.have.property('lastName', newRequestData.lastName);
            expect(response.body).to.have.property('email', newRequestData.email);
            expect(response.body).to.have.property('password', String(newRequestData.password));
            expect(response.body).to.have.property('phone', newRequestData.phone);
            expect(response.body).to.have.property('userStatus', newRequestData.userStatus);
        })
    });

    it('Positive: Update user by invalid phone type - number instead of string', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = initialRequestData.id;
        newRequestData.username = initialRequestData.username;
        newRequestData.phone = Chance().integer();
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body.message).to.be.eq(String(newRequestData.id));
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', newRequestData.id);
            expect(response.body).to.have.property('username', newRequestData.username);
            expect(response.body).to.have.property('firstName', newRequestData.firstName);
            expect(response.body).to.have.property('lastName', newRequestData.lastName);
            expect(response.body).to.have.property('email', newRequestData.email);
            expect(response.body).to.have.property('password', newRequestData.password);
            expect(response.body).to.have.property('phone', String(newRequestData.phone));
            expect(response.body).to.have.property('userStatus', newRequestData.userStatus);
        })
    });

    it('Negative: Update user by empty body', () => {
        let requestData = getUserRequestData();
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
        })    
        updateUser({}, requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(Number(response.body.message)).to.be.eq(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
    });

    it('Negative: Update user by data without body', () => {
        let requestData = getUserRequestData();
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
        })    
        cy.request({method: 'PUT', url: `${URL_API}/${requestData.username}`, failOnStatusCode: false}).then(response => {
            expect(response.status).to.eq(415);
            expect(response.body.code).to.eq(415);
            expect(response.body).to.have.property('type', 'unknown');
        })
    });

    it('Negative: Update user data without id in body', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        delete newRequestData.id;
        newRequestData.username = initialRequestData.username;
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(initialRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('id', initialRequestData.id);
            expect(response.body).to.have.property('username', initialRequestData.username);
            expect(response.body).to.have.property('firstName', initialRequestData.firstName);
            expect(response.body).to.have.property('lastName', initialRequestData.lastName);
            expect(response.body).to.have.property('email', initialRequestData.email);
            expect(response.body).to.have.property('password', initialRequestData.password);
            expect(response.body).to.have.property('phone', initialRequestData.phone);
            expect(response.body).to.have.property('userStatus', initialRequestData.userStatus);
        })
    });

    it('Negative: Update user by invalid id type - random string instead of int64', () => {
        let requestData = getUserRequestData();
        requestData.id = Chance().string();
        updateUser(requestData, requestData.username, false).then(response => {
            console.log(response);
            expect(response.status).to.eq(500);
            expect(response.body.code).to.eq(500);
            expect(response.body).to.have.property('type', 'unknown');
            expect(response.body.message).to.be.eq('something bad happened');
        })
    });

    it('Negative: Update user by invalid userStatus type - random string instead of int64', () => {
        let requestData = getUserRequestData();
        requestData.userStatus = Chance().string();
        updateUser(requestData, requestData.username, false).then(response => {
            console.log(response);
            expect(response.status).to.eq(500);
            expect(response.body.code).to.eq(500);
            expect(response.body).to.have.property('type', 'unknown');
            expect(response.body.message).to.be.eq('something bad happened');
        })
    });
    
})