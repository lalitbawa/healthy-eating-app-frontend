import React, { useState } from 'react';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const notificationMethods = [
  { id: 'male', title: 'Male' },
  { id: 'female', title: 'Female' },
];

const activityLevels = [
  { id: 'bmr', title: 'Basal Metabolic Rate', value: 1 },
  { id: 'sedentary', title: 'Sedentary : Little or no exercise', value: 1.2 },
  { id: 'light', title: 'Light : Light exercise or sports 1-3 days a week', value: 1.375 },
  { id: 'moderate', title: 'Moderate : Moderate exercise or sports 3-5 days a week', value: 1.55 },
  { id: 'active', title: 'Active : Daily exercise or intense exercise 3-4 days a week', value: 1.725 },
  { id: 'veryActive', title: 'Very Active : Intense exercise 6-7 days a week', value: 1.9 },
  { id: 'extraActive', title: 'Extra Active : Very intense exercise daily, or physical job', value: 2.05 },
];

const goals = [
  { id: 'mildLoss', title: 'Mild weight loss of 0.5lb (0.25 kg) per week', value: -250 },
  { id: 'loss', title: 'Weight loss of 1.0lb (0.5 kg) per week', value: -500 },
  { id: 'extremeLoss', title: 'Extreme weight loss of 2.0lb (1 kg) per week', value: -1000 },
  { id: 'mildGain', title: 'Mild weight gain of 0.5lb (0.25 kg) per week', value: 250 },
  { id: 'gain', title: 'Weight gain of 1.0lb (0.5 kg) per week', value: 500 },
  { id: 'extremeGain', title: 'Extreme weight gain of 2.0lb (1 kg) per week', value: 1000 },
  { id: 'maintain', title: 'Maintain weight', value: 0 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CalorieCounter() {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState(activityLevels[0]);
  const [goal, setGoal] = useState(goals[6]);
  const [stats, setStats] = useState(null);

  const calculateCalories = (e) => {
    e.preventDefault();

    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }

    const maintenance = bmr * activityLevel.value;
    const targetCalories = maintenance + goal.value;

    const protein = weight * 2.2;
    const fat = (targetCalories * 0.25) / 9;
    const carbs = (targetCalories - protein * 4 - fat * 9) / 4;

    setStats([
      { name: 'Protein', stat: `${Math.round(protein)}g` },
      { name: 'Carbs', stat: `${Math.round(carbs)}g` },
      { name: 'Fat', stat: `${Math.round(fat)}g` },
      { name: 'Food Energy', stat: `${Math.round(targetCalories)} kcal` },
    ]);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Count Your Macros and Calories
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={calculateCalories}>
          <div>
            <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
              Enter your Age (18-80)
            </label>
            <div className="mt-2">
              <input
                id="age"
                name="age"
                type="number"
                min="18"
                max="80"
                autoComplete="age"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Height (cm)
              </label>
            </div>
            <div className="mt-2">
              <input
                id="height"
                name="height"
                type="number"
                required
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Weight (kg)
              </label>
            </div>
            <div className="mt-2">
              <input
                id="weight"
                name="weight"
                type="number"
                required
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <fieldset className="mt-4">
              <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                {notificationMethods.map((notificationMethod) => (
                  <div key={notificationMethod.id} className="flex items-center">
                    <input
                      id={notificationMethod.id}
                      name="notification-method"
                      type="radio"
                      checked={gender === notificationMethod.id}
                      onChange={() => setGender(notificationMethod.id)}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor={notificationMethod.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                      {notificationMethod.title}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>

          <div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {activityLevel.title}
                  <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                <Menu.Items className="absolute left-0 right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {activityLevels.map((level) => (
                      <Menu.Item key={level.id}>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => setActivityLevel(level)}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block w-full px-4 py-2 text-left text-sm'
                            )}
                          >
                            {level.title}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <div>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  {goal.title}
                  <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                <Menu.Items className="absolute left-0 right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {goals.map((goalItem) => (
                      <Menu.Item key={goalItem.id}>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => setGoal(goalItem)}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                              'block w-full px-4 py-2 text-left text-sm'
                            )}
                          >
                            {goalItem.title}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Calculate
            </button>
          </div>
        </form>
      </div>

      {stats && (
        <div className="mt-10">
          <h3 className="text-base font-semibold leading-6 text-gray-900 p-2">Your Calories</h3>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {stats.map((item) => (
              <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
                <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}