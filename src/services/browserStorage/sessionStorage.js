/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-param-reassign */
/* Javascript snippet to use HTML5 sessionStorage easily. 
 Properly handles situation like 'sessionStorage not being supported by the browser' and excedding sessionSorage quota.
 Supports storing any kind of data */

/* key should be String, value can be any Javascript object */
export function writeToSessionStorage(key, value) {
  if (typeof Storage === "undefined") {
    alert(
      "Your browser doesn't support HTML5 SessionStorage which this site make use of. Some features may not be available. Consider upgrading your browser to the latest version"
    );
    return false;
  }

  value = JSON.stringify(value); // serializing non-string data types to string

  try {
    window.sessionStorage.setItem(key, value);
  } catch (e) {
    if (e === "QUOTA_EXCEEDED_ERR") {
      alert("Session storage Quota exceeded! .Clearing sessionStorage");
      sessionStorage.clear();
      window.sessionStorage.setItem(key, value); // Try saving the preference again
    }
  }

  return true;
}

export function readFromSessionStorage(key) {
  if (typeof Storage === "undefined") {
    // Broswer doesnt support session storage
    return null;
  }

  const value = JSON.parse(sessionStorage.getItem(key));
  return value;
}
