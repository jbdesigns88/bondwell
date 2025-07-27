import { validate } from "uuid";
import supabase from "../../../supabase";
import { em, option } from "framer-motion/client";

const app_url = process.env.APP_URL || 'https://bondwellapp.com';

export const signUpNewUser = async (email, password) => {
    try{
        if (!email || !password) {
            throw new Error('Email and password are required for sign up.');
        }
        validate(email);
        validate(password);
        
        if (!validate(email)) {
            throw new Error('Invalid email format.');
        }

        if( !validate(password)) {
            throw new Error('Invalid password format.');
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: app_url + '/auth/callback',
            }
        });

        if (error) {
            throw error;
        }

        console.log('User signed up successfully:', data);
        return data;
    }
    catch (error) {
        console.error('Error signing up new user:', error);
        throw error;
    }
}

export const SignInUser = async (provider = null,options = {}) => {
    if(!provider || provider === 'email') {
        const { email, password } = options;
        if (!email || !password) {
            throw new Error('Email and password are required for sign in.');
        }

         await signInUserWithEmail(email, password);
    }
}

const signInUserWithEmail = async (email,password) => {
    try {
        if (!email || !password) {
            throw new Error('Email and password are required for sign in.');
        }

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        }); 
        
        if (error) {
            throw error;
        }
        console.log('User signed in successfully:', data);
        return data;
    } catch (error) {
        console.error('Error signing in user with email:', error);
        throw error;
    }
}