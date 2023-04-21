export const createCard = async ({name, set, token}) => {
    const res = await fetch(
      "http://localhost:5000/api/cards/",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          name,
          set
        })
      }
    );
    
    return await res.json();
  };