import classes from './Test.module.css';

const Test = () => {
	return (
		<section>
			<div className={classes['temp-test']}>
				<header className={classes['temp-header']}>
					<div className={classes['temp-logo']}>temp-logo</div>
					<nav>
						<ul>
							<li>T</li>
							<li>E</li>
							<li>S</li>
							<li>T</li>
						</ul>
					</nav>
				</header>
				<main className={classes['temp-main']}>
					<div
						className={`${classes['temp-container']} ${classes['bg-color']}`}
					>
						<div className={classes['temp-content']}>
							<div className={classes['special-colors']}>
								<p className={classes['font-color']}>
									Special Colors <br /> Font Color
								</p>
								<p className={classes['font-color-light']}>
									Special Colors <br /> Font Color Light
								</p>
								<p className={classes['font-color-dark']}>
									Special Colors <br /> Font Color Dark
								</p>
							</div>

							<div className={classes['special-colors-light']}>
								<p className={classes['font-color']}>
									Special Colors light <br /> Font Color
								</p>
								<p className={classes['font-color-light']}>
									Special Colors light <br /> Font Color Light
								</p>
								<p className={classes['font-color-dark']}>
									Special Colors light <br /> Font Color Dark
								</p>
							</div>

							<div className={classes['special-colors-dark']}>
								<p className={classes['font-color']}>
									Special Colors Dark <br /> Font Color
								</p>
								<p className={classes['font-color-light']}>
									Special Colors Dark <br /> Font Color Light
								</p>
								<p className={classes['font-color-dark']}>
									Special Colors Dark <br /> Font Color Dark
								</p>
							</div>
						</div>
					</div>

					<div
						className={`${classes['temp-container']} ${classes['bg-color-light']}`}
					>
						<div className={classes['temp-content']}>
							<div className={classes['special-colors']}>
								<p className={classes['font-color']}>
									Special Colors <br /> Font Color
								</p>
								<p className={classes['font-color-light']}>
									Special Colors <br /> Font Color Light
								</p>
								<p className={classes['font-color-dark']}>
									Special Colors <br /> Font Color Dark
								</p>
							</div>

							<div className={classes['special-colors-light']}>
								<p className={classes['font-color']}>
									Special Colors light <br /> Font Color
								</p>
								<p className={classes['font-color-light']}>
									Special Colors light <br /> Font Color Light
								</p>
								<p className={classes['font-color-dark']}>
									Special Colors light <br /> Font Color Dark
								</p>
							</div>

							<div className={classes['special-colors-dark']}>
								<p className={classes['font-color']}>
									Special Colors Dark <br /> Font Color
								</p>
								<p className={classes['font-color-light']}>
									Special Colors Dark <br /> Font Color Light
								</p>
								<p className={classes['font-color-dark']}>
									Special Colors Dark <br /> Font Color Dark
								</p>
							</div>
						</div>
					</div>

					<div
						className={`${classes['temp-container']} ${classes['bg-color-dark']}`}
					>
						<div className={classes['temp-content']}>
							<div className={classes['special-colors']}>
								<p className={classes['font-color']}>
									Special Colors <br /> Font Color
								</p>
								<p className={classes['font-color-light']}>
									Special Colors <br /> Font Color Light
								</p>
								<p className={classes['font-color-dark']}>
									Special Colors <br /> Font Color Dark
								</p>
							</div>

							<div className={classes['special-colors-light']}>
								<p className={classes['font-color']}>
									Special Colors light <br /> Font Color
								</p>
								<p className={classes['font-color-light']}>
									Special Colors light <br /> Font Color Light
								</p>
								<p className={classes['font-color-dark']}>
									Special Colors light <br /> Font Color Dark
								</p>
							</div>

							<div className={classes['special-colors-dark']}>
								<p className={classes['font-color']}>
									Special Colors Dark <br /> Font Color
								</p>
								<p className={classes['font-color-light']}>
									Special Colors Dark <br /> Font Color Light
								</p>
								<p className={classes['font-color-dark']}>
									Special Colors Dark <br /> Font Color Dark
								</p>
							</div>
						</div>
					</div>
				</main>
			</div>
		</section>
	);
};

export default Test;
