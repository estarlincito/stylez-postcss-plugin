import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import { writeFileSync } from 'fs';
import postcss from 'postcss';

const saving = (root: postcss.Root, filePath: string) => {
  postcss([autoprefixer, cssnano])
    .process(root, {
      from: undefined,
    })
    .then((result) => {
      const finalCSS = `@stylez;\n\n${result.css}`;
      writeFileSync(filePath, finalCSS);
    });
  process.stdout.write('✅ Styles saved\n');
};

export default saving;
