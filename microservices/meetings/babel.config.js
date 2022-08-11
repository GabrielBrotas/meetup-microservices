module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      ['@babel/preset-typescript', {allowDeclareFields: true}],
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      [ 
        "module-resolver", {
          "root": ["./src/"],
          alias: {
            "domain": "./src/domain",
          }
        }
      ],
      ['@babel/plugin-proposal-class-properties', { loose: false }]
    ]
    
};