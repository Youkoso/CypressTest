import Chance from "chance";
import {URL_API} from "../../../helpers/apiSettings";
import {DATA_SET, getUserRequestData} from "../../../helpers/apiDataGenerators";
import {createUser, getUserByUserName} from "../../../helpers/userApiRequests";

describe('Create a new User', () =>{

    let testDataSet = [
        {
            description: 'Random length values used in test',
            requestData: getUserRequestData(DATA_SET.RANDOM)
        },
        {
            description: 'Max values used in test',
            requestData: getUserRequestData(DATA_SET.MAX)
        }
    ];

    testDataSet.forEach(({description, requestData}) => {
        it(description, () => {
            createUser(requestData).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.code).to.eq(200);
                expect(response.body).to.have.property('message', String(requestData.id));
                expect(Number(response.body.message)).to.be.greaterThan(0);
                expect(response.body).to.have.property('type', 'unknown');
            })
            getUserByUserName(requestData.username).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.id).to.be.greaterThan(0);
                expect(response.body).to.deep.equal(requestData);
            })
        })
    });

    it('Positive: Update existing user entity by another POST  with the same user id', () => {
        let initialRequestData = getUserRequestData();
        let newRequestData = getUserRequestData();
        newRequestData.id = initialRequestData.id;
        createUser(initialRequestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body).to.have.property('message', String(initialRequestData.id));
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
        createUser(newRequestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body).to.have.property('message', String(newRequestData.id));
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(newRequestData.username).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.id).to.be.greaterThan(0);
                expect(response.body).to.deep.equal(newRequestData);
        })
        getUserByUserName(initialRequestData.username, false).then(response => {
            console.log(response);
            expect(response.status).to.eq(404);
            expect(response.body.code).to.eq(1);
            expect(response.body).to.have.property('message', 'User not found');
            expect(response.body).to.have.property('type', 'error');
        })
    });

    it('Positive: Only username in body', () => {
        let requestData = {username: getUserRequestData().username};
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(requestData.username).then(response => {
                expect(response.status).to.eq(200);
                expect(response.body.id).to.be.greaterThan(0);
                expect(response.body).to.have.property('username', requestData.username);
                expect(response.body.userStatus).to.be.eq(0);
        })
    });

    it('Positive: Only id in body', () => {
        let requestData = {id: getUserRequestData(DATA_SET.MIN).id};
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body).to.have.property('message', String(requestData.id));
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
    });

    it('Positive: No username in request body', () => {
        let requestData = getUserRequestData();
        delete requestData.username;
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body).to.have.property('message', String(requestData.id));
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
    });

    it('Positive: No id in request body', () => {
        let requestData = getUserRequestData();
        delete requestData.id;
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
    });

    it('Positive: ID and userStatus are negative numbers', () => {
        let requestData = getUserRequestData();
        requestData.id = -requestData.id;
        requestData.userStatus = -requestData.userStatus;
        console.log(requestData);
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(Number(response.body.message)).not.to.be.eq(requestData.id);
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');    
        })
        getUserByUserName(requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.id).to.be.greaterThan(0);
            expect(response.body.id).to.be.not.eq(requestData.id);
            expect(response.body).to.have.property('username', requestData.username);
            expect(response.body).to.have.property('firstName', requestData.firstName);
            expect(response.body).to.have.property('lastName', requestData.lastName);
            expect(response.body).to.have.property('email', requestData.email);
            expect(response.body).to.have.property('password', requestData.password);
            expect(response.body).to.have.property('phone', requestData.phone);
            expect(response.body).to.have.property('userStatus', requestData.userStatus);
        })
    });

    it('Positive: Invalid username - number instead of string', () => {
        let requestData = getUserRequestData();
        requestData.username = Chance().integer();
        let checkData = requestData;
        checkData.username = String(checkData.username);
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body).to.have.property('message', String(requestData.id));
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(checkData);
        })
    });

    it('Positive: Invalid user firstName - number instead of string', () => {
        let requestData = getUserRequestData();
        requestData.firstName = Chance().integer();
        let checkData = requestData;
        checkData.firstName = String(checkData.firstName);
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body).to.have.property('message', String(requestData.id));
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(checkData);
        })
    });

    it('Positive: Invalid user lastName - number instead of string', () => {
        let requestData = getUserRequestData();
        requestData.lastName = Chance().integer();
        let checkData = requestData;
        checkData.lastName = String(checkData.lastName);
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body).to.have.property('message', String(requestData.id));
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(checkData);
        })
    });

    it('Positive: Invalid user email - number instead of string', () => {
        let requestData = getUserRequestData();
        requestData.email = Chance().integer();
        let checkData = requestData;
        checkData.email = String(checkData.email);
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body).to.have.property('message', String(requestData.id));
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(checkData);
        })
    });

    it('Positive: Invalid user password - number instead of string', () => {
        let requestData = getUserRequestData();
        requestData.password = Chance().integer();
        let checkData = requestData;
        checkData.password = String(checkData.password);
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body).to.have.property('message', String(requestData.id));
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(checkData);
        })
    });

    it('Positive: Invalid user phone - number instead of string', () => {
        let requestData = getUserRequestData();
        requestData.phone = Chance().integer();
        let checkData = requestData;
        checkData.phone = String(checkData.phone);
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body).to.have.property('message', String(requestData.id));
            expect(Number(response.body.message)).to.be.greaterThan(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(checkData);
        })
    });

    it('Negative: No id and username in request body', () => {
        let requestData = getUserRequestData();
        delete requestData.id;
        delete requestData.username;
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(Number(response.body.message)).to.be.eq(0);
            expect(response.body).to.have.property('type', 'unknown');   
        })
    });

    it('Negative: Request with empty body', () => {
        let requestData = {};
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(Number(response.body.message)).to.be.eq(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
    });

    it('Negative: Request without body', () => {
        cy.request({method: 'POST', url: `${URL_API}`, failOnStatusCode: false}).then(response => {
            console.log(response);
            expect(response.status).to.eq(415);
            expect(response.body.code).to.eq(415);
            expect(response.statusText).to.eq('Unsupported Media Type');
        })
    });

    it('Negative: ID and username are null', () => {
        let requestData = getUserRequestData();
        requestData.id = null;
        requestData.username = null;
        console.log(requestData);
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(Number(response.body.message)).to.be.eq(0);
            expect(response.body).to.have.property('type', 'unknown');
        })
    });

    it('Negative: Invalid user id - string instead of int64', () => {
        let requestData = getUserRequestData();
        requestData.id = Chance().string();
        createUser(requestData, false).then(response => {
            console.log(response);
            expect(response.status).to.eq(500);
            expect(response.body.code).to.eq(500);
            expect(response.body).to.have.property('type', 'unknown');
            expect(response.body.message).to.be.eq('something bad happened');
        })
    });

    it('Negative: Invalid userStatus - string instead of int32', () => {
        let requestData = getUserRequestData();
        requestData.userStatus = Chance().string();
        createUser(requestData, false).then(response => {
            console.log(response);
            expect(response.status).to.eq(500);
            expect(response.body.code).to.eq(500);
            expect(response.body).to.have.property('type', 'unknown');
            expect(response.body.message).to.be.eq('something bad happened');
        })
    });
})