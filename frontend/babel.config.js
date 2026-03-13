module.exports = {
  plugins: [
    [
      'babel-plugin-module-resolver',
      {
        root: ['./src'],
        alias: {
          'components': './components',
          'containers': './containers',
          'constants': './constants',
          'hooks': './hooks',
          'interfaces': './interfaces',
          'routes': './routes',
          'services': './services',
          'slices': './slices',
          'store': './store',
          'styles': './styles',
          'types': './type'
        },
        extensions: [
          '.ts',
          '.tsx',
          '.js',
          '.jsx'
        ],
      },
    ],
  ],
};
