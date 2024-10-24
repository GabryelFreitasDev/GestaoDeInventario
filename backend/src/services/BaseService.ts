export function validarCampo(campo: any, mensagem: string) {
    if (!campo) throw new Error(mensagem);
}