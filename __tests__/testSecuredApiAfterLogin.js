import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { describe, it, expect } from '@jest/globals';
const { loginAndGetSessionValue } = require("./getCookies");


const client = wrapper(axios.create({
    httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false  // Disable certificate validation
    })
}));

describe('api after login test', () => {
    it('check if respond code is 200', async () => {

        //get session cookie value first
        let key;
        try {
            key = await loginAndGetSessionValue();
            console.log("Session Cookie Value:", key);
        } catch (error) {
            console.error("Error:", error);
        }

        //add the key we just got to our request
        const response = await client.get("https://localhost:3000/api/tasks/getProjectTasks?workspaceId=67c3d4ff0007e9582c93", {
            headers: {
                'Cookie': `flowboard-flowboard-cosc310-session=${key}`
            }
        });

        //make request without cookies
        //const response = await client.get("https://localhost:3000");

        //check the response we got
        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();
    });
});
