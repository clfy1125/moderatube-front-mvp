import stylistic from '@stylistic/eslint-plugin'; // ✅ stylistic 플러그인
import pluginTS from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier'; // ✅ 빠졌던 부분
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default [
  ...pluginVue.configs['flat/recommended'],
  eslintPluginPrettierRecommended,
  eslintConfigPrettier,
  {
    files: ['**/*.{ts,tsx,vue,js,jsx}'],
    plugins: {
      '@typescript-eslint': pluginTS,
      import: pluginImport,
      vue: pluginVue,
      prettier: prettierPlugin,
      '@stylistic': stylistic
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser, // Vue SFC 안에 TS 코드 파싱할 때 쓰는 파서
        ecmaVersion: 2020,
        sourceType: 'module'
      }
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true, //기본적으로 singleQuote 사용
          tabWidth: 2, //tab 은 2칸 띄움
          semi: true, //세미콜론 항상 마지막에 있어야함
          jsxSingleQuote: false, //jsx 에서는 doubleQuote 사용
          bracketSpacing: true, // true: { foo: bar } / false: {foo: bar}
          bracketSameLine: false, //jsx, html 에서 여러줄의 attribute 를 가지고 있을 때 close bracket(>) 은 다음줄에 두도록 한다.
          arrowParens: 'always', //arrow function 에서 반드시 = () => 형식으로 표시하도록 함
          trailingComma: 'none', //콤마를 이용한 항목의 마지막 항목에는 , 를 붙이지 않는다.
          endOfLine: 'auto', //각 line 의 마지막에 캐리지 리턴을 적용하거나 라인피드를 적용할 지에 대한 옵션.
          proseWrap: 'never', // 줄 바꿈을 강제하지 않음
          printWidth: 250
        }
      ],
      eqeqeq: ['error', 'always'], //===, !== 형식을 사용하도록 함.
      'func-style': ['error', 'expression'], //function foo() 형식을 쓰지 않도록 함.
      'prefer-arrow-callback': ['error'], //function 을 사용하지 않고 arrow function 을 쓰도록함.
      'react/react-in-jsx-scope': 'off', //import React from 'react'; 를 사용하지 않아도 되도록 함.
      '@stylistic/no-extra-semi': ['error'], //세미콜론이 여러개 쓰여지지 않도록 함
      '@stylistic/comma-style': ['error', 'last'], //콤마는 뒤쪽에 붙도록 함.
      '@stylistic/max-len': [
        'error',
        {
          code: 500,
          ignoreComments: true,
          ignoreTrailingComments: true,
          ignoreUrls: true,
          ignoreRegExpLiterals: true
        }
      ], //한줄 최대길이
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 0
        }
      ], //empty line 이 여러개 연속으로 있지 않도록 함
      '@stylistic/no-multi-spaces': ['error'], //빈 띄어쓰기가 여러개 연속으로 있지 않도록 함
      '@stylistic/space-infix-ops': 'error', //연산자 앞뒤로 띄어쓰기 되도록 함.
      '@stylistic/key-spacing': ['error'], //key: value 형식으로 띄어쓰기 적용. : 앞은 띄어쓰기 없고, 뒤는 띄어쓰기 있음.
      '@stylistic/keyword-spacing': 'error', //keyword(if, else, try, catch...등) 앞뒤로 띄어쓰도록 함
      '@stylistic/space-before-blocks': 'error', //block 앞에는 space 가 있도록 함.
      '@stylistic/function-call-argument-newline': ['error', 'consistent'], //function 의 argument 적용 시 newline 의 기준을 일정하게 하도록 한다. newline 이 모두 없던지, 모두 있던지지
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'return'
        }
      ], //return 문 앖에 뭐가 있든 return 은 항상 newline 에 쓰이도록 한다.
      '@stylistic/jsx-curly-newline': [
        'error',
        {
          multiline: 'consistent',
          singleline: 'consistent'
        }
      ], //jsx 에서 괄호를 사용하는 경우 single line 은 괄호와 괄호안의 내용이 반드시 한줄에 작성되고, multi line 은 괄호와 괄호안의 내용 사이에 newline 이 적용되거나 한줄로 쓸수도 있음.
      '@stylistic/jsx-curly-spacing': [
        'error',
        {
          when: 'never'
        }
      ], //jsx 에서 괄호를 사용하는 경우 괄호안의 내용 사이에 띄어쓰지 않음 true: {name} / false: { name }
      '@stylistic/jsx-equals-spacing': ['error', 'never'], //jsx에서 "=" 앞뒤로 띄어쓰기를 허용하지 않음.
      '@stylistic/jsx-pascal-case': ['error'], //jsx 컴포넌트는 pascal case 로 사용
      '@stylistic/jsx-props-no-multi-spaces': ['error'], //jsx 컴포넌트에서 props 들 사이에 여러개의 띄어쓰기를 허용하지 않음
      '@stylistic/jsx-self-closing-comp': ['error'], //jsx 컴포넌트에서 children 이 없는 경우 self closing(/>) 되도록 함
      '@stylistic/jsx-tag-spacing': [
        'error',
        {
          closingSlash: 'never',
          beforeSelfClosing: 'always',
          afterOpening: 'never',
          beforeClosing: 'never'
        }
      ], //jsx 컴포넌트에서 tag(/, />, <, >) 에 띄어쓰기를 허용할건지 안할건지에 대한 설정.
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase']
        },
        {
          selector: 'class',
          format: ['PascalCase']
        },
        {
          selector: 'enum',
          format: ['PascalCase'],
          prefix: ['E']
        }
      ], //naming convention. interface 는 I~ 형태, enum 은 E~ 형태 여야 함.
      '@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'always', allowObjectTypes: 'always' }], //type, interface 선언 시 빈 object 로 선언 가능하도록 함. type SampleType = {}; interface INewInterfaceProps {}
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true,
          allowTernary: false,
          allowTaggedTemplates: false,
          enforceForJSX: false
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^props$'
        }
      ],
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          pathGroups: [
            {
              pattern: 'vue',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '@/**',
              group: 'internal'
            }
          ],
          pathGroupsExcludedImportTypes: ['vue'],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true
          },
          'newlines-between': 'always'
        }
      ]
    }
  }
];
