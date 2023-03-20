const apiUrl = 'http://localhost:8080/categories';

export const getCategories = () => {
  return fetch(apiUrl).then((response) => {
    return response.json();
  });
};
