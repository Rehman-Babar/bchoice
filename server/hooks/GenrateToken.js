import jwt from 'jsonwebtoken';

const jwttokenAndSetCookie = (userId, res) => {
    // Generate the JWT token with a payload containing the userId
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '2h'  // Token expiration time set to 2 hours
    });

    // Set the token as an HTTP-only cookie in the response
    res.cookie('jwtAdmin', token, {
        httpOnly: true,                  // Makes the cookie accessible only by the web server
        maxAge: 2 * 60 * 60 * 1000,      // Cookie expiry time set to 2 hours (milliseconds)
        sameSite: 'Strict',              // Restricts cookie access to the same site only
        secure:process.env.NODE_ENV === "production",// Secure cookie in production
    });

    return token;  // Return the token (useful if you also want to send it in the response body)
};

export default jwttokenAndSetCookie;
