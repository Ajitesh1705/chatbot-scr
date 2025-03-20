import getBrowserFingerprint from "get-browser-fingerprint";

const getIdentity = async () => {
  const identifier = await getBrowserFingerprint({
    enableWebgl: true,
  });
  return identifier.toString();
};

export default getIdentity;
