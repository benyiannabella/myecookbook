import React, { useEffect, useState } from 'react';
import Recipe from '../models/Recipe';
import { GetRecipesByCategoryId } from '../services/RecipeService';
import ImageWrapper from '../components/wrapper-components/ImageWrapper';
import { useLocation } from 'react-router-dom';
import { random } from '@ctrl/tinycolor';
import Accordion from '../components/wrapper-components/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons';

const CategoryRecipes: React.FunctionComponent = () => {
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const location = useLocation();
	const { categoryId } = location.state;

	useEffect(() => {
		const getRecipes = async () => {
			await GetRecipesByCategoryId(categoryId || '').then((response) => {
				if (response.data) {
					setRecipes(response.data);
				}
			});
		};
		if (categoryId) {
			getRecipes();
		}
	}, [categoryId]);
	return (
		<div className="recipes-container">
			{recipes && recipes.length > 0 ? (
				recipes.map((recipe) => {
					return (
						<Accordion
							key={recipe.id}
							title={recipe.recipeName}
							bgColor={random({ luminosity: 'light' }).toHexString()}
							open
							role="button"
						>
							<ImageWrapper
								src={recipe?.image || ''}
								alt={recipe?.recipeName}
								width="250"
								height="250"
							/>
						</Accordion>
					);
				})
			) : (
				<div className="category-not-found">
					<FontAwesomeIcon icon={faFolderOpen} />
				</div>
			)}
		</div>
	);
};

export default CategoryRecipes;
