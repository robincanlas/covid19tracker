const {
  compilerOptions
} = require('./tsconfig');

const {
  resolve
} = require('path');

module.exports = {
  preset: 'ts-jest',
  globals: {
    "ts-jest": {
      "tsconfig": "<rootDir>/tsconfig.json"
    }
  },
  moduleDirectories: [
    ".",
    "src",
    "node_modules"
  ],
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/assets/**",
    "!**/build/**"
  ],
  moduleNameMapper: {
    '^@app/(.*)$': resolve(__dirname, './src/app/$1'),
    '^@tests/(.*)$': resolve(__dirname, './src/tests/$1'),
    ".+\\.(css|styl|less|sass|scss)$": "jest-transform-css"
  },
  snapshotSerializers: [
    "enzyme-to-json/serializer"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/enzyme-react-16-config.js"
  ]
};