export const createCard = async ({ name, set, token }) => {
  const res = await fetch("http://localhost:5000/api/cards/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      name,
      set,
    }),
  });
  if (res.ok) {
    return res.json();
  } else {
    return res.text();
  }
};

export const deleteCard = async ({ id, token }) => {
  const res = await fetch(`http://localhost:5000/api/cards/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return res.text();
};
