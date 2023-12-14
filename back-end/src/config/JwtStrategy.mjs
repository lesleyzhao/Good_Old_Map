import passportJWT from "passport-jwt";
import User from "../models/User.mjs";

const ExtractJwt = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy

// how the token is extracted and verified from the request
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //fromAuthHeaderWithScheme("jwt")
  secretOrKey: process.env.JWT_SECRET,
}

const jwtVerifyToken = async function (jwt_payload, done) {
  console.log("JWT payload received", jwt_payload) // debugging

  // TODO: token expiration check

  // match user in database
  try {
    const user = await User.findOne({ uuid: jwt_payload.uuid })
    if (!user) return done(null, false)
    return done(null, user)
  } catch (error) {
    return done(err, false, {message: error.message})
  }
}

const JwtStrategy = new Strategy(jwtOptions, jwtVerifyToken)

export default JwtStrategy