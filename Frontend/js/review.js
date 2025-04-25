document.getElementById('reviewForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const rating = document.getElementById('rating').value;
  const reviewText = document.getElementById('reviewText').value;
  const reviewImage = document.getElementById('reviewImage').files[0];

  const formData = new FormData();
  formData.append('rating', rating);
  formData.append('reviewText', reviewText);
  if (reviewImage) {
    formData.append('reviewImage', reviewImage);
  }

  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      window.location.href = data.redirect;
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert('Error submitting review. Please try again.');
    console.error('Review submission error:', error);
  }
});
