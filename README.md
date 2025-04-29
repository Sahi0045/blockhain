# ComMeme - Blockchain Meme Tokenization Platform

ComMeme is a revolutionary platform that combines meme culture with blockchain technology to create a unique tokenization system. The platform enables users to tokenize memes and participate in a Universal Basic Income (UBI) system.

## Features

- **Meme Tokenization**: Convert your favorite memes into unique digital assets
- **UBI Distribution**: Receive regular UBI tokens through the platform
- **Gasless Transactions**: Enjoy seamless transactions without worrying about gas fees
- **Email Authentication**: Secure and easy-to-use authentication system
- **Multi-Chain Support**: Built on UnichainSepolia network

## Tech Stack

- **Frontend**: React, Vite, TypeScript
- **Authentication**: Supabase
- **Blockchain**: UnichainSepolia
- **Smart Contracts**: Solidity
- **Styling**: Tailwind CSS

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/commeme-blockchain.git
cd commeme-blockchain
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RELAY=http://localhost:3000
```

4. Start the development server:
```bash
pnpm dev
```

## Project Structure

```
commeme-frontend/
├── src/
│   ├── components/     # React components
│   ├── lib/           # Utility functions and configurations
│   ├── hooks/         # Custom React hooks
│   └── App.tsx        # Main application component
├── public/            # Static assets
└── package.json       # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, please open an issue in the repository.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
