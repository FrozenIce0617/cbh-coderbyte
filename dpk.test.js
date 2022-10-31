const { deterministicPartitionKey } = require("./dpk");

// long string with 257 length
const longStr =
  "63ae7cf12a92ee8f51bc2d7cf91b116cd79966680bddc65a318dc5e9714b41eacad8d3bcb22f7649296c299d5ef520575361913559139a8f1383d3881133f64b63ae7cf12a92ee8f51bc2d7cf91b116cd79966680bddc65a318dc5e9714b41eacad8d3bcb22f7649296c299d5ef520575361913559139a8f1383d3881133f64b1";

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the key when given `clipboardhealth` as input", () => {
    const trivialKey = deterministicPartitionKey("clipboardhealth");
    expect(trivialKey).toBe(
      "9e06120a275b1628add805c98568b83ae2fb5866223ae3b7beca2f128de0d36a712f1d9b9b1f088f0ac6ee1e6b0b19da497f46934fadc675c1f4bfd7a92137cc"
    );
  });

  it("Returns the stringified number when partition key is given as input", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: 20221031 });
    expect(trivialKey).toBe("20221031");
  });

  it("Returns the same partition key when the partition key is given and string", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: "20221031" });
    expect(trivialKey).toBe("20221031");
  });

  it("Returns the hash digest based on stringified event when partion key is not given", () => {
    const trivialKey = deterministicPartitionKey({ noPartitionKey: 20221031 });
    expect(trivialKey).toBe(
      "63ae7cf12a92ee8f51bc2d7cf91b116cd79966680bddc65a318dc5e9714b41eacad8d3bcb22f7649296c299d5ef520575361913559139a8f1383d3881133f64b"
    );
  });

  it("Returns only 128 length string when the length of partition key is greater than 256", () => {
    const trivialKey = deterministicPartitionKey({ partitionKey: longStr });
    expect(trivialKey.length).toBe(128);
  });
});
