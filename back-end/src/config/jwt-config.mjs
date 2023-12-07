import passportJWT from "passport-jwt";
import User from "../models/User.mjs";

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.ExtractJwt

// how the token is extracted and verified from the request
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"), //fromAuthHeaderAsBearerToken()
  secretOrKey: process.env.JWT_SECRET,
}

const jwtVerifyToken = async function (jwt_payload, done) {
  console.log("JWT payload received", jwt_payload) // debugging

  // token expiration

  // match user in database
  try {
    const user = await User.findOne({ uuid: jwt_payload.uuid })
    if (!user) throw {jwtMessage: "user not found"}
    return done(null, user)

  } catch (error) {
    return done(null, false, {message: error.jwtMessage})
  }
}

const CustomJwtStrategy = () => {
  return new JwtStrategy(jwtOptions, jwtVerifyToken)
}

export default CustomJwtStrategy