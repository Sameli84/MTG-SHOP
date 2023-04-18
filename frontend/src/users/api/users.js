export const signUpUser = async ({ name, email, password }) => {
  const res = await fetch("http://localhost:5000/api/users/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
  if (res.ok) {
    return res.json();
  } else {
    return res.text();
  }
};

export const loginUser = async ({ email, password }) => {
  const res = await fetch("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  return await res.json();
};
