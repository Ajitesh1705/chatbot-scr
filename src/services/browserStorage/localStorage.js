/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
/* Javascript snippet to use HTML5 localStorage easily. 
 Properly handles situation like 'localStorage not being supported by the browser' and excedding localSorage quota.
 Supports storing any kind of data */

/* key should be String, value can be any Javascript object */
export function writeToLocalStorage(key, value) {
  if (typeof Storage === "undefined") {
    alert(
      "Your browser doesn't support HTML5 LocalStorage which this site make use of. Some features may not be available. Consider upgrading your browser to the latest version"
    );
    return false;
  }

  value = JSON.stringify(value); // serializing non-string data types to string

  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    if (e === "QUOTA_EXCEEDED_ERR") {
      alert("Local storage Quota exceeded! .Clearing localStorage");
      localStorage.clear();
      window.localStorage.setItem(key, value); // Try saving the preference again
    }
  }

  return true;
}

export function readFromLocalStorage(key) {
  if (typeof Storage === "undefined") {
    // Broswer doesnt support local storage
    return null;
  }

  const value = JSON.parse(localStorage.getItem(key));
  return value;
}
