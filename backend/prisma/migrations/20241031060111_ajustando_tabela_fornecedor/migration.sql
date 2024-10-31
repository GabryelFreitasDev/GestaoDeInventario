/*
  Warnings:

  - You are about to drop the `endereco` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "endereco";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "fornecedor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "endereco" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "quantidade" DECIMAL NOT NULL,
    "imagem" BLOB NOT NULL,
    "fornecedorId" INTEGER NOT NULL,
    CONSTRAINT "produto_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "fornecedor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produto" ("descricao", "fornecedorId", "id", "imagem", "nome", "preco", "quantidade") SELECT "descricao", "fornecedorId", "id", "imagem", "nome", "preco", "quantidade" FROM "produto";
DROP TABLE "produto";
ALTER TABLE "new_produto" RENAME TO "produto";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
