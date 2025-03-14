const https = require("https");

function loginAndGetSessionValue() {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            email: "a@pm.com",
            password: "a@pm.com",
        });

        const options = {
            hostname: "localhost",
            port: 3000,
            path: "/api/auth/login", // Updated path
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Content-Length": Buffer.byteLength(postData),
            },
            rejectUnauthorized: false, // Ignore SSL certificate errors
        };

        const req = https.request(options, (res) => {
            let data = "";
            const cookies = res.headers["set-cookie"] || [];

            // Find the session cookie
            const sessionCookie = cookies.find((cookie) =>
                cookie.startsWith("flowboard-flowboard-cosc310-session=")
            );

            res.on("data", (chunk) => {
                data += chunk;
            });

            res.on("end", () => {
                if (sessionCookie) {
                    // Extract only the value part before the first semicolon
                    const sessionValue = sessionCookie.split("=")[1].split(";")[0];
                    resolve(sessionValue);
                } else {
                    reject("Session cookie not found");
                }
            });
        });

        req.on("error", (err) => reject(err));

        req.write(postData);
        req.end();
    });
}

// Export the function to be used in other files
module.exports = { loginAndGetSessionValue };
