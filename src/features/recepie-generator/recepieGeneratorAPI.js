export function fetchUserMacros(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://healthy-eating-app-backend.onrender.com/api/usermacros?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        resolve(data);
      } else {
        const error = await response.json();
        reject(error.error);
      }
    } catch (error) {
      reject(error.message);
    }
  });
}

export async function generateMealPlans(prompt) {
  try {
    const response = await fetch('https://healthy-eating-app-backend.onrender.com/api/generate-meal-plans', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.completion;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  } catch (error) {
    throw new Error(error.message);
  }
}