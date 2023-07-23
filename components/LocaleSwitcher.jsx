import { usePathname, useRouter } from 'next-intl/client';
import { useState } from 'react';

function LocaleSwitcher() {
	const pathname = usePathname();
	const router = useRouter();
	const [showPopover, setShowPopover] = useState(false);
	const [activeLocale, setActiveLocale] = useState(router.locale);

	const handleLocaleChange = (locale) => {
		router.replace(pathname, { locale });
		setActiveLocale(locale);
		setShowPopover(false);
	};

	return (
		<div className='flex items-center justify-center relative'>
			<svg
				className='w-6 h-6'
				id='Layer_1'
				data-name='Layer 1'
				viewBox='0 0 512 512'
				fill='blue'
				onClick={() => setShowPopover(!showPopover)}
			>
				<path d='M512,256c0,141.39-114.62,256-256,256S0,397.39,0,256,114.62,0,256,0,512,114.63,512,256ZM123,243.42a365.39,365.39,0,0,1,17.8-101.84l-85.52-.08a229.68,229.68,0,0,0-30,101.93ZM243.51,141.5H167.28A338.35,338.35,0,0,0,148,243.42h95.53Zm0-116.21c-26.92,24-49.63,55.13-66,91h66Zm-171.66,91h78.43a320.78,320.78,0,0,1,52.23-85C148.55,43.48,102.41,76,71.84,116.28ZM486.7,243.42a229.57,229.57,0,0,0-30-101.93l-85.53.08A365.52,365.52,0,0,1,389,243.42Zm-218.2,0H364a337.76,337.76,0,0,0-19.3-101.93H268.5Zm0-127.14h66c-16.42-35.86-39.13-66.95-66-91Zm41-85a320.19,320.19,0,0,1,52.23,85h78.42C409.59,76,363.45,43.48,309.5,31.3ZM25.31,268.57a229.63,229.63,0,0,0,30,101.94l85.52-.08A365.34,365.34,0,0,1,123,268.57Zm218.2,0H148a338.32,338.32,0,0,0,19.3,101.94h76.23Zm0,127.17h-66c16.42,35.86,39.13,66.92,66,91Zm-41,85a320.79,320.79,0,0,1-52.23-85H71.84C102.41,436,148.55,468.54,202.5,480.7ZM389,268.57a365.47,365.47,0,0,1-17.81,101.86l85.53.08a229.52,229.52,0,0,0,30-101.94ZM268.5,370.51h76.21A337.73,337.73,0,0,0,364,268.57H268.5Zm0,116.22c26.91-24.07,49.63-55.13,66-91h-66Zm171.65-91H361.73a320.19,320.19,0,0,1-52.23,85C363.45,468.54,409.59,436,440.15,395.74Z' />
			</svg>
			{showPopover && (
				<div className='absolute bg-white border flex flex-col top-8 left-0  border-gray-300 rounded p-2'>
					<button
						className={`px-2 py-1 ${
							activeLocale === 'en' ? 'text-red-500' : 'text-black'
						}`}
						onClick={() => handleLocaleChange('en')}
					>
						En
					</button>
					<button
						className={`px-2 py-1 ${
							activeLocale === 'tr' ? 'text-red-500' : 'text-black'
						}`}
						onClick={() => handleLocaleChange('tr')}
					>
						Tr
					</button>
				</div>
			)}
		</div>
	);
}

export default LocaleSwitcher;
