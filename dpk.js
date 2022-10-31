const crypto = require("crypto");

// TODO: we should import these constants from another file or maybe from .env
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

// TODO: move to `utils` helper file
const createHashDigest = (data, algorithm = "sha3-512") =>
  crypto.createHash(algorithm).update(data).digest("hex");

// TODO: move to `utils` helper file
const isString = (value) => typeof value === "string";

exports.deterministicPartitionKey = (event) => {
  // return default value if event is not valid
  if (!event) return TRIVIAL_PARTITION_KEY;

  let candidate;

  if (event) {
    const { partitionKey } = event;
    candidate = partitionKey
      ? partitionKey
      : createHashDigest(JSON.stringify(event));
  }

  candidate = isString(candidate) ? candidate : JSON.stringify(candidate);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = createHashDigest(candidate);
  }

  return candidate;
};
