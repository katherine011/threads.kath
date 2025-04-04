"use client";

import React, { useState } from "react";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../../firebase";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebaseConfig";
import Input from "../__atoms/Input";
import Button from "../__atoms/Button";

interface FormValues {
  email: string;
  password: string;
  name: string;
  username: string;
}

const schema = yup.object().shape({
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

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const router = useRouter();

  const saveUserData = async (id: string, name: string, username: string) => {
    try {
      await setDoc(doc(db, "users", id), {
        name: name,
        username: username,
        createdAt: new Date(),
      });
      console.log("User data saved in Firestore!");
    } catch (error) {
      console.error("Error saving user data:", error);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      await saveUserData(userCredential.user.uid, data.name, data.username);

      console.log("User registered:", userCredential.user);

      console.log(userCredential.user);

      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
        if (error.code === "auth/email-already-in-use") {
          setErrorMessage(
            "The email is already in use. Please try logging in."
          );
        } else {
          setErrorMessage("An error occurred. Please try again.");
          console.error("Firebase Error:", error.message);
        }
      } else {
        setErrorMessage("Unknown error occurred.");
        console.error(error);
      }
    }
  };

  return (
    <div className="z-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[370px] flex flex-col items-center justify-between mt-36 gap-3"
      >
        <h1 className="text-[#000000] text-inter text-base font-semibold mb-3">
          Create a new Threads account
        </h1>
        {errorMessage && (
          <span className="text-red-500 text-inter text-base font-semibold absolute mt-5 ">
            {errorMessage}
          </span>
        )}

        <Input
          text="text"
          placeholder="Enter Your Email"
          register={register("email")}
          error={errors.email?.message}
        />

        <Input
          text="password"
          placeholder="Password"
          register={register("password")}
          error={errors.password?.message}
        />

        <Input
          text="text"
          placeholder="Full Name"
          register={register("name")}
          error={errors.name?.message}
        />

        <Input
          text="text"
          placeholder="Username"
          register={register("username")}
          error={errors.username?.message}
        />

        <Button button="Sign Up" type="submit" />
      </form>

      <div className="w-[370px] h-[86px] mb-7 rounded-[14px] outline-1 border mt-5 flex flex-col items-center justify-center cursor-pointer">
        <h1 className="text-[#000000] text-inter text-base font-semibold">
          Already have an account?
        </h1>
        <Link
          href={"/login"}
          className="text-zinc-900 hover:text-slate-600 text-inter text-base font-extrabold"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
