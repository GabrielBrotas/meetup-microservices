export default {
  displayName: {
    name: 'http',
    color: 'magentaBright'
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@gbrotas/categories\\-core/(.*)$': '<rootDir>/../../../../node_modules/@gbrotas/categories-core/dist/$1'
  },
};
