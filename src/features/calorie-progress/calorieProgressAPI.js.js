export function addCalories(calories) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://healthy-eating-app-backend.onrender.com/api/usertracker", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(calories),
      });

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error.error);
      }
    } catch (error) {
      reject(error.message);
    }
  });
}

export function fetchUserTracker(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://healthy-eating-app-backend.onrender.com/api/usertracker?userId=${userId}`);

      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error.error);
      }
    } catch (error) {
      reject(error.message);
    }
  });
}