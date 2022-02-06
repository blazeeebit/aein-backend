exports.verifyUser = (user, token) => {
    const verify = `Welcome ${user} to Aein.com please click the following link to confirm your registration ${process.env.URL}verifyaccount/${token}/${user}`;
    return verify;
    
}