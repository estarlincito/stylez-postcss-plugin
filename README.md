# @stylezjs/postcss-plugin

`@stylezjs/postcss-plugin` is a PostCSS plugin for integrating `@stylezjs/stylez` to generate static CSS styles. Stylez → 'Z' of Zero Runtime.

## Installation

To use `@stylezjs/stylez`, you'll need to install both the package and the PostCSS plugin:

```bash
pnpm add @stylezjs/stylez @stylezjs/postcss-plugin
```

or with npm:

```bash
npm install @stylezjs/stylez @stylezjs/postcss-plugin
```

or with yarn:

```bash
yarn add @stylezjs/stylez @stylezjs/postcss-plugin
```

## Setup PostCSS

To enable `@stylezjs/postcss-plugin`, you need to configure your `postcss.config.js` file:

```ts
export default {
  plugins: {
    '@stylezjs/postcss-plugin': {
      patterns: ['src/**/*.{js,ts,jsx,tsx}'],
    },
  },
};
```

## Usage

### Creating and Using Styled Components

You can now create dynamic atomic CSS class names and apply them to your React components.

```ts
import stylez from '@stylezjs/stylez';

// Define styles
const styled = stylez.create({
  color: 'red',
  fontSize: '16px',
});

// Apply class names to your component
const Home = () => (
  <div {...stylez.className(styled)}>
    Remember to keep a clear head in difficult times!
  </div>
);

export default Home;
```

### Global Styles

In order for `@stylezjs` to work correctly, include the `@stylez` directive in your global CSS file. Create a `.css` file, for example `globals.css`, and add the following at the top:

```css
@stylez;
```

Then, import this CSS file into your project, ideally in your root file (e.g., `index.tsx` or `App.tsx`):

```ts
import './globals.css';
```

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Author:** Estarlin R ([estarlincito.com](https://estarlincito.com))
