# react-devpeek

**A developer tool for debugging React state and local storage**

`react-devpeek` is a React developer tool designed to help developers inspect and debug React state and local storage data directly in the browser. It provides an easy way to view and interact with the state management and storage system of your React application.

## Features

- View React component states and props.
- Inspect and manipulate `localStorage` and `sessionStorage` data.
- Easy-to-use toggle button for opening and closing the DevPeek panel.
- Integrates seamlessly with React state management libraries like Zustand and Context API.
- Supports both light and dark mode.

## Installation

### With npm

To install the beta version of `react-devpeek`, use:

```bash
npm install react-devpeek@beta
```

### With yarn

```bash
yarn add react-devpeek@beta
```

## Usage

1. Import and add `ReactDevPeek` to your application.
   
   ```tsx
   import { ReactDevPeek } from 'react-devpeek';
   ```

2. Add the component in your app, usually at the top level:

   ```tsx
   const App = () => {
     return (
       <div>
         <ReactDevPeek />
         {/* Your other app components */}
       </div>
     );
   };
   ```

3. The panel will automatically appear when the toggle button is clicked.

## API

### `ReactDevPeek`

The main component for displaying the developer tool. It automatically connects to the Zustand store or React Context.

#### Props

- `isOpen`: `boolean` (default: `false`)  
  Whether the DevPeek panel is open or closed.
  
- `onClick`: `() => void`  
  Callback function to handle click events on the toggle button.
  
- `position`: `Position` (default: `"bottom-right"`)  
  Controls the position of the toggle button. Can be one of:
  - `"top-left"`
  - `"top-right"`
  - `"bottom-left"`
  - `"bottom-right"`
  
- `isDarkMode`: `boolean` (default: `false`)  
  Enables dark mode for the DevPeek panel.

### `ToggleButton`

The button that toggles the panel visibility.

#### Props

- `isOpen`: `boolean`  
  Whether the panel is open or closed.
  
- `onClick`: `() => void`  
  Function to be called when the button is clicked.
  
- `position`: `Position`  
  Button position.
  
- `isDarkMode`: `boolean`  
  Dark mode option for the button.

## Example

```tsx
import React, { useState } from 'react';
import { ReactDevPeek } from 'react-devpeek';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <div>
      <ReactDevPeek isOpen={isOpen} onClick={togglePanel} position="bottom-right" isDarkMode={false} />
    </div>
  );
};

export default App;
```

## Development

To run the package locally and work on the development version:

1. Clone the repository:

   ```bash
   git clone https://github.com/Socdev-africa/react-devpeek.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Build the package:

   ```bash
   npm run build
   ```

5. Run the demo:

   ```bash
   npm run demo
   ```

## Contributing

Feel free to fork the repository and submit pull requests. If you encounter any issues or have feature requests, please [open an issue](https://github.com/Socdev-africa/react-devpeek/issues).

## License

MIT © [Socdev-africa](https://github.com/Socdev-africa)
