"use client";
interface Props {
	color?: string;
	width?: string;
	height?: string;
}

export function Pay({
	color = "#121E6C",
	width = "20px",
	height = "20px",
}: Readonly<Props>) {
	return (
		<svg width={width} height={height} viewBox="0 0 20 20">
			<g clipPath="url(#datafono-icon_inline_svg__a)" fill={color}>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M6.775.01h6.348c1.232 0 2.04.421 2.521 1.09.463.643.574 1.448.574 2.124v14.328a2.926 2.926 0 01-.732 2.065.4.4 0 11-.599-.53c.367-.414.557-.955.532-1.507V3.224c0-.612-.106-1.215-.424-1.657-.3-.417-.84-.758-1.871-.758H6.74L6.724.807A2 2 0 004.558 2.98l.001.018V8.66a.4.4 0 01-.8 0V3.033A2.799 2.799 0 016.776.01z"
				></path>
				<path d="M14.147 4.879H5.8c-.124 0-.224.1-.224.224V7.87c0 .123.1.223.224.223h8.348c.124 0 .224-.1.224-.223V5.103c0-.124-.1-.224-.224-.224z"></path>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M3.872 17.385a.4.4 0 01.4-.4A2.615 2.615 0 016.886 19.6a.4.4 0 01-.8 0 1.815 1.815 0 00-1.814-1.815.4.4 0 01-.4-.4z"
				></path>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M3.872 15.354a.4.4 0 01.4-.4A4.646 4.646 0 018.917 19.6a.4.4 0 01-.8 0 3.846 3.846 0 00-3.845-3.846.4.4 0 01-.4-.4z"
				></path>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M8.54 15.346a5.998 5.998 0 00-4.266-1.743.4.4 0 11-.005-.8 6.797 6.797 0 016.84 6.797.4.4 0 01-.8 0 5.997 5.997 0 00-1.77-4.254z"
				></path>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M3.872 11.22a.4.4 0 01.4-.4 8.78 8.78 0 018.78 8.78.4.4 0 01-.8 0 7.98 7.98 0 00-7.98-7.98.4.4 0 01-.4-.4z"
				></path>
			</g>
			<defs>
				<clipPath id="datafono-icon_inline_svg__a">
					<path d="M0 0h20v20H0z"></path>
				</clipPath>
			</defs>
		</svg>
	);
}
