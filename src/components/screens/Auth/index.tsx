import type { BuiltInProviderType } from 'next-auth/providers';
import type { LiteralUnion, ClientSafeProvider } from 'next-auth/react';

import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { AiOutlineGoogle } from 'react-icons/ai';
import { cx } from 'class-variance-authority';
import { useTypedSession } from '@utils/common/hooks';

const AuthScreen = () => {
	const router = useRouter();
	const [providers, setProviders] = useState<Record<
		LiteralUnion<BuiltInProviderType, string>,
		ClientSafeProvider
	> | null>();
	const userState = useTypedSession();

	useEffect(() => {
		const setTheProviders = async () => {
			const setupProviders = await getProviders();
			setProviders(setupProviders);
		};
		setTheProviders();
	}, []);

	useEffect(() => {
		if (userState.status === 'authenticated') router.push('/');
	}, [router, userState.status]);

	if (userState.status === 'loading') return <>Loading...</>;

	return (
		<section className='section-p'>
			<div
				className={cx(
					'mx-auto flex w-full max-w-lg flex-col items-center gap-4 rounded-lg border-[0.25rem] border-theme-primary-bg-500 p-4',
					'transition-all duration-300',
					'hover:border-theme-primary-bg-400',
					'focus-within::border-theme-primary-bg-600'
				)}
			>
				<header>
					<h1 className='text-h1'>Login</h1>
				</header>
				<div className='flex w-full flex-col items-center justify-center'>
					{providers?.google && (
						<button
							type='button'
							onClick={() => signIn(providers.google.id)}
							className={cx(
								'flex w-full max-w-sm flex-wrap items-center justify-center bg-blue-500 px-8 py-2 text-h6 font-bold text-white',
								'dur-15duration-150 transition-all',
								'hover:bg-blue-400',
								'focus:ring-2 focus:ring-blue-600'
							)}
						>
							<AiOutlineGoogle />
							Google
						</button>
					)}
				</div>
			</div>
		</section>
	);
};

export default AuthScreen;
