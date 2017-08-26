module.exports = {
    "extends": "airbnb-base",
    "rules": {
      "camelcase": "off",
      "arrow-body-style": "off",
      "no-unused-expressions": "off"
    },
    "plugins": [
        "import",
        "react",
        "jsx-a11y"
    ],
    "env": {
      "browser": true,
      "node": true,
      "mocha": true
    },
    "globals": {
      "document": false,
    }
};
