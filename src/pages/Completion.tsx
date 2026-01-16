import { Link } from 'react-router-dom';
import { CheckCircle, Download, Home } from 'lucide-react';
import { generatePDF } from '../lib/pdfGenerator';
import { useEffect, useState } from 'react';
import { useQuestionnaire } from '../context/QuestionnaireContext';

export default function Completion() {
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const { answers } = useQuestionnaire();

  useEffect(() => {
    const step1 = answers.get(1) || {};
    const step2 = answers.get(2) || {};

    const data = {
      fullName: step1.fullName,
      hasChildren: step1.hasChildren,
      numberOfChildren: step1.numberOfChildren,
      sameMedicalDoctor: step1.sameMedicalDoctor,
      sameDentist: step1.sameDentist,
      sameOrthodontist: step1.sameOrthodontist,
      childrenData: step2.childrenData,
    };

    setFormData(data);
  }, [answers]);

  const handleDownloadPDF = () => {
    generatePDF(formData as Parameters<typeof generatePDF>[0]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 text-center border border-gray-700">
        <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />

        <h1 className="text-4xl font-bold text-white mb-4">
          Questionnaire Complete!
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          Thank you for completing the questionnaire. Your fillable PDF is ready to download.
        </p>

        <div className="bg-blue-900 border border-blue-700 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-blue-300 mb-3">What's Next?</h2>
          <ul className="text-left space-y-2 text-blue-200">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">1.</span>
              <span>Download your customized PDF form</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">2.</span>
              <span>Complete the detailed information sections at your own pace</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">3.</span>
              <span>Store the completed form in a secure location</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF
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
    </div>
  );
}
