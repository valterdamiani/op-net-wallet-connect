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
        'VITE_OPNET_RPC_URL',
        'VITE_MOTO_TOKEN',
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
