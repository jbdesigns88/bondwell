 
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
import { getSupabaseClient } from 'supabase.js';
 
const supabase = getSupabaseClient()
import prisma from 'database/index.js';

const app_url = process.env.APP_URL || 'https://bondwellapp.com';
const db = prisma;

interface UserDataType {
  email:string,
  password:string
  firstname:string
  lastname:string
  username:string
}
export const signUpNewUser = async (input:UserDataType) => {
let supabase_user_id;
  try {
    const { email, password, firstname, lastname, username } = input;
    if (!email || !password) {
      throw new Error('Email and password are required for sign up.');
    }

    const {data, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${app_url}/auth/callback`,
      },
    });

    console.log(`USER RETUREND FROM SUPABASE: `,data)
    if(error){
        throw new Error('issue creating auth user: ',error)
    }
 
    if (!data || !data.user || !data.user || !data.user.id) {
      throw new Error('User ID not returned from Supabase.');
    }

    console.log(`should have user property: `,data)
    supabase_user_id = data.user.id;
   const createdUser = await supabase.from('public.users')
    .insert({
        id: supabase_user_id,
        firstname,
        lastname,
        username,
    });
    // const createdUser = await prisma.public_users.create({
    //   data: {
    //     id: supabase_user_id,
    //     firstname,
    //     lastname,
    //     username,
    //   },
    // });
    console.log(` the user id is ${supabase_user_id}`)
    console.log(`user succesfully created: `, createdUser)

    return createdUser;
  } catch (error) {
    await supabase.auth.admin.deleteUser(supabase_user_id || "");
    console.error('Error signing up new user:', error);
    throw error;
  }
};

 


export const SignInUser = async (provider = null,options:UserDataType) => {
    if(!provider || provider === 'email') {
        const { email, password } = options;
        if (!email || !password) {
            throw new Error('Email and password are required for sign in.');
        }

         await signInUserWithEmail(email, password);
    }
}

const signInUserWithEmail = async (email:string,password:string) => {
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