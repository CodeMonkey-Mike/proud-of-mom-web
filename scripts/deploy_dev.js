const util = require('util');
const fs = require('fs');
const child_process = require('child_process');

const exec = util.promisify(child_process.exec);
const { existsSync } = fs;

const PREFIX = 18;
const ECOSYTEM_FILE = 'scripts/ecosystem.config.js';
const SITE_ORIGIN_DOMAIN = 'proudofmom.com';

const main = async () => {
  try {
    const args = Object.values(process.argv);

    const COMMIT_SHA = args[2];
    const CIRCLE_PULL_REQUEST_URL = args[3];
    const SUDO_PASSWORD = args[4];

    if (!COMMIT_SHA) {
      throw new Error(`Missing entry value: COMMIT_SHA`);
    }
    if (!CIRCLE_PULL_REQUEST_URL) {
      throw new Error(`Missing entry value: CIRCLE_PULL_REQUEST`);
    }

    // parse CIRCLE_PULL_REQUEST
    const CIRCLE_PULL_REQUEST = CIRCLE_PULL_REQUEST_URL.split('/pull/')[1];
    const SERVED_FOLDER = `/home/dominitech/workspace/proudofmom.com/proudofmom-web/${CIRCLE_PULL_REQUEST}`;
    const SITE_URL = `${CIRCLE_PULL_REQUEST}.${SITE_ORIGIN_DOMAIN}`;
    if (!existsSync(`/var/www/stage.${SITE_ORIGIN_DOMAIN}/stage${SITE_URL}`)) {
      await exec(
        `echo '${SUDO_PASSWORD}' | sudo -S mkdir /var/www/stage.${SITE_ORIGIN_DOMAIN}/stage${SITE_URL}`
      );
      console.log('Created folder:', `stage${SITE_URL}`);
    }
    const port = Number([PREFIX, CIRCLE_PULL_REQUEST].join(''));
    // read/process package.json
    const packageJson = 'package.json';
    const pkg = JSON.parse(fs.readFileSync(packageJson).toString());

    // at this point you should have access to your ENV vars
    pkg.scripts.start = `next start -p ${port}`;

    // the 2 enables pretty-printing and defines the number of spaces to use
    fs.writeFileSync(packageJson, JSON.stringify(pkg, null, 2));

    // extract nodes
    await exec('unzip -qq node_modules.zip');
    await exec('unzip -qq .next.zip');

    // copy resource to serve folder
    await exec(
      `echo '${SUDO_PASSWORD}' | sudo -S cp ${SERVED_FOLDER}/package.json /var/www/stage.${SITE_ORIGIN_DOMAIN}/stage${SITE_URL}`
    );
    await exec(
      `echo '${SUDO_PASSWORD}' | sudo -S cp -r ${SERVED_FOLDER}/.next /var/www/stage.${SITE_ORIGIN_DOMAIN}/stage${SITE_URL}`
    );
    await exec(
      `echo '${SUDO_PASSWORD}' | sudo -S cp -r ${SERVED_FOLDER}/node_modules /var/www/stage.${SITE_ORIGIN_DOMAIN}/stage${SITE_URL}`
    );

    const _app_context = `
    module.exports = {
      apps : [{
        name        : "stage${SITE_URL}",
        cwd         : "/var/www/stage.${SITE_ORIGIN_DOMAIN}/stage${SITE_URL}",
        script      : "npm",
        args        : "start",
        watch       : true
      }]
    }
    `;

    if (existsSync(`${ECOSYTEM_FILE}`)) {
      console.log('Removing existed ecosystem file.');
      await exec(`echo '${SUDO_PASSWORD}' | sudo -S rm ${ECOSYTEM_FILE}`);
    }
    fs.writeFile(`${ECOSYTEM_FILE}`, _app_context, 'utf8', (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });

    await exec(`/home/dominitech/.npm-global/bin/pm2 start ${ECOSYTEM_FILE}`);
    await exec('/home/dominitech/.npm-global/bin/pm2 save');
    console.log(`Starting app via port ${port}`);

    // remove resource after copy
    await exec(`rm -rf ./**`);
    await exec(`rm -rf .next`);
    await exec(`rm -rf .next.zip`);

    /// create virtual host
    const vh = `
      server {
        listen  80;

        server_name stage${SITE_URL};

        location / {
            auth_basic "Restricted";
            auth_basic_user_file htpasswd;
            proxy_pass http://127.0.0.1:${PREFIX}${CIRCLE_PULL_REQUEST};
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header X-Real-IP  $remote_addr;
            proxy_set_header X-Forwarded-For $remote_addr;
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
      }`;

    console.log(`Creating virtual host: stage${SITE_URL}`);
    if (existsSync(`/etc/nginx/sites-available/stage${SITE_URL}`)) {
      console.log('Removing existed nginx file.');
      await exec(
        `echo '${SUDO_PASSWORD}' | sudo -S rm /etc/nginx/sites-available/stage${SITE_URL}`
      );
    }
    if (existsSync(`/etc/nginx/sites-enabled/stage${SITE_URL}`)) {
      console.log('Removing existed sites-enabled nginx file.');
      await exec(`echo '${SUDO_PASSWORD}' | sudo -S rm /etc/nginx/sites-enabled/stage${SITE_URL}`);
    }
    const NGINX_FILE = `stage${SITE_URL}`;
    fs.writeFile(`${NGINX_FILE}`, vh, 'utf8', (err) => {
      if (err) throw err;
      console.log('The virtual host file has been saved!');
    });
    await exec(
      `echo '${SUDO_PASSWORD}' | sudo -S cp ${SERVED_FOLDER}/${NGINX_FILE} /etc/nginx/sites-available/`
    );
    try {
      await exec(
        `echo '${SUDO_PASSWORD}' | sudo -S ln -s /etc/nginx/sites-available/${NGINX_FILE} /etc/nginx/sites-enabled/`
      );
    } catch (e) {
      console.log(`File /etc/nginx/sites-enabled/${NGINX_FILE} already existed!`);
      await exec(`/home/dominitech/.npm-global/bin/pm2 reload stage${SITE_URL}`);
    }
    await exec(`echo '${SUDO_PASSWORD}' | sudo -S systemctl restart nginx`);
    //remove vh after cp
    await exec(`echo '${SUDO_PASSWORD}' | sudo -S rm ${SERVED_FOLDER}/${NGINX_FILE}`);

    console.log('Deploy successful.');
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
