import admin from "../config/firebase.js";
import { AppError } from "../utils/appError.js";
import  User  from "../models/User.js";
import {generateToken} from "./../utils/generateToken.js";
import type { GoogleAuthInput } from "../validators/googleAuth.validator.js";



const safeUser = (user: InstanceType<typeof User>) => ({
  id: user._id,
  alias: user.alias,
  email: user.email,
  empathyScore: user.empathyScore,
  role: user.role,
});
 

export const googleSignIn = async ({ idToken }: GoogleAuthInput) => {
 
  let decodedToken;
  try {
    decodedToken = await admin.auth().verifyIdToken(idToken);idToken
  } catch {
    throw new AppError("Invalid Google token", 401);
  }
 
  const { email, uid } = decodedToken;
 
  if (!email) {
    throw new AppError("Google account has no email", 400);
  }
 

  let user = await User.findOne({ email });
 
  if (user) {
 
    if (!user.googleId) {
      user.googleId = uid;
      await user.save();
    }
  } else {
   
    user = await User.create({ email, googleId: uid });
  }
 
 
  const token = generateToken(user._id.toString());
 
  return {
    token,
    user: safeUser(user),
    isNewUser: !user.googleId, 
  };
};
