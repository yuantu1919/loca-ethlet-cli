#! /usr/bin/env node
// Copyright (C) 2018 WeTrustPlatform
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Usage: loca-ethlet -h
 */

const argparse = require('argparse');
const ArgumentParser = argparse.ArgumentParser;
const parser = new ArgumentParser({
  prog: 'loca-ethlet',
  version: require('../package.json').version,
  addHelp: true,
  epilog: `
    Copyright (C) 2018 WeTrustPlatform

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.txt>.
  `,
  description:
    'Interact/deploy Smart Contracts and transfer ETH/Tokens via RPC',
  formatterClass: argparse.RawDescriptionHelpFormatter,
});

parser.addArgument(['-a', '--action'], {
  help: 'Action name i.e deploy, interact or send',
  metavar: '',
  required: true,
});

parser.addArgument(['-k', '--keystore'], {
  help: 'Location of the keystore json file',
  metavar: '',
  required: true,
});

parser.addArgument(['-p', '--password'], {
  help: 'Location of the password file to unlock keystore',
  metavar: '',
  required: true,
});

parser.addArgument(['-d', '--datafile'], {
  help: 'Location of the datafile',
  metavar: '',
  required: true,
});

parser.addArgument(['-r', '--rpc'], {
  help: "URL of the Ethereum node's RPC server",
  metavar: '',
  required: true,
});

const args = parser.parseArgs();

console.log(`Args: ${JSON.stringify(args)}`);

const LocaEthlet = require('../index');

const main = async function main() {
  const { keystore, password, rpc, action, datafile } = args;
  const walletProvider = new LocaEthlet.WalletProvider.KeyStore({
    keystore,
    password,
  });
  const ethlet = new LocaEthlet({ walletProvider, rpc });
  return await ethlet.execute(action, datafile);
};

main();
