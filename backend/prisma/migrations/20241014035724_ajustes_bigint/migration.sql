/*
  Warnings:

  - The primary key for the `cliente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `cliente` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `endereco` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `endereco` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `itempedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `itempedido` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `pedidoId` on the `itempedido` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `produtoId` on the `itempedido` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `pedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `clienteId` on the `pedido` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `pedido` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `produto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `fornecedorId` on the `produto` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `id` on the `produto` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `transacao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `transacao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `pedidoId` on the `transacao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `produtoId` on the `transacao` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "endereco" TEXT NOT NULL
);
INSERT INTO "new_cliente" ("contato", "cpf_cnpj", "endereco", "id", "nome") SELECT "contato", "cpf_cnpj", "endereco", "id", "nome" FROM "cliente";
DROP TABLE "cliente";
ALTER TABLE "new_cliente" RENAME TO "cliente";
CREATE TABLE "new_endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "endereco" TEXT NOT NULL
);
INSERT INTO "new_endereco" ("cnpj", "contato", "endereco", "id", "nome") SELECT "cnpj", "contato", "endereco", "id", "nome" FROM "endereco";
DROP TABLE "endereco";
ALTER TABLE "new_endereco" RENAME TO "endereco";
CREATE TABLE "new_itempedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pedidoId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" DECIMAL NOT NULL,
    "precoUnitario" DECIMAL NOT NULL,
    CONSTRAINT "itempedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "itempedido_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_itempedido" ("id", "pedidoId", "precoUnitario", "produtoId", "quantidade") SELECT "id", "pedidoId", "precoUnitario", "produtoId", "quantidade" FROM "itempedido";
DROP TABLE "itempedido";
ALTER TABLE "new_itempedido" RENAME TO "itempedido";
CREATE TABLE "new_pedido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "clienteId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "total" DECIMAL NOT NULL,
    CONSTRAINT "pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_pedido" ("clienteId", "data", "id", "status", "total") SELECT "clienteId", "data", "id", "status", "total" FROM "pedido";
DROP TABLE "pedido";
ALTER TABLE "new_pedido" RENAME TO "pedido";
CREATE TABLE "new_produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "quantidade" DECIMAL NOT NULL,
    "imagem" BLOB NOT NULL,
    "fornecedorId" INTEGER NOT NULL,
    CONSTRAINT "produto_fornecedorId_fkey" FOREIGN KEY ("fornecedorId") REFERENCES "endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_produto" ("descricao", "fornecedorId", "id", "imagem", "nome", "preco", "quantidade") SELECT "descricao", "fornecedorId", "id", "imagem", "nome", "preco", "quantidade" FROM "produto";
DROP TABLE "produto";
ALTER TABLE "new_produto" RENAME TO "produto";
CREATE TABLE "new_transacao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "tipo" TEXT NOT NULL,
    "valor" DECIMAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "pedidoId" INTEGER NOT NULL,
    CONSTRAINT "transacao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transacao_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedido" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_transacao" ("data", "id", "pedidoId", "produtoId", "tipo", "valor") SELECT "data", "id", "pedidoId", "produtoId", "tipo", "valor" FROM "transacao";
DROP TABLE "transacao";
ALTER TABLE "new_transacao" RENAME TO "transacao";
CREATE TABLE "new_usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_usuario" ("email", "id", "nome", "senha") SELECT "email", "id", "nome", "senha" FROM "usuario";
DROP TABLE "usuario";
ALTER TABLE "new_usuario" RENAME TO "usuario";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
