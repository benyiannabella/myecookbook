import React from 'react';
import RecipeForm from '../components/RecipeForm';
import RecipeCategory from '../models/RecipeCategory';

interface RecipeProps {
	categories: RecipeCategory[];
}

const Recipe: React.FunctionComponent<RecipeProps> = ({ categories }) => {
	return <RecipeForm categories={categories} />;
};

export default Recipe;
