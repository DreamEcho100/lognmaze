import Section1 from '@components/Home/Section1';

const Home = ({ userExist = false, news, newsFetchRouteQuery }) => {
	return (
		<main className='main'>
			<Section1
				news={news}
				userExist={userExist}
				newsFetchRouteQuery={newsFetchRouteQuery}
			/>
		</main>
	);
};

export default Home;
