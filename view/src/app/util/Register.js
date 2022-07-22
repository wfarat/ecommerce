export const registerUser = async (data) => {
  const res = await fetch('http://localhost:3000/users/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    body: JSON.stringify(data),
  });
  const resJson = await res.json();
  return resJson.user;
};
