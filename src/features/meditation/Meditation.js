import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMeditationAsync, selectMeditation } from './meditationSlice';

export default function Meditation() {
  const dispatch = useDispatch();
  const meditation = useSelector(selectMeditation);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMeditation, setSelectedMeditation] = useState(null);
  const [timer, setTimer] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMeditationAsync());
  }, [dispatch]);

  const handleStartClick = (exercise) => {
    setSelectedMeditation(exercise);
    setShowPopup(true);
    setTimer(exercise.duration * 60); // Convert minutes to seconds
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedMeditation(null);
    setTimer(null);
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleTimerStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
  };

  const handleTimerPause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleTimerStop = () => {
    setTimer(selectedMeditation.duration * 60); // Convert minutes to seconds
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ... */}
      <div className="mt-8 flow-root">
        {/* ... */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell">
                  Description
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Duration
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden sm:table-cell">
                  Instructions
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">Start</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {meditation.map((exercise) => (
                <tr key={exercise.name}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {exercise.name}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">{exercise.description}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{exercise.duration} min</td>
                  <td className="px-3 py-4 text-sm text-gray-500 hidden sm:table-cell">{exercise.instructions}</td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button
                      onClick={() => handleStartClick(exercise)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Start<span className="sr-only">, {exercise.name}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPopup && selectedMeditation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="relative w-full max-w-md p-4 mx-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={handlePopupClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  {selectedMeditation.Name}
                </h3>
                <p className="mb-4 text-gray-500">{selectedMeditation.Instructions}</p>
                <p className="mb-4 text-gray-500">Duration: {selectedMeditation.duration} min</p>
                <div className="flex flex-col space-y-4">
                  <button
                    type="button"
                    className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-700 border border-transparent rounded-md shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isRunning ? 'bg-red-600 hover:bg-red-700' : ''
                    }`}
                    onClick={isRunning ? handleTimerPause : handleTimerStart}
                  >
                    {isRunning ? 'Pause' : 'Start'} ({formatTime(timer)})
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleTimerStop}
                  >
                    Stop
                  </button>
                </div>
                {timer === 0 && (
                  <p className="mt-4 text-green-500">Your meditation is completed!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}