import type { inferRouterInputs } from '@trpc/server';
import type { AppRouter } from '@server/trpc/router/_app';
import type { ReactNode } from 'react';

import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { cx } from 'class-variance-authority';
import { useTypedSession } from '@utils/common/hooks';
import { BsFillPersonFill } from 'react-icons/bs';
import FormField from '@components/shared/common/FormField';
import { trpcAPI } from '@utils/trpc';
import { useState } from 'react';
import { UserGender } from '@prisma/client';
import { reloadSession } from '@utils/common/next-auth';
import Button from '@components/shared/common/Button';
import { useRouter } from 'next/router';

interface Props {
	children: ReactNode;
}

const CompleteUserProfile = () => {
	const router = useRouter();
	const [formValues, setFormValues] = useState<
		inferRouterInputs<AppRouter>['users']['profiles']['createOne']
	>({
		education: '',
		firstName: '',
		gender: UserGender.M,
		lastName: '',
		work: '',
		bio: undefined,
		coverPhoto: undefined,
		profilePicture: undefined
	});

	const createUserProfile = trpcAPI.users.profiles.createOne.useMutation({
		onSuccess: (result) => {
			reloadSession();
			router.push(`/users/${result.username}`);
		}
	});

	return (
		<section className='section-p'>
			<form
				className='mx-auto flex max-w-md flex-col gap-8'
				onSubmit={(event) => {
					event.preventDefault();
					if (createUserProfile.isLoading) return;

					createUserProfile.mutate(formValues);
				}}
			>
				<FormField
					labelText='First Name'
					name='firstName'
					values={formValues}
					setValues={setFormValues}
				/>
				<FormField
					labelText='Last Name'
					name='lastName'
					values={formValues}
					setValues={setFormValues}
				/>
				<FormField
					labelText='Profile Picture'
					name='profilePicture'
					values={formValues}
					setValues={setFormValues}
				/>
				<FormField
					labelText='Cover Photo'
					name='coverPhoto'
					values={formValues}
					setValues={setFormValues}
				/>
				<FormField
					labelText='Education'
					name='education'
					values={formValues}
					setValues={setFormValues}
				/>
				<FormField
					labelText='Work'
					name='work'
					values={formValues}
					setValues={setFormValues}
				/>
				<fieldset className='flex gap-2'>
					<FormField
						inputVariants={{ animation: null }}
						type='radio'
						labelText='Male'
						name='gender'
						value={UserGender.M}
						onChange={(event) =>
							event.target.checked &&
							setFormValues((prev) => ({ ...prev, gender: UserGender.M }))
						}
					/>
					<FormField
						inputVariants={{ animation: null }}
						type='radio'
						labelText='Female'
						name='gender'
						value={UserGender.F}
						onChange={(event) =>
							event.target.checked &&
							setFormValues((prev) => ({ ...prev, gender: UserGender.F }))
						}
					/>
				</fieldset>
				<FormField
					isA='textarea'
					labelText='bio'
					name='bio'
					values={formValues}
					setValues={setFormValues}
				/>
				<Button disabled={createUserProfile.isLoading}>Submit</Button>
				{createUserProfile.isError && <>{createUserProfile.error.message}</>}
			</form>
		</section>
	);
};

const MainLayout = ({ children }: Props) => {
	const userState = useTypedSession();

	return (
		<>
			<header
				id='primary-header'
				className={cx(
					'flex h-primary-header',
					'fixed top-0 left-0 right-0 z-10'
				)}
			>
				<nav
					className={cx(
						'color-theme-primary-700 mx-auto max-w-primary font-bold',
						'flex h-full w-full items-center justify-between px-4 sm:px-6'
					)}
				>
					<Link href='/' className='text-h5 font-black'>
						LogNMaze
					</Link>

					<ul className='flex h-full items-center gap-2'>
						{userState.status === 'authenticated' && (
							<li className='flex items-center'>
								<Link
									href={`/users/${userState.data.user.name}`}
									className={cx(
										'rounded-lg border-[0.25rem] border-transparent p-1',
										'duration-400 transition-all',
										'hover:border-theme-primary-bg-400',
										'focus:border-theme-primary-bg-500'
									)}
								>
									<BsFillPersonFill />
								</Link>
							</li>
						)}
						<li>
							{userState.status === 'authenticated' ? (
								<button
									onClick={() => signOut()}
									className={cx(
										'rounded-lg border-[0.25rem] border-transparent p-1',
										'duration-400 transition-all',
										'hover:border-theme-primary-bg-400',
										'focus:border-theme-primary-bg-500'
									)}
								>
									Sign Out
								</button>
							) : (
								<Link
									href='/auth'
									className={cx(
										'rounded-lg border-[0.25rem] border-transparent p-1',
										'duration-400 transition-all',
										'hover:border-theme-primary-bg-400',
										'focus:border-theme-primary-bg-500',
										userState.status === 'loading'
											? 'pointer-events-none cursor-not-allowed select-none grayscale-[75%]'
											: undefined
									)}
								>
									Sign In
								</Link>
							)}
						</li>
					</ul>
				</nav>
			</header>
			<main
				id='primary-content'
				className='color-theme-50 mx-auto mt-primary-header flex min-h-primary-screen max-w-primary flex-col'
			>
				{userState.data && !userState.data.user.role ? (
					<CompleteUserProfile />
				) : (
					children
				)}
			</main>
			<footer id='primary-footer' className={cx('h-primary-footer flex')}>
				<div className='color-theme-primary-700 mx-auto h-full w-full max-w-primary p-8 font-bold'>
					<nav className={cx('flex flex-col gap-2 capitalize')}>
						<ul>
							<li>
								<a
									href='/sitemap.xml'
									target='_blank'
									rel='noopener noreferrer'
								>
									sitemap
								</a>
							</li>
							<li>
								<Link href='/tools'>Tools</Link>
							</li>
						</ul>
					</nav>
				</div>
			</footer>
		</>
	);
};

export default MainLayout;
