import passport from "passport"

const authenticatePrivate = (req, res, next) => {
  passport.authenticate('jwt', { session: false })
  // TODO: authenticate jwt for /auth/ routes
  // console.log(Object.getPrototypeOf(passport.authenticate))
  next()
}

export default authenticatePrivate