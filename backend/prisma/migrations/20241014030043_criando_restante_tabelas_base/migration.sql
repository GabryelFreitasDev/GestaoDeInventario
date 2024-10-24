/*
  Warnings:

  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `usuario` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `String` to `BigInt`.

*/
-- CreateTable
CREATE TABLE "cliente" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "endereco" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "endereco" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "endereco" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "produto" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "quantidade" DECIMAL NOT NULL,
    "imagem" BLOB NOT NULL,
    "fornecedorId" BIGINT NOT NULL,
    CONSTRAINT "produto_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pedido" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "clienteId" BIGINT NOT NULL,
    "status" TEXT NOT NULL,
    "total" DECIMAL NOT NULL,
    CONSTRAINT "pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "itempedido" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "pedidoId" BIGINT NOT NULL,
    "produtoId" BIGINT NOT NULL,
    "quantidade" DECIMAL NOT NULL,
    "precoUnitario" DECIMAL NOT NULL,
    CONSTRAINT "itempedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "itempedido_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "transacao" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" DECIMAL NOT NULL,
    "produtoId" BIGINT NOT NULL,
    "pedidoId" BIGINT NOT NULL,
    CONSTRAINT "transacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transacao_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_usuario" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_usuario" ("email", "id", "nome", "senha") SELECT "email", "id", "nome", "senha" FROM "usuario";
DROP TABLE "usuario";
ALTER TABLE "new_usuario" RENAME TO "usuario";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
