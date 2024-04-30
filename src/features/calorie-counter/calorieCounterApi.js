export function createUserMacros(userMacros) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:3000/api/usermacros", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userMacros),
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