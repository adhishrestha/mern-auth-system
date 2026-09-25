import { reauthSchema } from "../features/auth/validators/auth.validator.js";

const tests = [
  {
    name: "Password method with password",
    data: {
      method: "password",
      password: "CurrentPassword123",
    },
    shouldPass: true,
  },
  {
    name: "Password method without password",
    data: {
      method: "password",
    },
    shouldPass: false,
  },
  {
    name: "Google method with idToken",
    data: {
      method: "google",
      idToken: "google-id-token",
    },
    shouldPass: true,
  },
  {
    name: "Google method without idToken",
    data: {
      method: "google",
    },
    shouldPass: false,
  },
  {
    name: "Invalid authentication method",
    data: {
      method: "facebook",
    },
    shouldPass: false,
  },
];

for (const test of tests) {
  const result = reauthSchema.safeParse(test.data);

  const passed = result.success === test.shouldPass;

  console.log(`${passed ? "PASS" : "FAIL"} - ${test.name}`);

  if (!passed) {
    console.log(result.error?.issues);
  }
}
