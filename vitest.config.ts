import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        "**/domain/**", // Exclui arquivos de definição de tipos,
        "vitest.config.ts", // Exclui o arquivo de configuração do Vitest
      ],
    },
  },
});
