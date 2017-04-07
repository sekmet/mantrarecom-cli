import {expect} from 'chai';
import fse from 'fs-extra';
import fs from 'fs';
import {create} from '../../dist/commands';
import {checkFileOrDirExists} from '../test_helpers';

/**
 * checkCommonFiles checks all the files generated by the create command by default
 */
function checkCommonFiles(modulePath = "client/modules") {
  expect(checkFileOrDirExists('./blog')).to.equal(true);
  expect(checkFileOrDirExists('./blog/package.json')).to.equal(true);
  expect(checkFileOrDirExists('./blog/.gitignore')).to.equal(true);
  expect(checkFileOrDirExists('./blog/client/configs/context.js')).to.equal(true);
  expect(checkFileOrDirExists(`./blog/${modulePath}/core/actions/index.js`)).to.equal(true);
  expect(checkFileOrDirExists(`./blog/${modulePath}/core/components/main_layout.jsx`)).to.equal(true);
  expect(checkFileOrDirExists(`./blog/${modulePath}/core/components/home.jsx`)).to.equal(true);
  expect(checkFileOrDirExists(`./blog/${modulePath}/core/containers/`)).to.equal(true);
  expect(checkFileOrDirExists(`./blog/${modulePath}/core/configs/`)).to.equal(true);
  expect(checkFileOrDirExists(`./blog/${modulePath}/core/index.js`)).to.equal(true);
  expect(checkFileOrDirExists(`./blog/${modulePath}/core/routes.jsx`)).to.equal(true);
  expect(checkFileOrDirExists(`./blog/${modulePath}/core/libs/`)).to.equal(true);
  expect(checkFileOrDirExists('./blog/client/main.js')).to.equal(true);
  expect(checkFileOrDirExists('./blog/lib/collections/index.js')).to.equal(true);
  expect(checkFileOrDirExists('./blog/server/publications/index.js')).to.equal(true);
  expect(checkFileOrDirExists('./blog/server/methods/index.js')).to.equal(true);
  expect(checkFileOrDirExists('./blog/server/configs/')).to.equal(true);
  expect(checkFileOrDirExists('./blog/server/main.js')).to.equal(true);
  expect(checkFileOrDirExists('./blog/.eslintrc')).to.equal(true);
  expect(checkFileOrDirExists('./blog/.babelrc')).to.equal(true);
  expect(checkFileOrDirExists('./blog/.scripts/mocha_boot.js')).to.equal(true);
  expect(checkFileOrDirExists('./blog/mantra_cli.yaml')).to.equal(true);
}

describe("create command", function() {
  beforeEach(function() {
    fse.mkdirsSync('./tmp');
    process.chdir('./tmp');
  });

  afterEach(function() {
    fse.removeSync('./blog');
    process.chdir('../');
  });

  it("creates a skeleton mantra app", function() {
    create('blog');
    checkCommonFiles();

    expect(checkFileOrDirExists('./blog/.storybook')).to.equal(false);
    expect(checkFileOrDirExists('./blog/.storybook/config.js')).to.equal(false);
    expect(checkFileOrDirExists('./blog/.storybook/webpack.config.js')).to.equal(false);
    expect(checkFileOrDirExists('./blog/client/modules/core/components/.stories/')).to.equal(false);
    expect(checkFileOrDirExists('./blog/client/modules/core/components/.stories/index.js')).to.equal(false);
  });

  describe("custom config file", function() {
    it("creates storybook if option is specified", function() {
      fs.writeFileSync('../tmp/custom_config.yaml', 'storybook: true');
      create('blog', { config: '../tmp/custom_config.yaml' });
      checkCommonFiles();

      expect(checkFileOrDirExists('./blog/.storybook')).to.equal(true);
      expect(checkFileOrDirExists('./blog/.storybook/config.js')).to.equal(true);
      expect(checkFileOrDirExists('./blog/.storybook/webpack.config.js')).to.equal(true);
      expect(checkFileOrDirExists('./blog/client/modules/core/components/.stories/')).to.equal(true);
      expect(checkFileOrDirExists('./blog/client/modules/core/components/.stories/index.js')).to.equal(true);
    });

    it("creates app with custom modules path if options is specified", function() {
      fs.writeFileSync('../tmp/custom_config.yaml', 'modulesPath: imports/modules');
      create('blog', { config: '../tmp/custom_config.yaml' });
      checkCommonFiles("imports/modules");
    });

  });


});
