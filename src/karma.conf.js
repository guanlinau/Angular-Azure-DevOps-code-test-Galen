// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
	let browsers = ['Chrome'];

	// If run in CI, use ChromeHeadless
	if (process.env.CI) {
		browsers = ['ChromeHeadless'];
	}
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage-istanbul-reporter'),
			require('@angular-devkit/build-angular/plugins/karma'),
			require('karma-junit-reporter'),
		],
		client: {
			clearContext: false, // leave Jasmine Spec Runner output visible in browser
		},
		coverageIstanbulReporter: {
			dir: require('path').join(
				__dirname,
				'../coverage/angular11-testing-examples'
			),
			reports: ['html', 'lcovonly', 'cobertura'],
			fixWebpackSourcePaths: true,
		},
		reporters: ['progress', 'kjhtml', 'junit'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: browsers,
		singleRun: false,
		junitReporter: {
			outputDir: 'test-results',
			outputFile: 'TESTS-results.xml',
		},
	});
};
