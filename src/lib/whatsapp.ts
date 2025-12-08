export const WHATSAPP_NUMBER = "5511954474237";

export const MESSAGES = {
  default: "Olá! Gostaria de saber mais sobre os serviços da Tuany Barreiros Bioestética.",
  agendar: "Olá! Gostaria de agendar uma consulta.",
  duvida: "Olá! Tenho uma dúvida sobre os tratamentos.",
  avaliacao: "Olá! Gostaria de agendar uma avaliação.",
  pacote: "Olá! Gostaria de saber mais sobre os pacotes de serviços.",
  procedimento: (nome: string) => `Olá! Gostaria de saber mais sobre o procedimento: ${nome}.`,
};

export function getWhatsAppLink(message: string = MESSAGES.default) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}
