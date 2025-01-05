import * as EmailValidator from 'email-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { registerUser } from '../database/schems';
import { serialize } from 'cookie';

export async function POST(req) {
  try {
    const body = await req.json();
    const { userName, email, password, confirmPassword } = body;

    // Validation checks
    const isValidateEmail = EmailValidator.validate(email);
    const isValidatePassword = password.length > 7;
    const isValidateConfirmPassword = password === confirmPassword;

    if (!isValidateEmail) {
      return new Response(JSON.stringify({ message: 'Invalid email!' }), { status: 400 });
    }

    if (!isValidatePassword) {
      return new Response(JSON.stringify({ message: 'Password must contain at least 8 characters!' }), { status: 400 });
    }

    if (!isValidateConfirmPassword) {
      return new Response(JSON.stringify({ message: "Passwords don't match!" }), { status: 400 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Generate a random token
    const randomToken = jwt.sign({ iat: Math.floor(Date.now()) }, process.env.JWT_SECRET);

    // Check if the user already exists
    const isUserExists = await registerUser.findAll({ where: { email } });

    if (isUserExists.length > 0) {
      return new Response(JSON.stringify({ message: 'Email already exists!' }), { status: 400 });
    }

    // Register the new user
    const registerNewUser = await registerUser.create({
      userName,
      email,
      password: hashPassword,
      loginUserId: randomToken,
    });

    if (registerNewUser) {

      return new Response(
        JSON.stringify({ message: 'Registration successful!' }),
        {
          status: 201,
        }
      );
    } else {
      return new Response(JSON.stringify({ message: 'Something went wrong during registration!' }), { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500 });
  }
}
