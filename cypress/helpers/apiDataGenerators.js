import {Chance} from "chance";
import {USER_LIMIT} from "./dataLimits";

let chance = Chance();

export const DATA_SET = {MIN: "min", MAX: "max", RANDOM: "random"};

export const getUserRequestData = (param = DATA_SET.MAX) => {
    return (param === DATA_SET.MAX) ?
    {
        id: getRandomUserId(),
        username: chance.string({length: USER_LIMIT.username.max, alpha: true, numeric: true}),
        firstName: chance.string({length: USER_LIMIT.firstName.max}),
        lastName: chance.string({length: USER_LIMIT.lastName.max}),
        email: chance.string({length: USER_LIMIT.email.max}),
        password: chance.string({length: USER_LIMIT.password.max}),
        phone: chance.string({length: USER_LIMIT.phone.max}),
        userStatus: getRandomUserStatus()

    } : (param === DATA_SET.MIN) ? 
    {
        id: getRandomUserId(),
        username: chance.string({length: USER_LIMIT.username.min, alpha: true, numeric: true}),
        firstName: chance.string({length: USER_LIMIT.firstName.min}),
        lastName: chance.string({length: USER_LIMIT.lastName.min}),
        email: chance.string({length: USER_LIMIT.email.min}),
        password: chance.string({length: USER_LIMIT.password.min}),
        phone: chance.string({length: USER_LIMIT.phone.min}),
        userStatus: getRandomUserStatus()

    } :
    {
        id: getRandomUserId(),
        username: chance.string({length: chance.integer({
            min: USER_LIMIT.username.min, 
            max: USER_LIMIT.username.max}), alpha: true, numeric: true}),
        firstName: chance.string({length: chance.integer({
            min: USER_LIMIT.firstName.min, 
            max: USER_LIMIT.firstName.max})}),
        lastName: chance.string({length: chance.integer({
            min: USER_LIMIT.lastName.min, 
            max: USER_LIMIT.lastName.max})}),
        email: chance.string({length: chance.integer({
            min: USER_LIMIT.email.min, 
            max: USER_LIMIT.email.max})}),
        password: chance.string({length: chance.integer({
            min: USER_LIMIT.password.min, 
            max: USER_LIMIT.password.max})}),
        phone: chance.string({length: chance.integer({
            min: USER_LIMIT.phone.min, 
            max: USER_LIMIT.phone.max})}),
        userStatus: getRandomUserStatus()
    };
}

export const getRandomUserId = () => {
    return chance.integer({
        min: USER_LIMIT.id.minValue, 
        max: USER_LIMIT.id.maxValue
    });
}

export const getRandomUserStatus = () => {
    return chance.integer({
        min: USER_LIMIT.userStatus.minValue,
        max: USER_LIMIT.userStatus.maxValue
    });
}