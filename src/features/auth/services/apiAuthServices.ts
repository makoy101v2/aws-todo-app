import { signUp, confirmSignUp, signIn } from "@aws-amplify/auth";

interface GenericAuthParams {
  email: string;
  password: string;
}

interface ConfirmUserParams {
  email: string;
  code: string;
}

export const registerUser = async (params: GenericAuthParams) => {
  try {
    const { email, password } = params;
    const result = await signUp({ username: email, password });
    return result;
  } catch (error) {
    console.error("Error registering user:", error);
  }
};

export const confirmationCode = async (params: ConfirmUserParams) => {
  try {
    const result = await confirmSignUp({
      username: params.email,
      confirmationCode: params.code,
    });
    return result;
  } catch (error) {
    console.error("Error confirming code:", error);
    throw error;
  }
};

export const loginUser = async (params: GenericAuthParams) => {
  try {
    const { email, password } = params;
    const result = await signIn({ username: email, password });
    return result;
  } catch (error) {
    console.error("Error confirming code:", error);
    throw error;
  }
};
