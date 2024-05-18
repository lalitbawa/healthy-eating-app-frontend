export function fetchMeditation() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://healthy-eating-app-backend.onrender.com/api/meditation");

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