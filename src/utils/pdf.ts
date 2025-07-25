import { PDFDocument } from "pdf-lib";
import html2canvas from "html2canvas";

/**
 * Exporta o conteúdo de um elemento como PDF com alta resolução.
 * @param selector CSS selector do elemento a exportar
 * @param fileName Nome do arquivo PDF
 */
export async function exportToPDF(selector: string, fileName: string) {
  const element = document.querySelector(selector);
  if (!element) return;

  // Aumenta a escala para melhorar a resolução
  const scale = 2;
  const canvas = await html2canvas(element as HTMLElement, {
    background: "#fff",
    scale,
    useCORS: true,
  } as any);

  const imgData = canvas.toDataURL("image/png");

  // Cria o PDF com tamanho proporcional ao canvas
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([canvas.width, canvas.height]);
  const pngImage = await pdfDoc.embedPng(imgData);

  page.drawImage(pngImage, {
    x: 0,
    y: 0,
    width: canvas.width,
    height: canvas.height,
  });

  const pdfBytes = await pdfDoc.save();

  // Baixa o PDF
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}