function handleError(err) {
  if (err) {
    console.error("an error has occurred:", err);
    return
  }
}

function handlePromises(promise) {
  promise.then( (result) => {
    return result
  })
}

export { handlePromises, handleError }
