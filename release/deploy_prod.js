const util = require('util');
const fs = require('fs');
const child_process = require('child_process');

const exec = util.promisify(child_process.exec);
const { existsSync } = fs;

const PORT = 9014;
const SERVED_FOLDER = '/home/dominitech/workspace/proudofmom.com/proud-of-mom-web';
const SITE_ORIGIN_DOMAIN = 'proudofmom.com';
const CLIENT_ROOT = '/web';

const main = async () => {
  try {
    const args = Object.values(process.argv);
    const SUDO_PASSWORD = args[2];
    const CIRCLE_TAG = args[3];

    await exec('git fetch');
    await exec(`git checkout master`);
    await exec(`git pull origin master`);
    // const version = await exec('git describe --abbrev=0');
    // await exec(`git checkout tags/${version.stdout}`);

    await exec('npm install');

    const SITE_URL = `${SITE_ORIGIN_DOMAIN}${CLIENT_ROOT.length > 0 ? CLIENT_ROOT : ''}`;
    if (!existsSync(`/var/www/${SITE_URL}`)) {
      await exec(`echo '${SUDO_PASSWORD}' | sudo -S mkdir /var/www/${SITE_URL}`);
      console.log('Created folder:', `${SITE_URL}`);
    }
    if (existsSync(`/var/www/${SITE_URL}/.env`)) {
      await exec(`echo '${SUDO_PASSWORD}' | sudo -S rm -rf /var/www/${SITE_URL}/.env`);
      console.log('Removed env file in:', `staging.${SITE_URL}`);
    }
    const _env_context = `NEXT_PUBLIC_API_URL=http://api.${SITE_ORIGIN_DOMAIN}/graphql`;
    fs.writeFile(`.env`, _env_context, 'utf8', (err) => {
      if (err) throw err;
      console.log('.env has been saved!');
    });
    await exec('npm run build');

    console.log('Build successful');

    // read/process package.json
    const packageJson = 'package.json';
    const pkg = JSON.parse(fs.readFileSync(packageJson).toString());

    // at this point you should have access to your ENV vars
    pkg.scripts.start = `next start -p ${PORT}`;

    // the 2 enables pretty-printing and defines the number of spaces to use
    fs.writeFileSync(packageJson, JSON.stringify(pkg, null, 2));

    // copy resource to serve folder
    await exec(
      `echo '${SUDO_PASSWORD}' | sudo -S cp ${SERVED_FOLDER}/package.json /var/www/${SITE_URL}`
    );
    await exec(`echo '${SUDO_PASSWORD}' | sudo -S cp ${SERVED_FOLDER}/.env /var/www/${SITE_URL}`);
    await exec(
      `echo '${SUDO_PASSWORD}' | sudo -S cp -r ${SERVED_FOLDER}/.next /var/www/${SITE_URL}`
    );
    await exec(
      `echo '${SUDO_PASSWORD}' | sudo -S cp -r ${SERVED_FOLDER}/node_modules /var/www/${SITE_URL}`
    );

    await exec('git checkout package.json');
    console.log('Tag version:', CIRCLE_TAG);
    console.log('Production deploy successful.');
    await exec(`exit`);
  } catch (e) {
    throw new Error(e.message);
  }
};

main();
