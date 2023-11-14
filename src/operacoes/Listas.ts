export function filtrarListas(listaIngredientes: string[], ingredientes: string[]) {
    return listaIngredientes.every((ingrediente) => ingredientes.includes(ingrediente));
}