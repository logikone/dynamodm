const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

jasmine.loadConfig({
  spec_files: [
    './src/**/*.spec.ts'
  ]
});

jasmine.addReporter(new SpecReporter());

jasmine.execute();
