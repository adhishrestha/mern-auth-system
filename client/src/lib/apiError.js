const getApiErrorMessage = (error) => {
  // Backend responded with an error.
  if (error.response) {
    return (
      error.response.data?.message || 'Something went wrong. Please try again.'
    );
  }

  // Request was sent, but the server didn't respond.
  if (error.request) {
    return 'Unable to connect to the server. Please check your connection and try again.';
  }

  // Something went wrong before the request was sent.
  return error.message || 'Something went wrong. Please try again.';
};

export { getApiErrorMessage };
