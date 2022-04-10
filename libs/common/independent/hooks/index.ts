import { useEffect, useRef, useState } from 'react';

// Credit to [React Hook: Detect Scroll Direction](https://www.robinwieruch.de/react-hook-scroll-direction/)
const THRESHOLD = 0;
export const useScrollVerticalDirection = () => {
	const [scrollDirection, setScrollDirection] = useState<
		'up' | 'down' | 'none'
	>('up');

	const blocking = useRef(false);
	const prevScrollY = useRef(0);

	useEffect(() => {
		prevScrollY.current = window.pageYOffset;

		const updateScrollDirection = () => {
			const scrollY = window.pageYOffset;

			if (Math.abs(scrollY - prevScrollY.current) >= THRESHOLD) {
				const newScrollDirection =
					scrollY > prevScrollY.current ? 'down' : 'up';

				setScrollDirection(newScrollDirection);

				prevScrollY.current = scrollY > 0 ? scrollY : 0;
			}

			blocking.current = false;
		};

		const onScroll = () => {
			if (!blocking.current) {
				blocking.current = true;
				window.requestAnimationFrame(updateScrollDirection);
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => window.removeEventListener('scroll', onScroll);
	}, [scrollDirection]);

	return scrollDirection;
};

const hoc = {
	useScrollVerticalDirection,
};

export default hoc;
