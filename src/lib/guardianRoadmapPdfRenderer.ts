/**
 * Clarify Wealth — Guardian Roadmap PDF Renderer
 *
 * Renders a ClarifyDocument to a jsPDF document using native text,
 * branded headers/footers, and the Clarify Wealth visual system.
 *
 * The renderer only lays out content.  It does not interpret, infer,
 * or create planning conclusions.
 */

import { jsPDF } from 'jspdf';
import type {
  ClarifyDocument,
  ClarifySection,
  ClarifyBlock,
  EvidenceTag,
} from './clarifyDocumentTypes';
import { EVIDENCE_TAG_LABELS } from './clarifyDocumentTypes';

// ─── Brand palette ─────────────────────────────────────────────────────────────

const BRAND = {
  navy: [15, 58, 94] as [number, number, number],       // #0f3a5e
  gold: [197, 165, 114] as [number, number, number],     // #c5a572
  slate: [51, 65, 85] as [number, number, number],       // #334155
  lightSlate: [100, 116, 139] as [number, number, number],
  paleBg: [248, 250, 252] as [number, number, number],
  border: [226, 232, 240] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
};

const TAG_COLORS: Record<EvidenceTag, [number, number, number]> = {
  parentWish: [29, 78, 216],
  clientUnderstanding: [21, 128, 61],
  worthConfirming: [180, 83, 9],
  professionalReview: [185, 28, 28],
  missingInfo: [100, 116, 139],
};

// ─── Layout constants ──────────────────────────────────────────────────────────

const PAGE_W = 612;  // 8.5in at 72dpi
const PAGE_H = 792;  // 11in
const MARGIN_L = 60;
const MARGIN_R = 60;
const MARGIN_T = 72;
const MARGIN_B = 60;
const CONTENT_W = PAGE_W - MARGIN_L - MARGIN_R;

// ─── PDF state ─────────────────────────────────────────────────────────────────

interface RenderState {
  pdf: jsPDF;
  y: number;
  page: number;
  familyName: string;
  reportDate: string;
}

function createState(familyName: string, reportDate: string): RenderState {
  const pdf = new jsPDF({ unit: 'pt', format: 'letter' });
  pdf.setFont('helvetica', 'normal');
  return { pdf, y: MARGIN_T, page: 1, familyName, reportDate };
}

// ─── Page management ───────────────────────────────────────────────────────────

function headerFooter(state: RenderState): void {
  const { pdf, page, familyName } = state;
  // Footer line
  pdf.setDrawColor(...BRAND.border);
  pdf.setLineWidth(0.5);
  pdf.line(MARGIN_L, PAGE_H - MARGIN_B + 10, PAGE_W - MARGIN_R, PAGE_H - MARGIN_B + 10);

  // Footer text
  pdf.setFontSize(8);
  pdf.setTextColor(...BRAND.lightSlate);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Clarify Wealth', MARGIN_L, PAGE_H - MARGIN_B + 22);
  pdf.text(`${familyName} — Guardianship Roadmap`, PAGE_W / 2, PAGE_H - MARGIN_B + 22, { align: 'center' });
  pdf.text(String(page), PAGE_W - MARGIN_R, PAGE_H - MARGIN_B + 22, { align: 'right' });

  // Header (interior pages only, page > 1)
  if (page > 1) {
    pdf.setDrawColor(...BRAND.gold);
    pdf.setLineWidth(1);
    pdf.line(MARGIN_L, MARGIN_T - 18, MARGIN_L + 40, MARGIN_T - 18);
    pdf.setFontSize(8);
    pdf.setTextColor(...BRAND.navy);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CLARIFY WEALTH', MARGIN_L, MARGIN_T - 22);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...BRAND.lightSlate);
    pdf.text('Guardianship Roadmap', PAGE_W - MARGIN_R, MARGIN_T - 22, { align: 'right' });
  }
}

function newPage(state: RenderState): void {
  state.pdf.addPage();
  state.page += 1;
  state.y = MARGIN_T;
  headerFooter(state);
}

function ensureSpace(state: RenderState, needed: number): void {
  if (state.y + needed > PAGE_H - MARGIN_B) {
    newPage(state);
  }
}

// ─── Text helpers ──────────────────────────────────────────────────────────────

function wrappedText(
  state: RenderState,
  text: string,
  fontSize: number,
  fontStyle: 'normal' | 'bold' | 'italic' = 'normal',
  color: [number, number, number] = BRAND.slate,
  lineGap: number = 1.4,
  maxWidth: number = CONTENT_W,
): number {
  const { pdf } = state;
  pdf.setFontSize(fontSize);
  pdf.setFont('helvetica', fontStyle);
  pdf.setTextColor(...color);
  const lines = pdf.splitTextToSize(text, maxWidth) as string[];
  const lineHeight = fontSize * lineGap;

  for (const line of lines) {
    ensureSpace(state, lineHeight);
    pdf.text(line, MARGIN_L, state.y);
    state.y += lineHeight;
  }
  return state.y;
}

function evidenceTagInline(state: RenderState, tag?: EvidenceTag, label?: string): void {
  if (!tag || !label) return;
  const { pdf } = state;
  const tagColor = TAG_COLORS[tag];
  const tagText = `  ${label}`;
  pdf.setFontSize(7);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...tagColor);
  // Draw tag right after current text position
  ensureSpace(state, 12);
  pdf.text(tagText, MARGIN_L, state.y - 2);
  pdf.setTextColor(...BRAND.slate);
  pdf.setFont('helvetica', 'normal');
}

// ─── Block renderers ───────────────────────────────────────────────────────────

function renderHeading(state: RenderState, block: ClarifyBlock): void {
  if (block.pageBreakBefore) {
    newPage(state);
  }
  state.y += 8;
  wrappedText(state, block.text || '', 15, 'bold', BRAND.navy, 1.3);
  state.y += 4;
}

function renderSubheading(state: RenderState, block: ClarifyBlock): void {
  if (state.y > MARGIN_T + 10) state.y += 6;
  ensureSpace(state, 30);
  wrappedText(state, block.text || '', 12, 'bold', BRAND.slate, 1.3);
  if (block.evidenceTag && block.evidenceLabel) {
    evidenceTagInline(state, block.evidenceTag, block.evidenceLabel);
  }
  state.y += 2;
}

function renderBody(state: RenderState, block: ClarifyBlock): void {
  wrappedText(state, block.text || '', 10.5, 'normal', BRAND.slate, 1.5);
  if (block.evidenceTag && block.evidenceLabel) {
    evidenceTagInline(state, block.evidenceTag, block.evidenceLabel);
  }
  state.y += 4;
}

function renderBullets(state: RenderState, block: ClarifyBlock): void {
  const { pdf } = state;
  const items = block.items || [];
  pdf.setFontSize(10.5);
  pdf.setTextColor(...BRAND.slate);

  for (const item of items) {
    const lines = pdf.splitTextToSize(item, CONTENT_W - 20) as string[];
    const lineHeight = 10.5 * 1.5;
    ensureSpace(state, lineHeight * lines.length);
    pdf.text('\u2022', MARGIN_L + 4, state.y);
    for (let i = 0; i < lines.length; i++) {
      if (i > 0) ensureSpace(state, lineHeight);
      pdf.text(lines[i], MARGIN_L + 16, state.y);
      state.y += lineHeight;
    }
  }
  state.y += 4;
}

function renderCallout(state: RenderState, block: ClarifyBlock): void {
  const { pdf } = state;
  const tagColor = block.evidenceTag ? TAG_COLORS[block.evidenceTag] : BRAND.lightSlate;
  const bgColor: [number, number, number] = [252, 250, 245];

  // Measure
  const lines = pdf.splitTextToSize(block.text || '', CONTENT_W - 32) as string[];
  const boxH = 16 + lines.length * 13 + 8;

  ensureSpace(state, boxH + 6);

  // Draw box
  pdf.setFillColor(...bgColor);
  pdf.setDrawColor(...BRAND.border);
  pdf.setLineWidth(0.5);
  pdf.rect(MARGIN_L, state.y, CONTENT_W, boxH, 'S');
  // Left accent
  pdf.setFillColor(...tagColor);
  pdf.rect(MARGIN_L, state.y, 3, boxH, 'F');

  // Tag
  pdf.setFontSize(7);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...tagColor);
  pdf.text((block.evidenceLabel || '').toUpperCase(), MARGIN_L + 10, state.y + 12);

  // Body
  pdf.setFontSize(9.5);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(...BRAND.slate);
  let ty = state.y + 24;
  for (const line of lines) {
    pdf.text(line, MARGIN_L + 10, ty);
    ty += 13;
  }

  state.y += boxH + 6;
}

function renderRoleTable(state: RenderState, block: ClarifyBlock): void {
  const { pdf } = state;
  const rows = block.rows || [];
  if (rows.length === 0) return;

  const colWidths = [100, 110, 160, 120];
  const headers = ['Role', 'Person', 'What They Handle', 'When to Contact'];

  // Header row
  pdf.setFillColor(...BRAND.paleBg);
  pdf.rect(MARGIN_L, state.y, CONTENT_W, 20, 'F');
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...BRAND.navy);
  let x = MARGIN_L + 6;
  for (let i = 0; i < headers.length; i++) {
    pdf.text(headers[i], x, state.y + 13);
    x += colWidths[i];
  }
  state.y += 20;

  // Data rows
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(...BRAND.slate);
  for (const row of rows) {
    const cells = [row.role, row.person, row.responsibility, row.whenToContact || ''];
    const maxLines = Math.max(...cells.map((c, i) => {
      const lines = pdf.splitTextToSize(c, colWidths[i] - 8) as string[];
      return lines.length;
    }));
    const rowH = Math.max(16, maxLines * 12 + 4);
    ensureSpace(state, rowH);

    // Bottom border
    pdf.setDrawColor(...BRAND.border);
    pdf.setLineWidth(0.3);
    pdf.line(MARGIN_L, state.y + rowH, MARGIN_L + CONTENT_W, state.y + rowH);

    x = MARGIN_L + 6;
    for (let i = 0; i < cells.length; i++) {
      const lines = pdf.splitTextToSize(cells[i], colWidths[i] - 8) as string[];
      for (let j = 0; j < lines.length; j++) {
        pdf.text(lines[j], x, state.y + 12 + j * 12);
      }
      x += colWidths[i];
    }
    state.y += rowH;
  }
  state.y += 6;
}

function renderActionList(state: RenderState, block: ClarifyBlock): void {
  const { pdf } = state;
  const lines = pdf.splitTextToSize(block.text || '', CONTENT_W - 32) as string[];
  const boxH = 14 + lines.length * 13 + 6;

  ensureSpace(state, boxH + 4);

  // Left accent
  pdf.setFillColor(...BRAND.gold);
  pdf.rect(MARGIN_L, state.y, 3, boxH, 'F');
  pdf.setFillColor(255, 251, 245);
  pdf.rect(MARGIN_L + 3, state.y, CONTENT_W - 3, boxH, 'F');

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...BRAND.navy);
  if (block.title) {
    pdf.text(block.title, MARGIN_L + 10, state.y + 13);
  }

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9.5);
  pdf.setTextColor(...BRAND.slate);
  let ty = state.y + (block.title ? 24 : 12);
  for (const line of lines) {
    pdf.text(line, MARGIN_L + 10, ty);
    ty += 13;
  }

  state.y += boxH + 4;
}

function renderQuickRef(state: RenderState, block: ClarifyBlock): void {
  const { pdf } = state;
  const items = block.items || [];
  pdf.setFontSize(9.5);
  pdf.setTextColor(...BRAND.slate);

  for (const item of items) {
    const lines = pdf.splitTextToSize(item, CONTENT_W) as string[];
    ensureSpace(state, 14);
    pdf.text(lines[0], MARGIN_L, state.y);
    state.y += 14;
    // Bottom border
    pdf.setDrawColor(...BRAND.border);
    pdf.setLineWidth(0.3);
    pdf.line(MARGIN_L, state.y - 4, MARGIN_L + CONTENT_W, state.y - 4);
  }
  state.y += 4;
}

function renderLimitation(state: RenderState, block: ClarifyBlock): void {
  const { pdf } = state;
  const lines = pdf.splitTextToSize(block.text || '', CONTENT_W - 28) as string[];
  const boxH = 16 + lines.length * 12 + 6;

  ensureSpace(state, boxH + 4);

  pdf.setFillColor(...BRAND.paleBg);
  pdf.setDrawColor(...BRAND.border);
  pdf.setLineWidth(0.5);
  pdf.rect(MARGIN_L, state.y, CONTENT_W, boxH, 'S');
  pdf.setFillColor(...BRAND.lightSlate);
  pdf.rect(MARGIN_L, state.y, 3, boxH, 'F');

  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...BRAND.slate);
  if (block.title) {
    pdf.text(block.title, MARGIN_L + 10, state.y + 13);
  }

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(9);
  pdf.setTextColor(...BRAND.lightSlate);
  let ty = state.y + (block.title ? 23 : 13);
  for (const line of lines) {
    pdf.text(line, MARGIN_L + 10, ty);
    ty += 12;
  }

  state.y += boxH + 4;
}

// ─── Block dispatcher ──────────────────────────────────────────────────────────

function renderBlock(state: RenderState, block: ClarifyBlock): void {
  switch (block.type) {
    case 'heading': renderHeading(state, block); break;
    case 'subheading': renderSubheading(state, block); break;
    case 'body': renderBody(state, block); break;
    case 'bullets': renderBullets(state, block); break;
    case 'callout': renderCallout(state, block); break;
    case 'roleTable': renderRoleTable(state, block); break;
    case 'actionList': renderActionList(state, block); break;
    case 'quickRef': renderQuickRef(state, block); break;
    case 'limitation': renderLimitation(state, block); break;
    case 'pageBreak': newPage(state); break;
    default: break;
  }
}

// ─── Section renderer ──────────────────────────────────────────────────────────

function renderSection(state: RenderState, section: ClarifySection): void {
  // Section heading
  if (state.y > MARGIN_T + 20) state.y += 10;
  ensureSpace(state, 30);
  wrappedText(state, section.heading, 15, 'bold', BRAND.navy, 1.3);
  // Gold underline
  state.pdf.setDrawColor(...BRAND.gold);
  state.pdf.setLineWidth(1.5);
  state.pdf.line(MARGIN_L, state.y - 2, MARGIN_L + 45, state.y - 2);
  state.y += 6;

  if (section.purpose) {
    wrappedText(state, section.purpose, 9, 'italic', BRAND.lightSlate, 1.3);
    state.y += 4;
  }

  for (const block of section.blocks) {
    renderBlock(state, block);
  }
}

// ─── Cover page ────────────────────────────────────────────────────────────────

function renderCover(state: RenderState, doc: ClarifyDocument): void {
  const { pdf } = state;
  const cover = doc.cover;

  // Brand text
  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(...BRAND.navy);
  pdf.text('CLARIFY WEALTH', PAGE_W / 2, 180, { align: 'center' });

  // Gold line
  pdf.setDrawColor(...BRAND.gold);
  pdf.setLineWidth(1.5);
  pdf.line(PAGE_W / 2 - 60, 195, PAGE_W / 2 + 60, 195);

  // Title
  pdf.setFontSize(36);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(...BRAND.navy);
  pdf.text('Guardianship Roadmap', PAGE_W / 2, 260, { align: 'center' });

  // Subtitle
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'italic');
  pdf.setTextColor(...BRAND.lightSlate);
  const subLines = pdf.splitTextToSize(cover.subtitle, 360) as string[];
  let sy = 290;
  for (const line of subLines) {
    pdf.text(line, PAGE_W / 2, sy, { align: 'center' });
    sy += 16;
  }

  // Meta
  const metaY = 420;
  const metaItems = [
    { label: 'PREPARED FOR', value: cover.familyName },
    { label: 'FOR', value: cover.childNames.join(', ') || 'Your children' },
    { label: 'PREPARED', value: cover.preparedDate },
  ];

  let my = metaY;
  for (const item of metaItems) {
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(...BRAND.lightSlate);
    pdf.text(item.label, PAGE_W / 2, my, { align: 'center' });
    pdf.setFontSize(13);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(...BRAND.slate);
    pdf.text(item.value, PAGE_W / 2, my + 16, { align: 'center' });
    my += 42;
  }

  // No header/footer on cover
  state.page = 1;
}

// ─── Intro page ────────────────────────────────────────────────────────────────

function renderIntro(state: RenderState): void {
  newPage(state);
  wrappedText(state, 'Start Here', 18, 'bold', BRAND.navy, 1.3);
  state.pdf.setDrawColor(...BRAND.gold);
  state.pdf.setLineWidth(1.5);
  state.pdf.line(MARGIN_L, state.y - 2, MARGIN_L + 45, state.y - 2);
  state.y += 16;

  const introTexts = [
    'This Guardianship Roadmap was prepared from information provided by the parents through the Will Companion Kit. It reflects their wishes, planning intentions, and the information available when the Roadmap was prepared.',
    'It does not independently verify legal documents, legal authority, tax treatment, medical information, or account values. Important decisions should be confirmed with the appropriate lawyer, accountant, financial planner, or healthcare professional.',
    'This document is intended to help a guardian understand the family\'s planning intentions and practical information — so they can focus on the children, not on figuring out what the parents would have wanted.',
  ];

  for (const text of introTexts) {
    wrappedText(state, text, 10.5, 'normal', BRAND.slate, 1.55);
    state.y += 6;
  }
}

// ─── Quick reference section ───────────────────────────────────────────────────

function renderQuickReference(state: RenderState, doc: ClarifyDocument): void {
  if (!doc.quickReference || doc.quickReference.length === 0) return;
  renderSection(state, {
    id: 'quick-reference',
    heading: 'Quick Reference',
    blocks: [{
      id: 'qr',
      type: 'quickRef',
      items: doc.quickReference.map(q => `${q.label}: ${q.value}`),
    }],
  });
}

// ─── Main renderer ─────────────────────────────────────────────────────────────

export function renderGuardianRoadmapPdf(doc: ClarifyDocument): jsPDF {
  const state = createState(doc.cover.familyName, doc.cover.preparedDate);

  // Cover page (no header/footer)
  renderCover(state, doc);

  // Start interior pages
  newPage(state);
  renderIntro(state);

  // Render all sections
  for (const section of doc.sections) {
    renderSection(state, section);
  }

  // Quick reference
  renderQuickReference(state, doc);

  return state.pdf;
}

export function generateGuardianRoadmapPdf(doc: ClarifyDocument): Blob {
  const pdf = renderGuardianRoadmapPdf(doc);
  return pdf.output('blob');
}
