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
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(newRequestData);
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
            expect(response.body).to.have.property('message', String(newRequestData.id));
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(newRequestData);
        })
    });

    it('Positive: Update non existing user through non-existing user endpoint', () => {
        let requestData = {id: getUserRequestData().id, username: getUserRequestData().username, userStatus: getUserRequestData().userStatus};   
        updateUser(requestData, requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', String(requestData.id));
        })
        getUserByUserName(requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(requestData);
        })
    });

    it('Positive: Update user data with id as valid string value instead of int64', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = String(initialRequestData.id);
        newRequestData.username = initialRequestData.username;
        let checkData = newRequestData;
        checkData.id = Number(checkData.id);
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.be.eq(String(newRequestData.id));
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(checkData);
        })
    });

    it('Positive: Update user by invalid username type - number instead of string', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = initialRequestData.id;
        newRequestData.username = Chance().integer();
        let checkData = newRequestData;
        checkData.username = String(checkData.username);
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.be.eq(String(newRequestData.id));
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(checkData);
        })
    });

    it('Positive: Update user by invalid firstName type - number instead of string', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = initialRequestData.id;
        newRequestData.username = initialRequestData.username;
        newRequestData.firstName = Chance().integer();
        let checkData = newRequestData;
        checkData.firstName = String(checkData.firstName);
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.be.eq(String(newRequestData.id));
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(checkData);
        })
    });

    it('Positive: Update user by invalid lastName type - number instead of string', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = initialRequestData.id;
        newRequestData.username = initialRequestData.username;
        newRequestData.lastName = Chance().integer();
        let checkData = newRequestData;
        checkData.lastName = String(checkData.lastName);
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.be.eq(String(newRequestData.id));
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(checkData);
        })
    });

    it('Positive: Update user by invalid email type - number instead of string', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = initialRequestData.id;
        newRequestData.username = initialRequestData.username;
        newRequestData.email = Chance().integer();
        let checkData = newRequestData;
        checkData.email = String(checkData.email);
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.be.eq(String(newRequestData.id));
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(checkData);
        })
    });

    it('Positive: Update user by invalid password type - number instead of string', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = initialRequestData.id;
        newRequestData.username = initialRequestData.username;
        newRequestData.password = Chance().integer();
        let checkData = newRequestData;
        checkData.password = String(checkData.password);
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.be.eq(String(newRequestData.id));
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(checkData);
        })
    });

    it('Positive: Update user by invalid phone type - number instead of string', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = initialRequestData.id;
        newRequestData.username = initialRequestData.username;
        newRequestData.phone = Chance().integer();
        let checkData = newRequestData;
        checkData.phone = String(checkData.phone);
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
        }) 
        updateUser(newRequestData, newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.be.eq(String(newRequestData.id));
        })
        getUserByUserName(newRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(checkData);
        })
    });

    it('Negative: Update user by empty body', () => {
        let requestData = getUserRequestData();
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
        })    
        updateUser({}, requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(Number(response.body.message)).to.be.eq(0);
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
            expect(Number(response.body.message)).to.be.greaterThan(0);
        })
        getUserByUserName(initialRequestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(initialRequestData);
        })
    });

    it('Negative: Update user by invalid id type - random string instead of int64', () => {
        let requestData = getUserRequestData();
        requestData.id = Chance().string();
        updateUser(requestData, requestData.username, false).then(response => {
            console.log(response);
            expect(response.status).to.eq(500);
            expect(response.body.code).to.eq(500);
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
            expect(response.body.message).to.be.eq('something bad happened');
        })
    });
    
})