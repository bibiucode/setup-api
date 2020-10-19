module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          '@src': './src',
          '@controllers': './src/controllers',
          '@models': './src/models',
          '@services': './src/services',
          '@routes': './src/routes'
        }
      }]
    ],
    ignore: [
      '**/*.test.ts'
    ]
  };