import { useState, useEffect } from 'react';

interface ValidationResult {
  isValid: boolean;
  missingVariables: string[];
}

const useEnvironmentValidation = (): ValidationResult => {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    isValid: true,
    missingVariables: []
  });

  useEffect(() => {
    const validateEnvironment = () => {
    const requiredVars = [
      'VITE_WALLETCONNECT_PROJECT_ID',
      'VITE_OPNET_RPC_URL',
      'VITE_OPNET_CHAIN_ID',
      'VITE_OPNET_CHAIN_NAME',
      'VITE_OPNET_CURRENCY_NAME',
      'VITE_OPNET_CURRENCY_SYMBOL',
      'VITE_OPNET_CURRENCY_DECIMALS',
      'VITE_OP20_TOKEN_ADDRESS',
      'VITE_OP20_SPENDER_ADDRESS',
      'VITE_METHOD_HASH_NAME',
      'VITE_METHOD_HASH_SYMBOL',
      'VITE_METHOD_HASH_DECIMALS',
      'VITE_METHOD_HASH_MAX_SUPPLY',
      'VITE_METHOD_HASH_TOTAL_SUPPLY',
      'VITE_METHOD_HASH_BALANCE_OF',
      'VITE_METHOD_HASH_ALLOWANCE',
      'VITE_METHOD_HASH_APPROVE',
      'VITE_METHOD_HASH_TRANSFER',
      'VITE_METHOD_HASH_DEFAULT',
    ];

      const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
      
      setValidationResult({
        isValid: missingVars.length === 0,
        missingVariables: missingVars
      });
    };

    validateEnvironment();
  }, []);

  return validationResult;
};

export default useEnvironmentValidation;
