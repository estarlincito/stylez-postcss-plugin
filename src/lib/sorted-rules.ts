import postcss from 'postcss';

const sortedRules = (rules: postcss.Rule[]) => {
  return [
    rules.sort((a, b) => {
      if (a.selector === ':root') return -1;
      if (b.selector === ':root') return 1;
      return 0;
    }),
  ];
};

export default sortedRules;
