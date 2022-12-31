import { websiteBasePath } from '@utils/core/app';
import { useMemo } from 'react';
import { useRouter } from 'next/router';

export const useGetFullURLPathName = () => {
	const router = useRouter();

	const pathname = useMemo(() => {
		let pathname = router.pathname;

		Object.entries(router.query).forEach((item) => {
			const key = item[0];
			const value = item[1];
			if (typeof value === 'string')
				pathname = pathname.replace(`[${key}]`, value);
		});

		return pathname;
	}, [router.pathname, router.query]);

	return `${websiteBasePath}${pathname}`;
};
