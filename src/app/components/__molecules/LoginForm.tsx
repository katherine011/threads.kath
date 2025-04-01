"use client";

import React, { useState } from "react";
import Input from "../__atoms/Input";
import Button from "../__atoms/Button";
import Image from "next/image";
import Icon1 from "../../../icons/images.png";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../../firebase";
import { useRouter } from "next/navigation";

interface FormValues {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "wrong password, please try again."
    ),
});

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const UserAuth = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(UserAuth.user);

      router.push("/");
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return (
    <div className="w-[370px] h-[500px] flex flex-col items-center justify-center z-20 mt-28">
      <h1 className="text-[#000000] text-inter text-base font-semibold mb-3">
        Log in with your account
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[370px] h-[185px] flex justify-between flex-col"
      >
        <Input
          text="text"
          placeholder="Username, phone or email"
          register={register("email")}
          error={errors.email?.message}
        />
        <Input
          text="password"
          placeholder="Password"
          register={register("password")}
          error={errors.password?.message}
        />
        <Button button="Log in" type="submit" />
      </form>

      <p className="text-[#999999] mb-5 mt-3 cursor-pointer">
        Forgotten password?
      </p>
      <p className="text-[#999999]">— or —</p>
      <Link href={"/register"}>
        <div className="w-[370px] h-[86px] rounded-[14px] outline-1 border mt-5 p-5 pl-9 flex flex-row items-center cursor-pointer">
          <Image
            src={Icon1}
            alt="thread icon"
            width={20}
            height={20}
            className="w-[45px] h-[45px] "
            priority
          />
          <h1 className="text-[#000000] text-inter text-base font-semibold ml-8">
            Create new account
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default LoginForm;
