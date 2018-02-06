const dotenv = require('dotenv');
const { format } = require('util');

dotenv.config();

const { MongoClient, Logger } = require('mongodb');
const connStr = format(
  'mongodb://%s:%s@%s,%s/%s?replicaSet=%s',
  process.env.MONGO_USERNAME,
  process.env.MONGO_PASSWORD,
  process.env.MONGO_REPLICA1,
  process.env.MONGO_REPLICA2,
  process.env.MONGO_DATABASE,
  process.env.MONGO_REPLICA_SET
);
const caBase64 = 'LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURyekNDQXBlZ0F3SUJBZ0lRQ0R2Z1ZwQkNSckdoZFdySldaSEhTakFOQmdrcWhraUc5dzBCQVFVRkFEQmgKTVFzd0NRWURWUVFHRXdKVlV6RVZNQk1HQTFVRUNoTU1SR2xuYVVObGNuUWdTVzVqTVJrd0Z3WURWUVFMRXhCMwpkM2N1WkdsbmFXTmxjblF1WTI5dE1TQXdIZ1lEVlFRREV4ZEVhV2RwUTJWeWRDQkhiRzlpWVd3Z1VtOXZkQ0JEClFUQWVGdzB3TmpFeE1UQXdNREF3TURCYUZ3MHpNVEV4TVRBd01EQXdNREJhTUdFeEN6QUpCZ05WQkFZVEFsVlQKTVJVd0V3WURWUVFLRXd4RWFXZHBRMlZ5ZENCSmJtTXhHVEFYQmdOVkJBc1RFSGQzZHk1a2FXZHBZMlZ5ZEM1agpiMjB4SURBZUJnTlZCQU1URjBScFoybERaWEowSUVkc2IySmhiQ0JTYjI5MElFTkJNSUlCSWpBTkJna3Foa2lHCjl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUE0anZoRVhMZXFLVFRvMWVxVUtLUEMzZVF5YUtsN2hMT2xsc0IKQ1NETUFaT25UakMzVS9kRHhHa0FWNTNpalNMZGh3WkFBSUVKenM0Ymc3L2Z6VHR4UnVMV1pzY0ZzM1luRm85NwpuaDZWZmU2M1NLTUkydGF2ZWd3NUJtVi9TbDBmdkJmNHE3N3VLTmQwZjNwNG1WbUZhRzVjSXpKTHYwN0E2RnB0CjQzQy9keEMvL0FIMmhkbW9SQkJZTXFsMUdOWFJvcjVINGlkcTlKb3orRWtJWUl2VVg3UTZoTCtocWtwTWZUN1AKVDE5c2RsNmdTemVSbnR3aTVtM09GQnFPYXN2K3piTVVaQmZIV3ltZU1yL3k3dnJUQzBMVXE3ZEJNdG9NMU8vNApnZFc3alZnL3RSdm9TU2lpY05veEJOMzNzaGJ5VEFwT0I2anRTajFldFgramtNT3ZKd0lEQVFBQm8yTXdZVEFPCkJnTlZIUThCQWY4RUJBTUNBWVl3RHdZRFZSMFRBUUgvQkFVd0F3RUIvekFkQmdOVkhRNEVGZ1FVQTk1UU5WYlIKVEx0bThLUGlHeHZEbDdJOTBWVXdId1lEVlIwakJCZ3dGb0FVQTk1UU5WYlJUTHRtOEtQaUd4dkRsN0k5MFZVdwpEUVlKS29aSWh2Y05BUUVGQlFBRGdnRUJBTXVjTjZwSUV4SUsrdDFFbkU5U3NQVGZyZ1QxZVhrSW95UVkvRXNyCmhNQXR1ZFhIL3ZUQkgxakx1RzJjZW5Ubm1DbXJFYlhqY0tDaHpVeUltWk9Na1hEaXF3OGN2cE9wLzJQVjVBZGcKMDZPL25Wc0o4ZFdPNDFQMGptUDZQNmZidEdiZlltYlcwVzVCamZJdHRlcDNTcCtkV09JcldjQkFJKzB0S0lKRgpQbmxVa2lhWTRJQklxRGZ2OE5aNVlCYmVyT2dPelc2c1JCYzRMMG5hNFVVK0tyazJVODg2VUFiM0x1akVWMGxzCllTRVkxUVN0ZUR3c09vQnJwK3V2RlJUcDJJbkJ1VGhzNHBGc2l2OWt1WGNsVnpEQUd5U2o0ZHpwMzBkOHRiUWsKQ0FVdzdDMjlDNzlGdjFDNXFmUHJtQUVTcmNpSXhwZzBYNDBLUE1icDFaV1ZiZDQ9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K';
const sslCA = new Buffer(caBase64, 'base64').toString('utf8');
const connOptions = {
  ssl: true,
  sslValidate: true,
  sslCA: sslCA
}

Logger.setLevel('debug');

console.info('========= app started');

MongoClient.connect(connStr, connOptions)
.then((client) => {
  setTimeout(() => {
    // Do work here on the client instance...
    // Just wasting time to let debug messages show
    // Authentication failed messages even when nothing
    // is going on
    client.close();
    console.info('========== app stpped');
    process.exit(0);
  }, 60000);
})
.catch((err) => {
  // Catch any errors in creating connection
  console.error(err);
  process.exit(1);
});
