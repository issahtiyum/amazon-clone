export function searchForProduct() {
  const yourSearch = document.querySelector('.js-search-bar').value
  window.location.href = `amazon.html?search=${yourSearch}`
}