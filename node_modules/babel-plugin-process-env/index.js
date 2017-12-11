'use strict';
const babel = require('babel-core');

const LABELS = {
  processEnv: 'process.env',
  process: 'process',
  env: 'env'
}

/* *************** UTILS *************** */
function isProcessEnv(path) {
  return path.get('object').matchesPattern(LABELS.processEnv);
}

/* *************** EXPORTS *************** */
module.exports = (babel) => {
  const t = babel.types;
  return {
    visitor: {
      MemberExpression: (path) => {
        const envVarKey = path.toComputedKey();
        const envVarValue = process.env[envVarKey.value];
        if (envVarValue && isProcessEnv(path) && t.isStringLiteral(envVarKey)) {
          path.replaceWith(t.valueToNode(envVarValue));
        }
      }
    }
  };
};