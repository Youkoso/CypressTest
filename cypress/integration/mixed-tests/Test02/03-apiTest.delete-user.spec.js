import Chance from "chance";
import {DATA_SET, getUserRequestData} from "../../../helpers/apiDataGenerators";
import {createUser, deleteUser, getUserByUserName} from "../../../helpers/userApiRequests";


describe('Test for user DELETE', () => {

    it('Positive: Delete user data', () => {
        let requestData = getUserRequestData(DATA_SET.MAX);
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', String(requestData.id));
        })
        deleteUser(requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.code).to.eq(200);
            expect(response.body).to.have.property('message', requestData.username);
            expect(response.body).to.have.property('type', 'unknown');
        })
        getUserByUserName(requestData.username, false).then(response => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message', 'User not found');
            expect(response.body).to.have.property('type', 'error');
        })
    });

    it('Positive: Delete the same user twice', () => {
        let requestData = getUserRequestData();
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', String(requestData.id));
        })
        deleteUser(requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', requestData.username);
        })
        deleteUser(requestData.username, false).then(response => {
            expect(response.status).to.eq(404);
        })
    });

    it('Negative: Delete non-existing user', () => {
        let username = getUserRequestData().username;
        deleteUser(username, false).then(response => {
            expect(response.status).to.eq(404);
        })
    });

    it('Negative: Delete by invalid non-existing username - integer instead of string', () => {
        let username = Chance().integer();
        deleteUser(username, false).then(response => {
            expect(response.status).to.eq(404);
        })
    });

    it('Negative: Delete by invalid non-existing username - symbolic string', () => {
        let username = Chance().string({length:500, symbols:true});
        deleteUser(username, false).then(response => {
            expect(response.status).to.be.within(400, 405);
        })
    });

    it('Negative: Delete user without username', () => {
        let username = {};
        deleteUser(username, false).then(response => {
            expect(response.status).to.be.eq(400);
        })
    });
})