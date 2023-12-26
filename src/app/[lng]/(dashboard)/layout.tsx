import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="">
			{children}
		</div>
	);
};

export default DashboardLayout;
