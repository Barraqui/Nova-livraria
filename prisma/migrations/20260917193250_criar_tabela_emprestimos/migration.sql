-- CreateTable
CREATE TABLE "Emprestimos" (
    "id" SERIAL NOT NULL,
    "dataEmprestimo" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataDevolucao" TIMESTAMP(3),
    "livroId" INTEGER NOT NULL,
    "clienteId" INTEGER NOT NULL,

    CONSTRAINT "Emprestimos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Emprestimos" ADD CONSTRAINT "Emprestimos_livroId_fkey" FOREIGN KEY ("livroId") REFERENCES "Livro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimos" ADD CONSTRAINT "Emprestimos_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
