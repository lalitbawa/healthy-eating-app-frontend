import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCaloriesAsync, selectUserTracker, fetchUserTrackerAsync } from './calorieProgressSlice';
import { selectLoggedInUser } from '../auth/authSlice';
import { selectUserMacros } from '../calorie-counter/calorieCounterSlice';
import { Fragment } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CalorieProgressBar() {
  const dispatch = useDispatch();
  const userMacros = useSelector(selectUserMacros);
  const loggedInUser = useSelector(selectLoggedInUser);
  const userTracker = useSelector(selectUserTracker);
  const [caloriesConsumed, setCaloriesConsumed] = useState('');
  const [foodEaten, setFoodEaten] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (loggedInUser) {
      dispatch(fetchUserTrackerAsync(loggedInUser.id));
    }
  }, [dispatch, loggedInUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addCaloriesAsync({ calories: parseInt(caloriesConsumed), food: foodEaten }));
    setCaloriesConsumed('');
    setFoodEaten('');
  };

  const calorie = userMacros.find((macro) => macro.userId === loggedInUser?.id);
  const consumedCalories = userTracker.reduce((total, entry) => {
    const entryDate = new Date(entry.date);
    if (
      entry.userId === loggedInUser?.id &&
      entryDate.toDateString() === selectedDate.toDateString()
    ) {
      return total + entry.calories;
    }
    return total;
  }, 0);
  const progressPercentage = ((consumedCalories / calorie?.calories) * 100) || 0;

  const lastDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
    const isToday = date.toDateString() === new Date().toDateString();
    const isSelected = date.toDateString() === selectedDate.toDateString();
    const hasMeals = userTracker.some(
      (entry) =>
        entry.userId === loggedInUser?.id &&
        new Date(entry.date).toDateString() === date.toDateString()
    );
    days.push({ date, isToday, isSelected, hasMeals });
  }

  const meals = userTracker.filter(
    (entry) =>
      entry.userId === loggedInUser?.id &&
      new Date(entry.date).toDateString() === selectedDate.toDateString()
  );

  const handlePreviousMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1));
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {calorie ? (
            <div className="grid grid-cols-2 gap-4">
              {/* Render user macros in square boxes */}
              <div className="bg-gray-100 p-4 rounded-lg">Protein: {calorie.protein}g</div>
              <div className="bg-gray-100 p-4 rounded-lg">Carbs: {calorie.carbs}g</div>
              <div className="bg-gray-100 p-4 rounded-lg">Fat: {calorie.fat}g</div>
              <div className="bg-gray-100 p-4 rounded-lg">Calories: {calorie.calories} kcal</div>
            </div>
          ) : (
            <p>No macro data available.</p>
          )}

          <div className="mt-8">
            {/* Progress bar */}
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${progressPercentage}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    progressPercentage < 25
                      ? 'bg-yellow-500'
                      : progressPercentage >= 80 && progressPercentage <= 100
                      ? 'bg-green-500'
                      : progressPercentage > 100
                      ? 'bg-red-500'
                      : 'bg-blue-500'
                  }`}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Calories consumed: {consumedCalories} / {calorie?.calories || 0} kcal
            </p>
            {progressPercentage > 100 && (
              <p className="text-sm text-red-500">You are exceeding your ideal calorie goal.</p>
            )}
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="foodEaten" className="block text-sm font-medium leading-6 text-gray-900">
                  What did you eat?
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="foodEaten"
                  name="foodEaten"
                  type="text"
                  required
                  value={foodEaten}
                  onChange={(e) => setFoodEaten(e.target.value)}
                  placeholder="What did you eat?"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="caloriesConsumed" className="block text-sm font-medium leading-6 text-gray-900">
                  Total calories
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="caloriesConsumed"
                  name="caloriesConsumed"
                  type="number"
                  required
                  value={caloriesConsumed}
                  onChange={(e) => setCaloriesConsumed(e.target.value)}
                  placeholder="Total calories"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <div className="flex items-center">
          <h2 className="flex-auto text-sm font-semibold text-gray-900">
            {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            type="button"
            className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            onClick={handlePreviousMonth}
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            onClick={handleNextMonth}
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
          <div>S</div>
        </div>
        <div className="mt-2 grid grid-cols-7 text-sm">
          {days.map((day, dayIdx) => (
            <div key={day.date.toISOString()} className={classNames(dayIdx > 6 && 'border-t border-gray-200', 'py-2')}>
              <button
                type="button"
                className={classNames(
                  day.isSelected && 'text-white',
                  !day.isSelected && day.isToday && 'text-indigo-600',
                  !day.isSelected && !day.isToday && 'text-gray-900',
                  day.isSelected && day.isToday && 'bg-indigo-600',
                  day.isSelected && !day.isToday && 'bg-gray-900',
                  !day.isSelected && 'hover:bg-gray-200',
                  (day.isSelected || day.isToday) && 'font-semibold',
                  day.hasMeals && 'underline',
                  'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                )}
                onClick={() => setSelectedDate(day.date)}
              >
                <time dateTime={day.date.toISOString()}>{day.date.getDate()}</time>
              </button>
            </div>
          ))}
        </div>
        <section className="mt-12">
          {meals.length > 0 ? (
            <>
              <h2 className="text-base font-semibold leading-6 text-gray-900">
                Your Meals for <time dateTime={selectedDate.toISOString()}>{selectedDate.toDateString()}</time>
              </h2>
              <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {meals.map((entry) => (
                  <li key={entry.id} className="group flex items-center space-x-4 rounded-xl px-4 py-2 focus-within:bg-gray-100 hover:bg-gray-100">
                    <div className="flex-auto">
                      <p className="text-gray-900">{entry.food}</p>
                      <p className="mt-0.5">{entry.calories} calories</p>
                    </div>
                    <Menu as="div" className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100">
                      <div>
                        <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                          <span className="sr-only">Open options</span>
                          <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  
                                  className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  Edit
                                </div>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <div
                                  
                                  className={classNames(
                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                    'block px-4 py-2 text-sm'
                                  )}
                                >
                                  Delete
                                </div>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <p className="mt-4 text-sm leading-6 text-gray-500">No data available for this date.</p>
          )}
        </section>
      </div>
    </div>
  );
}