/**
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require('fs');

const ENV_FILE = '.env';

function replaceSecrets(secrets) {
  const envFileContents = fs.readFileSync(ENV_FILE).toString('utf8');
  const replacedContents = envFileContents.split('\n').map(line => {
    for (const secret of secrets) {
      if (line.startsWith(`${secret}=`)) {
        const secretVal = process.env[secret]
        console.log(
          `Replacing value of ${secret} with "${secretVal.substr(0, 3)}..."`
        );
        return `${secret}=${secretVal}`;
      }
    }

    return line;
  }).join('\n');
  fs.writeFileSync(ENV_FILE, replacedContents);
}

if (require.main === module) {
  const secrets = process.argv.slice(2);
  replaceSecrets(secrets);
}

module.exports = replaceSecrets;
