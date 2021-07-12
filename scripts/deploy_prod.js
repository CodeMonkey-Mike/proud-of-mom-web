const util = require('util');
const fs = require('fs');
const child_process = require('child_process');

const exec = util.promisify(child_process.exec);
const { existsSync } = fs;

const PORT = 9014;
const SERVED_FOLDER = '/home/dominitech/workspace/proudofmom.com/proudofmom-web';
const SITE_ORIGIN_DOMAIN = 'proudofmom.com';
const CLIENT_ROOT = '/web';

const main = async () => {
  try {
    const args = Object.values(process.argv);
    const SUDO_PASSWORD = args[2];
    const CIRCLE_TAG = args[3];
    const SITE_URL = `${SITE_ORIGIN_DOMAIN}${CLIENT_ROOT.length > 0 ? CLIENT_ROOT : ''}`;
    // const version = await exec('git describe --abbrev=0');
    // await exec(`git checkout tags/${version.stdout}`);
    if (!existsSync(`/var/www/${SITE_URL}`)) {
      await exec(`echo '${SUDO_PASSWORD}' | sudo -S mkdir /var/www/${SITE_URL}`);
      console.log('Created folder:', `${SITE_URL}`);
    }
    // read/process package.json
    const packageJson = 'package.json';
    const pkg = JSON.parse(fs.readFileSync(packageJson).toString());

    // at this point you should have access to your ENV vars
    pkg.scripts.start = `next start -p ${PORT}`;

    // the 2 enables pretty-printing and defines the number of spaces to use
    fs.writeFileSync(packageJson, JSON.stringify(pkg, null, 2));

    // extract nodes
    await exec('unzip -qq node_modules.zip');
    await exec('unzip -qq .next.zip');

    // copy resource to serve folder
    await exec(
      `echo '${SUDO_PASSWORD}' | sudo -S cp ${SERVED_FOLDER}/package.json /var/www/${SITE_URL}`
    );
    await exec(
      `echo '${SUDO_PASSWORD}' | sudo -S cp -r ${SERVED_FOLDER}/.next /var/www/${SITE_URL}`
    );
    await exec(
      `echo '${SUDO_PASSWORD}' | sudo -S cp -r ${SERVED_FOLDER}/node_modules /var/www/${SITE_URL}`
    );

    // Reload staging site
    await exec('/home/dominitech/.npm-global/bin/pm2 reload cm');

    // remove resource after copy
    await exec(`rm -rf ./**`);
    await exec(`rm -rf .next`);
    await exec(`rm -rf .next.zip`);

    console.log('Tag version:', CIRCLE_TAG);
    console.log('Production deploy successful.');
    await exec(`exit`);
  } catch (e) {
    // remove resource after copy
    await exec(`rm -rf ./**`);
    await exec(`rm -rf .next`);
    await exec(`rm -rf .next.zip`);
    throw new Error(e.message);
  }
};

main();
