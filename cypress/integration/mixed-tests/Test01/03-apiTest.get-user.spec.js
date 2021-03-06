import {DATA_SET, getUserRequestData} from "../../../helpers/apiDataGenerators";
import {createUser, getUserByUserName} from "../../../helpers/userApiRequests";

describe('Test for user GET', () => {

    it('Positive: Get user data', () => {
        let requestData = getUserRequestData(DATA_SET.MAX);
        createUser(requestData).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', String(requestData.id));
        })
        getUserByUserName(requestData.username).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.deep.equal(requestData);
        })
    });

    it('Negative: Username does not exist ', () => {
        let requestData = getUserRequestData().username;
        getUserByUserName(requestData, false).then(response => {
            console.log(response);
            expect(response.status).to.eq(404);
            expect(response.body.code).to.eq(1);
            expect(response.body).to.have.property('message', 'User not found');
            expect(response.body).to.have.property('type', 'error');   
        })
    });

    it('Negative: Username is a random numeric value instead of string', () => {
        let requestData = getUserRequestData().id;
        getUserByUserName(requestData, false).then(response => {
            console.log(response);
            expect(response.status).to.eq(404);
            expect(response.body.code).to.eq(1);
            expect(response.body).to.have.property('message', 'User not found');
            expect(response.body).to.have.property('type', 'error');   
        })
    });

    it('Negative: Username is a symbolic string', () => {
        let requestData = ({username: '*%$%$%@$#@@#@#!!()'});
        getUserByUserName(requestData, false).then(response => {
            console.log(response);
            expect(response.status).to.eq(400);
        })
    });

    it('Negative: Username is an empty string', () => {
        getUserByUserName('', false).then(response => {
            console.log(response);
            expect(response.status).to.eq(405); 
        })
    });

})