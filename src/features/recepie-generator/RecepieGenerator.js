import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectMealPlans, fetchUserMacrosAsync, generateMealPlansAsync } from './recepieGeneratorSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { selectUserMacros } from '../calorie-counter/calorieCounterSlice';

export default function RecepieGenerator() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  const userMacros = useSelector(selectUserMacros);
  const mealPlans = useSelector(selectMealPlans);
  const status = useSelector((state) => state.recepieGenerator.status);

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchUserMacrosAsync(loggedInUser.id));
    }
  }, [dispatch, loggedInUser]);

  const generateMealPlans = () => {
    if (userMacros.length === 0) {
      return;
    }

    const { protein, carbs, fat, calories } = userMacros[0];

    const prompt = `
      Based on the following macros:
      - Protein: ${protein}g
      - Carbs: ${carbs}g
      - Fat: ${fat}g
      - Calories: ${calories} kcal

      Generate 3 different meal plans that meet these macronutrient requirements. also include the total calories,nutrition and instructions for cooking and ingredients for each meal plan. also do not show any extra prompts in the start and the end of the meal plan. as this is a recipe generator and not a chatbot.
    `;

    dispatch(generateMealPlansAsync(prompt));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Recipe Generator</h1>
      {userMacros.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Your Macros</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Protein:</p>
              <p>{userMacros[0].protein}g</p>
            </div>
            <div>
              <p className="font-semibold">Carbs:</p>
              <p>{userMacros[0].carbs}g</p>
            </div>
            <div>
              <p className="font-semibold">Fat:</p>
              <p>{userMacros[0].fat}g</p>
            </div>
            <div>
              <p className="font-semibold">Calories:</p>
              <p>{userMacros[0].calories} kcal</p>
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6"
            onClick={generateMealPlans}
          >
            Generate Meal Plans
          </button>
        </div>
      )}
      {status === 'loading' && (
        <div>
        <div className="flex items-center justify-center space-x-2 mt-8">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-75"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-225"></div>
        </div>
        <p className="text-center mt-4">Generating meal plans...</p>
        </div>
      )}
      {mealPlans && mealPlans.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Generated Meal Plans</h2>
          <div className="bg-gray-100 p-6 rounded shadow">
            {mealPlans.map((plan, index) => (
              <div key={index} className="mb-6">
                <p className="whitespace-pre-wrap">{plan.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

