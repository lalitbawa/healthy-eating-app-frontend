export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://healthy-eating-app-backend.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
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

export function checkUser(loginData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://healthy-eating-app-backend.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        resolve({ user: data });
      } else {
        const error = await response.json();
        reject(error.error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: 'success' });
  });
}