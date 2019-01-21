module.exports = {
  "Best Practices": {
    "suggestion": {
      "accessor-pairs": "error",
      "block-scoped-var": "error",
      "class-methods-use-this": "error",
      "complexity": "error",
      "consistent-return": "error", // uff toto treba nastudovat 
      "curly": "off", // alebo vytunovat bezbe pisem oneliner for cyklus tak neviem 
      "default-case": "error",
      "dot-notation": "error",
      "eqeqeq": "error",
      "guard-for-in": "error",
      "max-classes-per-file": "error",
      "no-alert": "error",
      "no-caller": "error",
      "no-case-declarations": "error",
      "no-div-regex": "error",
      "no-else-return": "error",
      "no-empty-function": "error",
      "no-eq-null": "error",
      "no-eval": "error",
      "no-extend-native": "error",
      "no-extra-bind": "error",
      "no-extra-label": "error",
      "no-floating-decimal": "error",
      "no-global-assign": "error",
      "no-implicit-coercion": "error",
      "no-implicit-globals": "error", //parser options or off
      "no-implied-eval": "error",
      "no-invalid-this": "error", // problem z mocha testami tam sa this.timeout() pouziva
      "no-iterator": "error",
      "no-labels": "error",
      "no-lone-blocks": "error",
      "no-loop-func": "error",
      "no-magic-numbers": "warn", //podla mna plosne blbost, este aj v defaultoch
      "no-multi-str": "error",
      "no-native-reassign": "error",
      "no-new-func": "error",
      "no-new-wrappers": "error",
      "no-new": "error",
      "no-octal-escape": "error",
      "no-octal": "error",
      "no-param-reassign": "error",
      "no-proto": "error",
      "no-redeclare": "error",
      "no-restricted-properties": "error",
      "no-return-assign": "error",
      "no-return-await": "error",
      "no-script-url": "error",
      "no-sequences": "error",
      "no-throw-literal": "error",
      "no-unused-expressions": "error",
      "no-unused-labels": "error",
      "no-useless-call": "error",
      "no-useless-concat": "error",
      "no-useless-escape": "error",
      "no-useless-return": "error",
      "no-void": "error",
      "no-warning-comments": "warn", // toto bezne mavame v kode, mozno produkcne off
      "no-with": "error",
      "prefer-promise-reject-errors": "error",
      "radix": "error",
      "require-await": "error",
      "require-unicode-regexp": "error",
      "vars-on-top": "error",
      "yoda": "error"
    },
    "problem": {
      "array-callback-return": "error", // mozno este { allowImplicit: true }
      "no-empty-pattern": "error",
      "no-fallthrough": "error",
      "no-self-assign": "error",
      "no-self-compare": "error",
      "no-unmodified-loop-condition": "error"
    },
    "layout": {
      "dot-location": "error",
      "no-multi-spaces": "error",
      "wrap-iife": "error"
    }
  },
  "Stylistic Issues": {
    "layout": {
      "array-bracket-newline": "error",
      "array-bracket-spacing": "error",
      "array-element-newline": "error",
      "block-spacing": "error",
      "brace-style": "error",
      "comma-dangle": "error",
      "comma-spacing": "error",
      "comma-style": "error",
      "computed-property-spacing": "error",
      "eol-last": "error",
      "func-call-spacing": "error",
      "function-paren-newline": "error",
      "implicit-arrow-linebreak": "error",
      "indent-legacy": "error",
      "indent": "error",
      "jsx-quotes": "error",
      "key-spacing": "error",
      "keyword-spacing": "error",
      "line-comment-position": "error",
      "linebreak-style": "error",
      "lines-around-comment": "error",
      "lines-around-directive": "error",
      "lines-between-class-members": "error",
      "max-len": "error",
      "max-statements-per-line": "error",
      "multiline-ternary": "error",
      "new-parens": "error",
      "newline-after-var": "error",
      "newline-before-return": "error",
      "newline-per-chained-call": "error",
      "no-mixed-spaces-and-tabs": "error",
      "no-multiple-empty-lines": "error",
      "no-spaced-func": "error",
      "no-tabs": "error",
      "no-trailing-spaces": "error",
      "no-whitespace-before-property": "error",
      "nonblock-statement-body-position": "error",
      "object-curly-newline": "error",
      "object-curly-spacing": "error",
      "object-property-newline": "error",
      "operator-linebreak": "error",
      "padded-blocks": "error",
      "padding-line-between-statements": "error",
      "quotes": "error",
      "semi-spacing": "error",
      "semi-style": "error",
      "semi": "error",
      "space-before-blocks": "error",
      "space-before-function-paren": "error",
      "space-in-parens": "error",
      "space-infix-ops": "error",
      "space-unary-ops": "error",
      "switch-colon-spacing": "error",
      "template-tag-spacing": "error",
      "unicode-bom": "error",
      "wrap-regex": "error"
    },
    "suggestion": {
      "camelcase": "error",
      "capitalized-comments": "error",
      "consistent-this": "error",
      "func-name-matching": "error",
      "func-names": "error",
      "func-style": "error",
      "id-blacklist": "error",
      "id-length": "error",
      "id-match": "error",
      "max-depth": "error",
      "max-lines-per-function": "error",
      "max-lines": "error",
      "max-nested-callbacks": "error",
      "max-params": "error",
      "max-statements": "error",
      "multiline-comment-style": "error",
      "new-cap": "error",
      "no-array-constructor": "error",
      "no-bitwise": "error",
      "no-continue": "error",
      "no-inline-comments": "error",
      "no-lonely-if": "error",
      "no-mixed-operators": "error",
      "no-multi-assign": "error",
      "no-negated-condition": "error",
      "no-nested-ternary": "error",
      "no-new-object": "error",
      "no-plusplus": "error",
      "no-restricted-syntax": "error",
      "no-ternary": "error",
      "no-underscore-dangle": "error",
      "no-unneeded-ternary": "error",
      "one-var-declaration-per-line": "error",
      "one-var": "error",
      "operator-assignment": "error",
      "prefer-object-spread": "error",
      "quote-props": "error",
      "require-jsdoc": "error",
      "sort-keys": "error",
      "sort-vars": "error",
      "spaced-comment": "error"
    }
  },
  "ECMAScript 6": {
    "suggestion": {
      "arrow-body-style": "error",
      "no-confusing-arrow": "error",
      "no-restricted-imports": "error",
      "no-useless-computed-key": "error",
      "no-useless-constructor": "error",
      "no-useless-rename": "error",
      "no-var": "error",
      "object-shorthand": ["error", "consistent-as-needed"], //ak su nejake expandnute nech su vsecky
      "prefer-arrow-callback": "error",
      "prefer-const": "error", // suhlasim, nech je to error          
      "prefer-destructuring": "warn", //TODO: agree on something
      "prefer-numeric-literals": "error",
      "prefer-reflect": "error",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "error", // jasne 
      "require-yield": "error",
      "sort-imports": "error",
      "symbol-description": "error"
    },
    "layout": {
      "arrow-parens": "error",
      "arrow-spacing": "error",
      "generator-star-spacing": "error",
      "rest-spread-spacing": "error",
      "template-curly-spacing": ["error", "never"], // useful with --fix and prefer-template errors 
      "yield-star-spacing": "error"
    },
    "problem": {
      "constructor-super": "error",
      "no-class-assign": "error",
      "no-const-assign": "error",
      "no-dupe-class-members": "error",
      "no-duplicate-imports": "error",
      "no-new-symbol": "error",
      "no-this-before-super": "error"
    }
  },
  "Node.js and CommonJS": {
    "suggestion": {
      "callback-return": "error",
      "global-require": "error",
      "handle-callback-err": "error",
      "no-mixed-requires": "error",
      "no-new-require": "error",
      "no-path-concat": "error",
      "no-process-env": "error",
      "no-process-exit": "error",
      "no-restricted-modules": "error",
      "no-sync": "error"
    },
    "problem": {
      "no-buffer-constructor": "error"
    }
  },
  "Possible Errors": {
    "problem": {
      "for-direction": "error",
      "getter-return": "error",
      "no-async-promise-executor": "error",
      "no-await-in-loop": "error",
      "no-compare-neg-zero": "error",
      "no-cond-assign": "error",
      "no-constant-condition": "error",
      "no-control-regex": "error",
      "no-debugger": "error",
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-empty-character-class": "error",
      "no-ex-assign": "error",
      "no-func-assign": "error",
      "no-inner-declarations": "error",
      "no-invalid-regexp": "error",
      "no-irregular-whitespace": "error",
      "no-misleading-character-class": "error",
      "no-negated-in-lhs": "error",
      "no-obj-calls": "error",
      "no-prototype-builtins": "error",
      "no-sparse-arrays": "error",
      "no-template-curly-in-string": "error",
      "no-unexpected-multiline": "error",
      "no-unreachable": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-negation": "error",
      "require-atomic-updates": "error",
      "use-isnan": "error",
      "valid-typeof": "error"
    },
    "suggestion": {
      "no-console": "error",
      "no-empty": "error",
      "no-extra-boolean-cast": "error",
      "no-extra-semi": "error",
      "no-regex-spaces": "error",
      "valid-jsdoc": "error"
    },
    "layout": {
      "no-extra-parens": "error"
    }
  },
  "Variables": {
    "suggestion": {
      "init-declarations": "error",
      "no-catch-shadow": "error",
      "no-delete-var": "error",
      "no-label-var": "error",
      "no-restricted-globals": "error",
      "no-shadow-restricted-names": "error",
      "no-shadow": "warn", // toto bezne robim
      "no-undef-init": "error",
      "no-undefined": "error"
    },
    "problem": {
      "no-undef": "error",
      "no-unused-vars": "error",
      "no-use-before-define": ["error", { "functions": false }] //nato pouzivam function declaration predsa aby som ju pisal pod zdrojak a nie hore, toto neni pascal
    }
  },
  "Strict Mode": {
    "suggestion": {
      "strict": "error"
    }
  }
}