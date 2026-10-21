import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextCoreWebVitals,
  {
    // New React Compiler rules (react-hooks v7) flag pre-existing patterns; surface them without failing lint
    rules: {
      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
]

export default config
