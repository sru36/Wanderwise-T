document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const reviewForm = document.getElementById('reviewForm');
  const submitButton = document.getElementById('submitReview');
  const loginRequiredDiv = document.getElementById('loginRequired');
  const userEmailSpan = document.getElementById('userEmail');
  const reviewImageInput = document.getElementById('reviewImage');
  const imagePreviewDiv = document.getElementById('imagePreview');
  
  // Check user authentication status when page loads
  checkAuthStatus();
  
  // Event Listeners
  reviewForm.addEventListener('submit', handleReviewSubmit);
  reviewImageInput.addEventListener('change', handleImagePreview);

  // Check if the user is authenticated
  async function checkAuthStatus() {
      try {
          const response = await fetch('/api/auth/check-status', {
              method: 'GET',
              credentials: 'include', // Include cookies for session-based auth
          });
          
          const data = await response.json();
          
          if (response.ok && data.isAuthenticated) {
              // User is logged in
              userEmailSpan.textContent = data.user.email;
              loginRequiredDiv.classList.add('hidden');
              submitButton.disabled = false;
          } else {
              // User is not logged in
              userEmailSpan.textContent = 'Not logged in';
              loginRequiredDiv.classList.remove('hidden');
              submitButton.disabled = true;
          }
      } catch (error) {
          console.error('Error checking authentication status:', error);
          showNotification('Server error. Please try again later.', 'error');
          loginRequiredDiv.classList.remove('hidden');
          submitButton.disabled = true;
      }
  }
  
  // Handle the review submission
  async function handleReviewSubmit(event) {
      event.preventDefault();
      
      // Get form values
      const rating = document.querySelector('input[name="rating"]:checked')?.value;
      const reviewText = document.getElementById('reviewText').value;
      const locationSelect = document.getElementById('locationSelect');
      const location = locationSelect.value;
      const reviewImage = document.getElementById('reviewImage').files[0];
      
      // Validate form
      if (!rating) {
          showNotification('Please select a rating', 'error');
          return;
      }
      
      if (!reviewText.trim()) {
          showNotification('Please enter your review', 'error');
          return;
      }

      if (!location) {
          showNotification('Please select a location', 'error');
          return;
      }
      
      // Create FormData to handle file upload
      const formData = new FormData();
      formData.append('rating', rating);
      formData.append('reviewText', reviewText);
      formData.append('location', location);
      if (reviewImage) {
          formData.append('reviewImage', reviewImage);
      }
      
      // Submit the review
      try {
          submitButton.disabled = true;
          submitButton.textContent = 'Submitting...';
          
          const response = await fetch('/api/reviews/create', {
              method: 'POST',
              body: formData,
              credentials: 'include', // Include cookies for session-based auth
          });
          
          const data = await response.json();
          
          if (response.ok) {
              showNotification('Review submitted successfully!', 'success');
              // Reset form
              reviewForm.reset();
              imagePreviewDiv.innerHTML = '';
              // Redirect to thank you page after 2 seconds
              setTimeout(() => {
                  window.location.href = '../html/thankyou.html';
              }, 2000);
          } else {
              showNotification(data.message || 'Error submitting review', 'error');
              submitButton.disabled = false;
              submitButton.textContent = 'Submit Review';
          }
      } catch (error) {
          console.error('Error submitting review:', error);
          showNotification('Server error. Please try again later.', 'error');
          submitButton.disabled = false;
          submitButton.textContent = 'Submit Review';
      }
  }
  
  // Handle image preview
  function handleImagePreview(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      // Validate file is an image
      if (!file.type.startsWith('image/')) {
          showNotification('Please select an image file', 'error');
          event.target.value = '';
          return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
          showNotification('Image size should be less than 5MB', 'error');
          event.target.value = '';
          return;
      }
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = function(e) {
          imagePreviewDiv.innerHTML = '';
          const img = document.createElement('img');
          img.src = e.target.result;
          img.className = 'preview-img';
          img.alt = 'Preview image';
          imagePreviewDiv.appendChild(img);
      };
      reader.readAsDataURL(file);
  }
  
  // Show notification
  function showNotification(message, type) {
      // Remove any existing notification
      const existingNotification = document.querySelector('.notification');
      if (existingNotification) {
          existingNotification.remove();
      }
      
      // Create new notification
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.textContent = message;
      
      // Add to DOM
      document.body.appendChild(notification);
      
      // Show notification
      setTimeout(() => {
          notification.classList.add('show');
      }, 10);
      
      // Hide notification after 5 seconds
      setTimeout(() => {
          notification.classList.remove('show');
          setTimeout(() => {
              notification.remove();
          }, 500);
      }, 5000);
  }
});