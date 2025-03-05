export interface StyleEntry {
  [x: string]: object;
  ':root': {
    [x: string]: string;
  };
}

import { Node as Node_ } from '@swc/core';

export interface Properties {
  type: 'KeyValueProperty';
  value: { value: string; type: 'StringLiteral' | 'NumericLiteral' };
  key: { value: string; type: 'Identifier' };
}

export interface Node extends Node_ {
  callee: {
    type: 'MemberExpression';
    property: { type: 'Identifier'; value: string };
    object: {
      type: 'Identifier';
      value: string;
    };
  };
  arguments: {
    expression: {
      type: 'ObjectExpression';
      properties: Properties[];
    };
  }[];
  specifiers: {
    type: 'ImportDefaultSpecifier' | 'ImportNamespaceSpecifier';
    local: { value: string };
  }[];
  type: 'ImportDeclaration' | 'CallExpression';
  source: { value: '@stylezjs/stylez' };
}
