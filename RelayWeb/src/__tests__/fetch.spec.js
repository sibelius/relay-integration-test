it('fetches data', async () => {
  const response = await fetch('http://localhost:5000/graphql');

  const data = await response.text();

  expect(data).not.toBe(null);
});
