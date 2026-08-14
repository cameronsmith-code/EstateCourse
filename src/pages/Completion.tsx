import { Link } from 'react-router-dom';
import { CheckCircle, Download, Home, FileText, Eye } from 'lucide-react';
import { generatePDF } from '../lib/pdfGenerator';
import { useEffect, useState, useMemo } from 'react';
import { useQuestionnaire } from '../context/QuestionnaireContext';
import { buildGuardianshipRoadmap } from '../lib/guardianshipRoadmapBuilder';
import { buildGuardianshipNarrative } from '../lib/guardianshipNarrativeBuilder';
import { composeGuardianshipForAudience } from '../lib/guardianshipAudienceComposer';
import { buildGuardianClarifyDocument } from '../lib/guardianRoadmapDocumentBuilder';
import { renderClarifyDocumentHtml } from '../lib/clarifyHtmlRenderer';
import { generateGuardianRoadmapPdf } from '../lib/guardianRoadmapPdfRenderer';

export default function Completion() {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [showGuardianPreview, setShowGuardianPreview] = useState(false);
  const { answers } = useQuestionnaire();

  useEffect(() => {
    const aboutYou = answers.get('aboutYou') || {};
    const previousRelationships = answers.get('previousRelationships') || {};
    const children = answers.get('children') || {};
    const familyTrusts = answers.get('familyTrusts') || {};
    const businessInterests = answers.get('businessInterests') || {};
    const corporations = answers.get('corporations') || {};
    const corporateFinancialConnections = answers.get('corporateFinancialConnections') || {};
    const professionalTeam = answers.get('professionalTeam') || {};
    const financialFootprint = answers.get('financialFootprint') || {};
    const realEstate = answers.get('realEstate') || {};
    const debtObligations = answers.get('debtObligations') || {};
    const lifeInsurance = answers.get('lifeInsurance') || {};
    const propertyLiabilityInsurance = answers.get('propertyLiabilityInsurance') || {};
    const legacyIntent = answers.get('legacyIntent') || {};
    const wills = answers.get('wills') || {};
    const powersOfAttorney = answers.get('powersOfAttorney') || {};
    const estateTrustees = answers.get('estateTrustees') || {};
    const funeralArrangements = answers.get('funeralArrangements') || {};
    const pensionsRegisteredAccounts = answers.get('pensionsRegisteredAccounts') || {};

    const data = {
      ...aboutYou,
      client1PreviousRelationshipsData: previousRelationships.client1PreviousRelationshipsData,
      client2PreviousRelationshipsData: previousRelationships.client2PreviousRelationshipsData,
      childrenData: children.childrenData,
      ...children,
      ...familyTrusts,
      ...businessInterests,
      ...corporations,
      ...corporateFinancialConnections,
      ...professionalTeam,
      ...financialFootprint,
      ...realEstate,
      ...debtObligations,
      ...lifeInsurance,
      ...propertyLiabilityInsurance,
      client1PensionsData: pensionsRegisteredAccounts.client1PensionsData,
      client2PensionsData: pensionsRegisteredAccounts.client2PensionsData,
      ...legacyIntent,
      ...wills,
      ...powersOfAttorney,
      ...estateTrustees,
      ...funeralArrangements,
      ...pensionsRegisteredAccounts,
    };

    setFormData(data);
  }, [answers]);

  // Build the Guardian Roadmap document from questionnaire answers
  const guardianClarifyDoc = useMemo(() => {
    try {
      const model = buildGuardianshipRoadmap(answers);
      const narrative = buildGuardianshipNarrative(model);
      const aboutYou = answers.get('aboutYou') || {};
      const client1Name = (aboutYou.fullName as string) || '';
      const client2Name = (aboutYou.spouseName as string) || '';
      const clientNames = [client1Name, client2Name].filter(Boolean);
      const reportDate = new Date().toISOString().split('T')[0];

      const guardianDoc = composeGuardianshipForAudience(narrative, 'guardian', {
        clientNames,
        reportDate,
      });
      return buildGuardianClarifyDocument(guardianDoc);
    } catch (err) {
      console.warn('Guardian Roadmap build failed:', err);
      return null;
    }
  }, [answers]);

  const handleDownloadPDF = () => {
    generatePDF(formData as Parameters<typeof generatePDF>[0]);
  };

  const handleDownloadGuardianRoadmap = () => {
    if (!guardianClarifyDoc) return;
    const blob = generateGuardianRoadmapPdf(guardianClarifyDoc);
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = 'Guardianship-Roadmap.pdf';
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePreviewGuardian = () => {
    setShowGuardianPreview(true);
  };

  const handleClosePreview = () => {
    setShowGuardianPreview(false);
  };

  const guardianPreviewHtml = useMemo(() => {
    if (!guardianClarifyDoc) return '';
    return renderClarifyDocumentHtml(guardianClarifyDoc);
  }, [guardianClarifyDoc]);

  const hasGuardianData = guardianClarifyDoc !== null;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-700">
        <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />

        <h1 className="text-4xl font-bold text-white mb-4">
          Questionnaire Complete!
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          Thank you for completing the questionnaire. Your documents are ready to download.
        </p>

        {/* Guardian Roadmap section */}
        {hasGuardianData && (
          <div className="bg-blue-900/30 border border-blue-700/40 rounded-lg p-6 mb-6 text-left">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-6 h-6 text-blue-300" />
              <h2 className="text-lg font-semibold text-blue-200">Guardianship Roadmap</h2>
            </div>
            <p className="text-sm text-blue-100/80 mb-4">
              A personalized guide for the people you would trust to care for your children.
              It includes child-specific information, important relationships, funding philosophy,
              and immediate actions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDownloadGuardianRoadmap}
                className="flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-500 transition-colors text-sm"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Guardianship Roadmap
              </button>
              <button
                onClick={handlePreviewGuardian}
                className="flex items-center justify-center px-5 py-2.5 bg-blue-800/50 text-blue-200 rounded-lg font-medium hover:bg-blue-800/70 transition-colors text-sm border border-blue-700/40"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
            </div>
          </div>
        )}

        {/* Will Companion PDF section */}
        <div className="bg-gray-700 border border-gray-600 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-400">
            The Will Companion Kit PDF includes your estate planning information.
            {hasGuardianData ? ' The Guardianship Roadmap is downloaded separately above.' : ''}
          </p>
        </div>

        <div className="bg-blue-900 border border-blue-700 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-300 mb-3">What's Next?</h2>
          <ul className="text-left space-y-2 text-blue-200">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">1.</span>
              <span>Download your Guardianship Roadmap and Will Companion PDF</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">2.</span>
              <span>Review both documents with your family and advisors</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">3.</span>
              <span>Store the completed forms in a secure location</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Will Companion PDF
          </button>

          <Link
            to="/"
            className="flex items-center justify-center px-6 py-3 bg-gray-700 text-gray-100 rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Return Home
          </Link>
        </div>
      </div>

      {/* Guardian Roadmap Preview Modal */}
      {showGuardianPreview && guardianPreviewHtml && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={handleClosePreview}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-800">Guardianship Roadmap — Preview</h3>
              <div className="flex gap-3">
                <button
                  onClick={handleDownloadGuardianRoadmap}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-500 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button
                  onClick={handleClosePreview}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="overflow-y-auto flex-1 p-4 bg-gray-100">
              <iframe
                srcDoc={guardianPreviewHtml}
                className="w-full h-full min-h-[70vh] bg-white border-0 rounded"
                title="Guardianship Roadmap Preview"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
