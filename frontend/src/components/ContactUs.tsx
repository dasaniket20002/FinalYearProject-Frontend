import React from "react";

const ContactUs = () => {
	return (
		<div className="pt-[6rem] px-8 md:px-32 min-h-[calc(50vh+6rem)]">
			<h1 className="text-gray-200 py-8 text-2xl font-medium">
				Reach out to us at
			</h1>
			<ul className="grid md:grid-cols-2 md:grid-rows-2 place-items-center gap-16">
				<li className="stagger flex flex-col gap-4 items-center w-full rounded p-8 hover:bg-gray-950">
					<div className="h-24 w-24 rounded-full overflow-hidden bg-red">
						<img
							src="/assets/images/avatar.png"
							alt=""
							className="h-full scale-125"
						/>
					</div>
					<span className="text-center">
						<h1 className="font-medium">Aniket Das</h1>
						<p className="text-xs">Role</p>
						<p className="py-2">
							aniket.das.cse24@heritageit.edu.in
						</p>
					</span>
				</li>
				<li className="stagger flex flex-col gap-4 items-center w-full rounded p-8 hover:bg-gray-950">
					<div className="h-24 w-24 rounded-full overflow-hidden bg-red">
						<img
							src="/assets/images/avatar.png"
							alt=""
							className="h-full scale-125"
						/>
					</div>
					<span className="text-center">
						<h1 className="font-medium">Ronit Das</h1>
						<p className="text-xs">Role</p>
						<p className="py-2">
							ronit.das.cse24@heritageit.edu.in
						</p>
					</span>
				</li>
				<li className="stagger flex flex-col gap-4 items-center w-full rounded p-8 hover:bg-gray-950">
					<div className="h-24 w-24 rounded-full overflow-hidden bg-red">
						<img
							src="/assets/images/avatar.png"
							alt=""
							className="h-full scale-125"
						/>
					</div>
					<span className="text-center">
						<h1 className="font-medium">Shinjini Chanda</h1>
						<p className="text-xs">Role</p>
						<p className="py-2">
							shinjini.chanda.cse24@heritageit.edu.in
						</p>
					</span>
				</li>
				<li className="stagger flex flex-col gap-4 items-center w-full rounded p-8 hover:bg-gray-950">
					<div className="h-24 w-24 rounded-full overflow-hidden bg-red">
						<img
							src="/assets/images/avatar.png"
							alt=""
							className="h-full scale-125"
						/>
					</div>
					<span className="text-center">
						<h1 className="font-medium">Ayan Majumder</h1>
						<p className="text-xs">Role</p>
						<p className="py-2">
							ayan.majumder.cse24@heritageit.edu.in
						</p>
					</span>
				</li>
			</ul>
		</div>
	);
};

export default ContactUs;
