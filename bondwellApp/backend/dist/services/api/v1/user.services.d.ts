interface UserDataType {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    username: string;
}
export declare const signUpNewUser: (input: UserDataType) => Promise<import("@supabase/postgrest-js").PostgrestSingleResponse<null>>;
export declare const SignInUser: (provider: null | undefined, options: UserDataType) => Promise<void>;
export {};
//# sourceMappingURL=user.services.d.ts.map