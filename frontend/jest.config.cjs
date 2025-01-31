module.exports = {
	rootDir: './',
	collectCoverage: false,
	collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
	coverageDirectory: 'coverage',
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test|tests).[tj]s?(x)'],
	coveragePathIgnorePatterns: ['/node_modules/', '<rootDir>/src/main.tsx', '<rootDir>/src/i18n', '^.+\\.(cy)\\.tsx$'],
	moduleNameMapper: {
		'^.+\\.module\\.(css|less)$': 'identity-obj-proxy',
		'^.+\\.(css|sass|scss)$': '<rootDir>/fileTransform.js',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/fileTransform.js',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testPathIgnorePatterns: ['<rootDir>/cypress/'],
}
