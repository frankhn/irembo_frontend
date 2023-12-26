"use client";

import { redirect } from "next/navigation";

function Home() {
	redirect("/auth/login");
}

export default Home;
