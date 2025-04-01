import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import * as yup from "yup";

export interface FormValues {
  email: string;
  password: string;
  name: string;
  username: string;
}

export const signUp = async (data: FormValues) => {
  const router = useRouter();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    console.log(userCredential.user);

    router.push("/login");
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
};

export const schema = yup.object().shape({
  email: yup
    .string()
    .required()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),

  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Password must be at least 8 characters, with a number, lowercase and uppercase letter"
    ),

  username: yup
    .string()
    .required()
    .matches(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/),

  name: yup
    .string()
    .required()
    .matches(/.*\S.*/),
});
