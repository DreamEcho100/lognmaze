import { Disclosure, Transition } from '@headlessui/react';
// import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { FaChevronUp } from 'react-icons/fa';

export default function FAQs({
	faqs
}: {
	faqs: { question: string; answer: string }[];
}) {
	if (faqs.length === 0) return <></>;

	return (
		<div className='w-full p-4'>
			<div className='color-theme-50 mx-auto w-full max-w-md rounded-2xl'>
				{faqs.map((faq) => (
					<Disclosure defaultOpen key={faq.question}>
						{({ open }) => (
							<>
								<Disclosure.Button className='color-theme-primary-700 hover:color-theme-primary-600 flex w-full justify-between rounded-lg px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-theme-primary-bg-300 focus-visible:ring-opacity-75'>
									<span>{faq.question}</span>
									<FaChevronUp
										className={`${
											open ? 'rotate-180 transform' : ''
										} h-5 w-5 text-theme-primary-bg-300`}
									/>
								</Disclosure.Button>

								<Transition
									enter='transition duration-100 ease-out'
									enterFrom='transform scale-95 opacity-0'
									enterTo='transform scale-100 opacity-100'
									leave='transition duration-75 ease-out'
									leaveFrom='transform scale-100 opacity-100'
									leaveTo='transform scale-95 opacity-0'
								>
									<Disclosure.Panel className='bg-theme-bg-100/25 px-4 pt-4 pb-2 text-sm text-theme-text-100'>
										{faq.answer}
									</Disclosure.Panel>
								</Transition>
							</>
						)}
					</Disclosure>
				))}
			</div>
		</div>
	);
}
