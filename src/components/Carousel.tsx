import { useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContextProvider';
import Card from './wrapper-components/Card';
import ImageWrapper from './wrapper-components/ImageWrapper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/swiper-bundle.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Recipe from '../models/Recipe';
import RecipeDetails from './RecipeDetails';

SwiperCore.use([Navigation, Pagination]);

const Carousel = () => {
	const { getFirstFiveRecipe, state, onModalOpened } = useGlobalContext();

	useEffect(() => {
		getFirstFiveRecipe();
	}, []);

	const handleOpenRecipe = (recipe: Recipe) => {
		onModalOpened(`${recipe.recipeName}`, <RecipeDetails recipe={recipe} />);
	};

	const renderSlides = state.recipes.map((recipe, index) => (
		<SwiperSlide
			key={index}
			onClick={() => handleOpenRecipe(recipe)}
		>
			<Card>
				<ImageWrapper
					src={recipe?.image || ''}
					alt={recipe?.recipeName}
					width="400"
					height="400"
				/>
			</Card>
		</SwiperSlide>
	));

	return (
		<Swiper
			spaceBetween={10}
			slidesPerView={3}
			centeredSlides={true}
			navigation
			pagination={{ clickable: true }}
			modules={[Navigation, Pagination, Autoplay]}
			autoplay={{
				delay: 2000,
				disableOnInteraction: false,
			}}
		>
			{renderSlides}
		</Swiper>
	);
};

export default Carousel;
