import "@testing-library/jest-dom";

// Existing mocks
jest.mock("get-browser-fingerprint", () => jest.fn(() => Promise.resolve("mocked-identifier")));

jest.mock("config/getIdentity.js", () => ({
  getIdentity: jest.fn(async () => {
    const identifier = await Promise.resolve("mocked-identifier");
    return identifier;
  }),
}));

export const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

export default mockedUsedNavigate;
