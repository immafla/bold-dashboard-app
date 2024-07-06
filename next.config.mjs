/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: "https://bold-fe-api.vercel.app/api/:path*",
			},
		];
	},
};

export default nextConfig;
