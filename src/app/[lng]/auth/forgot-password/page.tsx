"use client";

import { useState } from "react";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";
import httpClient, { API } from "@/helpers/httpClient";

const ForgotPassword = () => {
    const { status } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { lng } = useParams() || {};
    const { t } = useTranslation(lng as string, "auth");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ email: string, password: string }>({
        resolver: zodResolver(z.object({
            email: z.string().min(1, { message: "Email is required." }).email("Invalid email format"),
        })),
    });

    const onSubmit = async (d: any) => {
        setLoading(true);
        setError("")
        try {
            const result = await httpClient.post(`${API}/auth/forgot-password`, {
                email: d.email,
            });
            setLoading(false)
            if (result?.error) {
                let errorMessage = result?.error;
                try {
                    const errorBody = JSON.parse(result.error);
                    errorMessage = errorBody.error || result?.error;
                    setError(errorMessage)
                } catch (e) {
                    setError((e as Error).message)
                    setLoading(false);
                }
                setLoading(false);
            }
        } catch (error) {
            setError((error as Error).message)
            setLoading(false);
        }
    }
    if (status === "authenticated") {
        redirect("/dashboard");
    }
    if (status === "unauthenticated") {
        return (
            <div className="flex flex-col pt-32 w-full h-full min-h-screen">
                <div className="text-center pb-16 text-2xl font-semibold">
                    Welcome to UMS
                </div>
                {error !== "" && <div className="text-center py-2 text-red-500 capitalize">{error}</div>}
                <div className="flex justify-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="py-3 lg:w-80 min-w-80">
                            <input
                                {...register("email")}
                                type="text"
                                placeholder="Email"
                                className="input input-bordered w-full" />
                        </div>
                        <div className="py-3 capitalize">
                            <Link
                                href={`/${lng}/auth/login`}
                                className="font-normal text-primary"
                            >
                                {t("back to login")}
                            </Link>
                        </div>
                        <button type="submit" className="btn btn-active btn-secondary border-0 text-white w-full">Forgot Password</button>
                    </form>
                </div>
            </div>
        );
    }
};

export default ForgotPassword;
