export default {
  transform: {
    "^.+\.(t|j)sx?$": ["@swc/jest"],
  },
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: true,
  coverageDirectory: "coverage"
};
