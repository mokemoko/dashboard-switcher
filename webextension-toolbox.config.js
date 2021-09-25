const { resolve } = require('path');
const GlobEntriesPlugin = require('webpack-watched-glob-entries-plugin');

module.exports = {
  webpack: (config, { dev, vendor }) => {
    config.resolve.extensions.push('.ts', '.tsx', '.svelte');

    config.entry = GlobEntriesPlugin.getEntries(
      [
        resolve('app', '*.{js,mjs,jsx,ts,tsx}'),
        resolve('app', '?(scripts)/*.{js,mjs,jsx,ts,tsx}')
      ]
    )

    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'ts-loader',
    }, {
      test: /\.svelte$/,
      use: {
        loader: 'svelte-loader',
        options: {
          preprocess: require('svelte-preprocess')(),
        },
      },
    }, {
      test: /\.css$/,
      use: [
        'css-loader'
      ],
    });

    return config;
  },
  copyIgnore: [ '**/*.js', '**/*.json', '**/*.ts', '**/*.tsx', '**/*.svelte' ],
}
