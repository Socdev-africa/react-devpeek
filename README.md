# react-devpeek

**A developer tool for debugging React state and local/session storage**

`react-devpeek` is a lightweight debugging tool that helps React developers inspect and manipulate state management and browser storage at runtime. It provides an intuitive interface for viewing state snapshots and managing localStorage/sessionStorage directly in your app during development.

![React DevPeek](https://via.placeholder.com/800x400?text=React+DevPeek+Screenshot)

## Features

- 🔍 **Storage Inspector**: View, edit, and delete localStorage and sessionStorage items
- 🧩 **State Management**: Connect to any state management library (Zustand, Redux, MobX, Context API)
- 🌓 **Dark Mode Support**: Automatically adapts to system preferences or manual setting
- 📱 **Responsive Design**: Draggable panel works on all screen sizes
- 📤 **Export Functionality**: Export state and storage data as JSON
- 🧪 **Production Safe**: Automatically disabled in production by default

## Installation

```bash
npm install react-devpeek
# or
yarn add react-devpeek
# or
pnpm add react-devpeek
```

## Basic Usage

Add the DevPeek component to your application's root component:

```jsx
import ReactDevPeek from 'react-devpeek';

function App() {
  return (
    <>
      <YourApp />
      <ReactDevPeek />
    </>
  );
}
```

## Connecting State Adapters

DevPeek can connect to any state management library using adapters:

### Zustand Example

```jsx
import ReactDevPeek from 'react-devpeek';
import { useCounterStore } from './stores/counterStore';
import { useUserStore } from './stores/userStore';

function App() {
  return (
    <>
      <YourApp />
      <ReactDevPeek 
        stateAdapters={[
          {
            name: 'Counter Store',
            getState: useCounterStore.getState,
            subscribe: useCounterStore.subscribe
          },
          {
            name: 'User Store',
            getState: useUserStore.getState,
            subscribe: useUserStore.subscribe
          }
        ]}
      />
    </>
  );
}
```

### React Context API Example

```jsx
import ReactDevPeek from 'react-devpeek';
import { ThemeContext } from './contexts/ThemeContext';
import { UserContext } from './contexts/UserContext';

function App() {
  // Create adapters for context
  const themeContextAdapter = {
    name: 'Theme Context',
    getState: () => React.useContext(ThemeContext),
    // No subscribe method for Context - DevPeek will poll periodically
  };

  const userContextAdapter = {
    name: 'User Context',
    getState: () => React.useContext(UserContext),
  };

  return (
    <>
      <YourApp />
      <ReactDevPeek 
        stateAdapters={[themeContextAdapter, userContextAdapter]}
      />
    </>
  );
}
```

## Configuration Options

The `ReactDevPeek` component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showInProduction` | boolean | `false` | Show DevPeek in production environments |
| `position` | 'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' | `'bottom-right'` | Position of the toggle button |
| `theme` | 'light' \| 'dark' \| 'system' | `'system'` | UI theme |
| `defaultOpen` | boolean | `false` | Open the panel by default |
| `stateAdapters` | StateAdapter[] | `[]` | Array of state adapters to connect |
| `enableLocalStorage` | boolean | `true` | Enable localStorage monitoring |
| `enableSessionStorage` | boolean | `true` | Enable sessionStorage monitoring |

### StateAdapter Interface

```typescript
interface StateAdapter {
  // Display name for the adapter
  name: string;
  
  // Function that returns the current state
  getState: () => any;
  
  // Optional subscription function that calls a listener when state changes
  // Should return a function to unsubscribe
  subscribe?: (listener: () => void) => (() => void) | void;
}
```

## Advanced Usage

### Custom Positioning

```jsx
<ReactDevPeek position="top-left" />
```

### Theming

```jsx
// Set theme explicitly
<ReactDevPeek theme="dark" />

// Use system preference
<ReactDevPeek theme="system" />
```

### Controlling Visibility

```jsx
const [isDevToolOpen, setDevToolOpen] = useState(false);

<ReactDevPeek defaultOpen={isDevToolOpen} />
```

### Selective Storage Monitoring

```jsx
// Only monitor localStorage, not sessionStorage
<ReactDevPeek enableSessionStorage={false} />

// Only monitor sessionStorage, not localStorage
<ReactDevPeek enableLocalStorage={false} />
```

## Development

To develop locally:

1. Clone the repository
   ```bash
   git clone https://github.com/Socdev-africa/react-devpeek.git
   cd react-devpeek
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the demo app
   ```bash
   npm run demo
   ```

4. Build the library
   ```bash
   npm run build
   ```

5. Run tests
   ```bash
   npm test
   ```

## Demo

To see a live demo of React DevPeek:

```bash
# Clone the repository
git clone https://github.com/Socdev-africa/react-devpeek.git

# Navigate to the project
cd react-devpeek

# Install dependencies
npm install

# Run the demo
npm run demo
```

This will start a development server with a demo application showcasing various features of React DevPeek.

## Browser Support

React DevPeek supports all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

MIT © [SocDev Africa](https://github.com/Socdev-africa)

## Contributors

- [SocDev Africa](https://github.com/Socdev-africa)

## Acknowledgements

- [Framer Motion](https://www.framer.com/motion/) for animations
- [Zustand](https://github.com/pmndrs/zustand) for state management
- [Tailwind CSS](https://tailwindcss.com/) for styling