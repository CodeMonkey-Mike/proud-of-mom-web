const util = require('util');
const fs = require('fs');
const child_process = require('child_process');
const fetch = require('node-fetch');

const exec = util.promisify(child_process.exec);
const { existsSync } = fs;

const PORT = 9012;
const SERVED_FOLDER = '/home/dominitech/workspace/proudofmom.com/proud-of-mom-web';
const DOMAIN = 'proudofmom.com';
const STAGING_DOMAIN = `staging.${DOMAIN}`;
const CLIENT_ROOT = '/web';

const main = async () => {
  try {
    const args = Object.values(process.argv);
    const SUDO_PASSWORD = args[2];
    const AUTH_TOKEN = args[3];
    const CIRCLE_PROJECT_USERNAME = args[4];
    const CIRCLE_PROJECT_REPONAME = args[5];
    const CIRCLE_BUILD_NUM = args[6];

    await exec('npm install');

    const SITE_URL = `${STAGING_DOMAIN}${CLIENT_ROOT.length > 0 ? CLIENT_ROOT : ''}`;
    if (!existsSync(`/var/www/${SITE_URL}`)) {
      await exec(`echo '${SUDO_PASSWORD}' | sudo -S mkdir /var/www/${SITE_URL}`);
      console.log('Created folder:', `${SITE_URL}`);
    }
    if (existsSync(`/var/www/${SITE_URL}/.env`)) {
      await exec(`echo '${SUDO_PASSWORD}' | sudo -S rm -rf /var/www/${SITE_URL}/.env`);
      console.log('Removed env file in:', `staging.${SITE_URL}`);
    }
    const _env_context = `NEXT_PUBLIC_API_URL=http://api-staging.${DOMAIN}/graphql`;
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

    // cleanup
    // cleanup
    console.log('Cleanup start.');
    await exec('git checkout package.json');
    const cleanup = async (prNumber) => {
      if (!prNumber) {
        return false;
      }
      // await exec(`echo '${SUDO_PASSWORD}' | sudo -S mkdir ${SERVED_FOLDER}`);
      await exec(
        `echo '${SUDO_PASSWORD}' | sudo -S rm -rf /var/www/stage.${DOMAIN}/stage${prNumber}.${DOMAIN}`
      );
      await exec(`/home/dominitech/.npm-global/bin/pm2 delete stage${prNumber}.${DOMAIN}`);
      await exec('/home/dominitech/.npm-global/bin/pm2 save');
      await exec(
        `echo '${SUDO_PASSWORD}' | sudo -S rm /etc/nginx/sites-available/stage${prNumber}.${DOMAIN}`
      );
      await exec(
        `echo '${SUDO_PASSWORD}' | sudo -S rm /etc/nginx/sites-enabled/stage${prNumber}.${DOMAIN}`
      );
      await exec(`echo '${SUDO_PASSWORD}' | sudo -S systemctl restart nginx`);
    };

    const options = {
      method: 'GET',
      headers: { 'Circle-Token': `${AUTH_TOKEN}` },
    };
    const response = await fetch(
      `https://circleci.com/api/v1.1/project/gh/${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}`,
      options
    );
    const data = await response.json();
    const pipeline = await new Promise((rs, rj) =>
      data.some((d, i) => {
        if (d.build_num == CIRCLE_BUILD_NUM) {
          rs(d);
        } else {
          rj(new Error("Can't find object"));
        }
      })
    );
    const rxg = /([()])/g;
    const prNumber = pipeline.subject.replace(rxg, '').split('#')[1];
    await cleanup(prNumber);

    console.log('Cleanup done.');

    console.log('Deploy successful.');
    await exec(`exit`);
  } catch (e) {
    throw new Error(e.message);
  }
};

main();
