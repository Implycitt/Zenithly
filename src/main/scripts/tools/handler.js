function handleError(err) {
  if (err) {
    console.error("an error has occurred:", err);
    return
  }
}

export { handleError }
