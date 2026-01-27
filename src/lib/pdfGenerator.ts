import { jsPDF } from 'jspdf';

interface ChildData {
  name?: string;
  dateOfBirth?: string;
  disabled?: string;
  disabilityTaxCredit?: string;
  disabilityNature?: string;
  disabilityCare?: string;
  disabilityContacts?: string;
  disabilityOther?: string;
  independent?: string;
  medications?: string;
  allergies?: string;
  medicalIssues?: string;
  [key: string]: string | undefined;
}

interface FormData {
  fullName?: string;
  dateOfBirth?: string;
  address?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  email?: string;
  phone?: string;
  hasSpouse?: string;
  spouseName?: string;
  spouseSameAddress?: string;
  spouseDateOfBirth?: string;
  spouseAddress?: string;
  spouseCity?: string;
  spouseProvince?: string;
  spousePostalCode?: string;
  spouseEmail?: string;
  spousePhone?: string;
  hasChildren?: string;
  numberOfChildren?: string;
  sameMedicalDoctor?: string;
  sameDentist?: string;
  sameOrthodontist?: string;
  childrenData?: ChildData[];
  client1HasWill?: string;
  client2HasWill?: string;
  willsSameLawyer?: string;
  client1UsesAccountant?: string;
  client2UsesAccountant?: string;
  accountantSamePerson?: string;
  client1FinancialAdvisors?: string;
  client2FinancialAdvisors?: string;
  bankingStructure?: string;
  jointBankCount?: string;
  client1BankCount?: string;
  client2BankCount?: string;
  mixedJointBankCount?: string;
  mixedClient1BankCount?: string;
  mixedClient2BankCount?: string;
  ownsRealEstate?: string;
  primaryResidenceOwner?: string;
  isPrimaryResidence?: string;
  hasAdditionalRealEstate?: string;
  propertiesData?: Array<{
    propertyName?: string;
    propertyType?: string;
    propertyOwner?: string;
    trustName?: string;
    corporationName?: string;
    otherDetails?: string;
    hasAdditionalOwners?: string;
    additionalOwnersCount?: string;
  }>;
  hasDebts?: string;
  debtsData?: Array<{
    debtType?: string;
    debtOwner?: string;
    hasOtherOnLoan?: string;
    otherPersonName?: string;
    otherPersonPhone?: string;
  }>;
  client1HasWorkBenefits?: string;
  client2HasWorkBenefits?: string;
  client1HasLifeInsurance?: string;
  client1LifeInsuranceCount?: string;
  client2HasLifeInsurance?: string;
  client2LifeInsuranceCount?: string;
  client1HasDisabilityInsurance?: string;
  client1DisabilityInsuranceCount?: string;
  client2HasDisabilityInsurance?: string;
  client2DisabilityInsuranceCount?: string;
  client1HasCriticalIllness?: string;
  client1CriticalIllnessCount?: string;
  client2HasCriticalIllness?: string;
  client2CriticalIllnessCount?: string;
  hasHomeInsurance?: string;
  hasAdditionalProperties?: string;
  additionalPropertiesCount?: string;
  client1HasVehicleInsurance?: string;
  client2HasVehicleInsurance?: string;
  hasAdditionalVehicles?: string;
  additionalVehiclesCount?: string;
  hasCorporation?: string;
  corporationCount?: string;
}

const getOrdinalLabel = (num: number): string => {
  const ordinals = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth'];
  return ordinals[num - 1] || `${num}th`;
};

export const generatePDF = (formData: FormData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 12;
  const fieldWidth = pageWidth - margin * 2;
  let yPosition = 12;

  doc.setFontSize(20);
  doc.text('Estate Planning Questionnaire', margin, yPosition);

  yPosition += 10;
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text('This is a fillable PDF - click on the fields to type your information', margin, yPosition);

  yPosition += 12;
  doc.setTextColor(0);
  doc.setFontSize(10);

  const addField = (label: string, fieldName: string, value: string, height: number = 7) => {
    doc.setFontSize(10);
    doc.text(label, margin, yPosition);
    yPosition += 2;
    const field = new doc.AcroFormTextField();
    field.fieldName = fieldName;
    field.Rect = [margin, yPosition, fieldWidth - 15, height];
    field.value = value;
    field.fontSize = 10;
    field.textColor = [0, 0, 0];
    doc.addField(field);
    yPosition += height + 4;
  };

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Contact Information', margin, yPosition);
  doc.setFont(undefined, 'normal');
  yPosition += 8;

  addField('Full Name:', 'fullName', formData.fullName || '');
  addField('Date of Birth:', 'dateOfBirth', formData.dateOfBirth || '');
  addField('Address:', 'address', formData.address || '');
  addField('City:', 'city', formData.city || '');
  addField('Province:', 'province', formData.province || '');
  addField('Postal Code:', 'postalCode', formData.postalCode || '');
  addField('Email Address:', 'email', formData.email || '');
  addField('Phone Number:', 'phone', formData.phone || '');

  if (formData.hasSpouse === 'yes') {
    yPosition += 6;
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Spouse/Partner Information', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 8;

    addField('Spouse/Partner Name:', 'spouseName', formData.spouseName || '');
    addField('Date of Birth:', 'spouseDateOfBirth', formData.spouseDateOfBirth || '');

    if (formData.spouseSameAddress === 'yes') {
      addField('Address:', 'spouseAddress', formData.address || '');
      addField('City:', 'spouseCity', formData.city || '');
      addField('Province:', 'spouseProvince', formData.province || '');
      addField('Postal Code:', 'spousePostalCode', formData.postalCode || '');
    } else {
      addField('Address:', 'spouseAddress', formData.spouseAddress || '');
      addField('City:', 'spouseCity', formData.spouseCity || '');
      addField('Province:', 'spouseProvince', formData.spouseProvince || '');
      addField('Postal Code:', 'spousePostalCode', formData.spousePostalCode || '');
    }

    addField('Email Address:', 'spouseEmail', formData.spouseEmail || '');
    addField('Phone Number:', 'spousePhone', formData.spousePhone || '');
  }

  if (formData.hasChildren === 'yes' && formData.childrenData && formData.childrenData.length > 0) {
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 12;
    }

    const childCount = formData.numberOfChildren === '6+' ? 6 : parseInt(formData.numberOfChildren || '0');
    const childrenToProcess = formData.childrenData.slice(0, childCount);

    childrenToProcess.forEach((child, index) => {
      yPosition += 13;

      if (yPosition > 270) {
        doc.addPage();
        yPosition = 12;
      }

      const childName = child.name || `Child ${index + 1}`;
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text(`${childName} (DOB: ${child.dateOfBirth || ''})`, margin, yPosition);
      doc.setFont(undefined, 'normal');

      yPosition += 6;
      doc.setFontSize(9);
      doc.text(`Disabled: ${child.disabled === 'yes' ? 'Yes' : child.disabled === 'no' ? 'No' : ''}`, margin, yPosition);
      yPosition += 4;

      if (child.disabled === 'yes' && child.disabilityTaxCredit === 'yes') {
        doc.setFont(undefined, 'bold');
        doc.text(`${childName} is disabled and qualifies for the disability tax credit`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 4;
      }

      doc.text(`Financially Independent: ${child.independent === 'yes' ? 'Yes' : child.independent === 'no' ? 'No' : ''}`, margin, yPosition);
      yPosition += 4;

      if (child.independent !== 'yes') {
        doc.text(`Long-term Medications: ${child.medications === 'yes' ? 'Yes' : child.medications === 'no' ? 'No' : ''}`, margin, yPosition);
        yPosition += 4;
        doc.text(`Allergies: ${child.allergies === 'yes' ? 'Yes' : child.allergies === 'no' ? 'No' : ''}`, margin, yPosition);
        yPosition += 4;
        doc.text(`Medical Issues/Needs: ${child.medicalIssues === 'yes' ? 'Yes' : child.medicalIssues === 'no' ? 'No' : ''}`, margin, yPosition);

        yPosition += 10;
      } else {
        yPosition += 6;
      }

      if (child.independent !== 'yes' && (child.medications === 'yes' || child.allergies === 'yes' || child.medicalIssues === 'yes')) {
        yPosition += 3;
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text('Medical Information', margin, yPosition);
        doc.setFont(undefined, 'normal');

        yPosition += 6;

        if (child.medications === 'yes') {
          doc.setFontSize(8);
          doc.text('Long-term Medications:', margin, yPosition);
          yPosition += 2;
          const medField = new doc.AcroFormTextField();
          medField.fieldName = `child${index + 1}_medications`;
          medField.Rect = [margin, yPosition, fieldWidth - 15, 8];
          medField.multiline = true;
          medField.fontSize = 8;
          medField.textColor = [0, 0, 0];
          doc.addField(medField);
          yPosition += 12;
        }

        if (child.allergies === 'yes') {
          doc.setFontSize(8);
          doc.text('Allergies:', margin, yPosition);
          yPosition += 2;
          const allergiesField = new doc.AcroFormTextField();
          allergiesField.fieldName = `child${index + 1}_allergies`;
          allergiesField.Rect = [margin, yPosition, fieldWidth - 15, 8];
          allergiesField.multiline = true;
          allergiesField.fontSize = 8;
          allergiesField.textColor = [0, 0, 0];
          doc.addField(allergiesField);
          yPosition += 12;
        }

        if (child.medicalIssues === 'yes') {
          doc.setFontSize(8);
          doc.text('Medical Issues/Needs:', margin, yPosition);
          yPosition += 2;
          const issuesField = new doc.AcroFormTextField();
          issuesField.fieldName = `child${index + 1}_medicalIssues`;
          issuesField.Rect = [margin, yPosition, fieldWidth - 15, 8];
          issuesField.multiline = true;
          issuesField.fontSize = 8;
          issuesField.textColor = [0, 0, 0];
          doc.addField(issuesField);
          yPosition += 12;
        }

        if (child.disabilityTaxCredit === 'yes') {
          yPosition += 3;
          doc.setFontSize(9);
          doc.setFont(undefined, 'bold');
          doc.text('Disability Information', margin, yPosition);
          doc.setFont(undefined, 'normal');
          yPosition += 6;

          doc.setFontSize(8);
          doc.text('Nature of the disability and severity:', margin, yPosition);
          yPosition += 2;
          const natureField = new doc.AcroFormTextField();
          natureField.fieldName = `child${index + 1}_disabilityNature`;
          natureField.Rect = [margin, yPosition, fieldWidth - 15, 10];
          natureField.multiline = true;
          natureField.fontSize = 8;
          natureField.textColor = [0, 0, 0];
          doc.addField(natureField);
          yPosition += 14;

          doc.setFontSize(8);
          doc.text('Care and assistance provided:', margin, yPosition);
          yPosition += 2;
          const careField = new doc.AcroFormTextField();
          careField.fieldName = `child${index + 1}_disabilityCare`;
          careField.Rect = [margin, yPosition, fieldWidth - 15, 10];
          careField.multiline = true;
          careField.fontSize = 8;
          careField.textColor = [0, 0, 0];
          doc.addField(careField);
          yPosition += 14;

          doc.setFontSize(8);
          doc.text('Key contacts and support including a description of their roles:', margin, yPosition);
          yPosition += 2;
          const contactsField = new doc.AcroFormTextField();
          contactsField.fieldName = `child${index + 1}_disabilityContacts`;
          contactsField.Rect = [margin, yPosition, fieldWidth - 15, 10];
          contactsField.multiline = true;
          contactsField.fontSize = 8;
          contactsField.textColor = [0, 0, 0];
          doc.addField(contactsField);
          yPosition += 14;

          doc.setFontSize(8);
          doc.text('Other information that would assist a potential guardian:', margin, yPosition);
          yPosition += 2;
          const otherField = new doc.AcroFormTextField();
          otherField.fieldName = `child${index + 1}_disabilityOther`;
          otherField.Rect = [margin, yPosition, fieldWidth - 15, 10];
          otherField.multiline = true;
          otherField.fontSize = 8;
          otherField.textColor = [0, 0, 0];
          doc.addField(otherField);
          yPosition += 14;
        }
      }

      if (child.independent !== 'yes') {
        const cellHeight = 6;
        const colWidths = [fieldWidth * 0.27, fieldWidth * 0.24, fieldWidth * 0.24, fieldWidth * 0.25];

        if (yPosition > 270) {
          doc.addPage();
          yPosition = 12;
        }

        const healthRows = [
          { label: 'Detail', value: 'Information/Provider' },
          { label: 'Family Doctor:', value: '' },
          { label: 'Dentist:', value: '' },
          { label: 'Orthodontist:', value: '' },
          ...(child.medications === 'yes' ? [{ label: 'Current Medications/Dosage:', value: '' }] : []),
          { label: 'Blood Type:', value: '' },
          { label: 'Psychologist/Therapist:', value: '' },
          { label: 'Health Card Number:', value: '' },
          ...(child.allergies === 'yes' ? [{ label: 'Allergies:', value: '' }] : []),
          ...(child.medicalIssues === 'yes' ? [{ label: 'Past Health Issues/Concerns:', value: '' }] : []),
          { label: 'Health Insurance Policy Number (if applicable):', value: '' },
          { label: 'Insurance Policies:', value: '' },
        ];

        let tableY = yPosition;

        healthRows.forEach((row, rowIndex) => {
          if (tableY > 275) {
            doc.addPage();
            tableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const col1X = margin;
          const col2X = margin + colWidths[0];
          const col3X = margin + colWidths[0] + colWidths[1];
          const col4X = margin + colWidths[0] + colWidths[1] + colWidths[2];

          doc.rect(col1X, tableY, colWidths[0], cellHeight);
          doc.rect(col2X, tableY, colWidths[1], cellHeight);
          doc.rect(col3X, tableY, colWidths[2], cellHeight);
          doc.rect(col4X, tableY, colWidths[3], cellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', col1X + 0.5, tableY + 4);
            doc.text('Information/Provider:', col2X + 0.5, tableY + 4);
            doc.text('Location of Records:', col3X + 0.5, tableY + 4);
            doc.text('Other Details:', col4X + 0.5, tableY + 4);
          } else {
            doc.setFont(undefined, 'normal');
            doc.text(row.label, col1X + 0.5, tableY + 4);

            const skipFieldsForShared = (fieldRow: string) => {
              if (index > 0) {
                if (fieldRow === 'Family Doctor:' && formData.sameMedicalDoctor === 'yes') return true;
                if (fieldRow === 'Dentist:' && formData.sameDentist === 'yes') return true;
                if (fieldRow === 'Orthodontist:' && formData.sameOrthodontist === 'yes') return true;
              }
              return false;
            };

            if (skipFieldsForShared(row.label)) {
              const firstChildName = formData.childrenData?.[0]?.name || 'Child 1';
              doc.text(`(See ${firstChildName})`, col2X + 0.5, tableY + 4);
            } else {
              const field1 = new doc.AcroFormTextField();
              field1.fieldName = `child${index + 1}_health_${rowIndex}_col2`;
              field1.Rect = [col2X + 0.3, tableY + 0.3, colWidths[1] - 0.6, cellHeight - 0.6];
              field1.fontSize = 7;
              field1.textColor = [0, 0, 0];
              field1.borderStyle = 'none';
              doc.addField(field1);
            }

            const field2 = new doc.AcroFormTextField();
            field2.fieldName = `child${index + 1}_health_${rowIndex}_col3`;
            field2.Rect = [col3X + 0.3, tableY + 0.3, colWidths[2] - 0.6, cellHeight - 0.6];
            field2.fontSize = 7;
            field2.textColor = [0, 0, 0];
            field2.borderStyle = 'none';
            doc.addField(field2);

            const field3 = new doc.AcroFormTextField();
            field3.fieldName = `child${index + 1}_health_${rowIndex}_col4`;
            field3.Rect = [col4X + 0.3, tableY + 0.3, colWidths[3] - 0.6, cellHeight - 0.6];
            field3.fontSize = 7;
            field3.textColor = [0, 0, 0];
            field3.borderStyle = 'none';
            doc.addField(field3);
          }

          tableY += cellHeight;
        });

        yPosition = tableY + 8;

        if (yPosition > 270) {
          doc.addPage();
          yPosition = 12;
        }
      }

      if (child.independent !== 'yes') {
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`${childName} - Educational and Extra Curricular Activities`, margin, yPosition);
        doc.setFont(undefined, 'normal');

        yPosition += 6;

        const eduColWidths = [fieldWidth * 0.22, fieldWidth * 0.26, fieldWidth * 0.26, fieldWidth * 0.26];
        const eduCellHeight = 5;
        let eduTableY = yPosition;

        const eduRows = [
          { label: 'Category:', col2: 'Institution/Instructor/Club', col3: 'Notes/Preferences', col4: 'Other' },
          { label: 'School:' },
          { label: '' },
          { label: '' },
          { label: '' },
          { label: 'Special Education Needs:' },
          { label: '' },
          { label: '' },
          { label: '' },
          { label: 'Sports Clubs/Lessons:' },
          { label: '' },
          { label: '' },
          { label: '' },
          { label: 'Music Clubs/Lessons:' },
          { label: '' },
          { label: '' },
          { label: '' },
          { label: 'Tutoring:' },
          { label: '' },
          { label: '' },
          { label: '' },
          { label: 'Summer Camps:' },
          { label: '' },
          { label: '' },
          { label: '' },
          { label: 'Other:' },
          { label: '' },
          { label: '' },
          { label: '' },
        ];

        eduRows.forEach((row, rowIndex) => {
          if (eduTableY > 275) {
            doc.addPage();
            eduTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(7);

          const eduCol1X = margin;
          const eduCol2X = margin + eduColWidths[0];
          const eduCol3X = margin + eduColWidths[0] + eduColWidths[1];
          const eduCol4X = margin + eduColWidths[0] + eduColWidths[1] + eduColWidths[2];

          doc.rect(eduCol1X, eduTableY, eduColWidths[0], eduCellHeight);
          doc.rect(eduCol2X, eduTableY, eduColWidths[1], eduCellHeight);
          doc.rect(eduCol3X, eduTableY, eduColWidths[2], eduCellHeight);
          doc.rect(eduCol4X, eduTableY, eduColWidths[3], eduCellHeight);

          if (rowIndex === 0) {
            doc.text('Category:', eduCol1X + 0.3, eduTableY + 3.5);
            doc.text('Institution/Instructor/Club:', eduCol2X + 0.3, eduTableY + 3.5);
            doc.text('Notes/Preferences:', eduCol3X + 0.3, eduTableY + 3.5);
            doc.text('Other:', eduCol4X + 0.3, eduTableY + 3.5);
          } else {
            doc.text(row.label, eduCol1X + 0.3, eduTableY + 3.5);

            const activityKey = [
              'school',
              'specialEd',
              'sports',
              'music',
              'tutoring',
              'camps',
              'other1',
              'other2',
            ][rowIndex - 1];

            const eduField1 = new doc.AcroFormTextField();
            eduField1.fieldName = `child${index + 1}_edu_${rowIndex}_col2`;
            eduField1.Rect = [eduCol2X + 0.2, eduTableY + 0.2, eduColWidths[1] - 0.4, eduCellHeight - 0.4];
            eduField1.fontSize = 6;
            eduField1.textColor = [0, 0, 0];
            eduField1.borderStyle = 'none';
            doc.addField(eduField1);

            const eduField2 = new doc.AcroFormTextField();
            eduField2.fieldName = `child${index + 1}_edu_${rowIndex}_col3`;
            eduField2.Rect = [eduCol3X + 0.2, eduTableY + 0.2, eduColWidths[2] - 0.4, eduCellHeight - 0.4];
            eduField2.fontSize = 6;
            eduField2.textColor = [0, 0, 0];
            eduField2.borderStyle = 'none';
            doc.addField(eduField2);

            const eduField3 = new doc.AcroFormTextField();
            eduField3.fieldName = `child${index + 1}_edu_${rowIndex}_col4`;
            eduField3.Rect = [eduCol4X + 0.2, eduTableY + 0.2, eduColWidths[3] - 0.4, eduCellHeight - 0.4];
            eduField3.fontSize = 6;
            eduField3.textColor = [0, 0, 0];
            eduField3.borderStyle = 'none';
            doc.addField(eduField3);
          }

          eduTableY += eduCellHeight;
        });

        yPosition = eduTableY + 10;
      }

      if (child.independent !== 'yes') {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`${childName} - Digital Identity and Access`, margin, yPosition);
        doc.setFont(undefined, 'normal');

        yPosition += 4;
        doc.setFontSize(8);
        doc.text('Modern parenting includes school portals, social accounts and gaming platforms that guardians must', margin, yPosition);
        yPosition += 3;
        doc.text('manage. Provide the information that you believe would best assist a potential guardian:', margin, yPosition);

        yPosition += 6;

        const digitalColWidths = [fieldWidth * 0.22, fieldWidth * 0.26, fieldWidth * 0.26, fieldWidth * 0.26];
        const digitalCellHeight = 5;
        let digitalTableY = yPosition;

        const digitalRows = [
          { label: 'Digital Asset:', col2: 'Login/Portal URL:', col3: 'Username:', col4: 'Password/PIN:' },
          { label: 'School Portal:' },
          { label: 'Child\'s Smartphone / Tablet:' },
          { label: 'Gaming Accounts (Steam/Epic):' },
          { label: 'Social Media (Private/Public):' },
          { label: 'Cloud Photo Storage:' },
          { label: 'Other:' },
          { label: 'Other:' },
          { label: 'Other:' },
        ];

        digitalRows.forEach((row, rowIndex) => {
          if (digitalTableY > 275) {
            doc.addPage();
            digitalTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(7);

          const digitalCol1X = margin;
          const digitalCol2X = margin + digitalColWidths[0];
          const digitalCol3X = margin + digitalColWidths[0] + digitalColWidths[1];
          const digitalCol4X = margin + digitalColWidths[0] + digitalColWidths[1] + digitalColWidths[2];

          doc.rect(digitalCol1X, digitalTableY, digitalColWidths[0], digitalCellHeight);
          doc.rect(digitalCol2X, digitalTableY, digitalColWidths[1], digitalCellHeight);
          doc.rect(digitalCol3X, digitalTableY, digitalColWidths[2], digitalCellHeight);
          doc.rect(digitalCol4X, digitalTableY, digitalColWidths[3], digitalCellHeight);

          if (rowIndex === 0) {
            doc.text('Digital Asset:', digitalCol1X + 0.3, digitalTableY + 3.5);
            doc.text('Login/Portal URL:', digitalCol2X + 0.3, digitalTableY + 3.5);
            doc.text('Username:', digitalCol3X + 0.3, digitalTableY + 3.5);
            doc.text('Password/PIN:', digitalCol4X + 0.3, digitalTableY + 3.5);
          } else {
            doc.text(row.label, digitalCol1X + 0.3, digitalTableY + 3.5);

            const digitalField1 = new doc.AcroFormTextField();
            digitalField1.fieldName = `child${index + 1}_digital_${rowIndex}_col2`;
            digitalField1.Rect = [digitalCol2X + 0.2, digitalTableY + 0.2, digitalColWidths[1] - 0.4, digitalCellHeight - 0.4];
            digitalField1.fontSize = 6;
            digitalField1.textColor = [0, 0, 0];
            digitalField1.borderStyle = 'none';
            doc.addField(digitalField1);

            const digitalField2 = new doc.AcroFormTextField();
            digitalField2.fieldName = `child${index + 1}_digital_${rowIndex}_col3`;
            digitalField2.Rect = [digitalCol3X + 0.2, digitalTableY + 0.2, digitalColWidths[2] - 0.4, digitalCellHeight - 0.4];
            digitalField2.fontSize = 6;
            digitalField2.textColor = [0, 0, 0];
            digitalField2.borderStyle = 'none';
            doc.addField(digitalField2);

            const digitalField3 = new doc.AcroFormTextField();
            digitalField3.fieldName = `child${index + 1}_digital_${rowIndex}_col4`;
            digitalField3.Rect = [digitalCol4X + 0.2, digitalTableY + 0.2, digitalColWidths[3] - 0.4, digitalCellHeight - 0.4];
            digitalField3.fontSize = 6;
            digitalField3.textColor = [0, 0, 0];
            digitalField3.borderStyle = 'none';
            doc.addField(digitalField3);
          }

          digitalTableY += digitalCellHeight;
        });

        yPosition = digitalTableY + 10;
      }
    });
  }

  yPosition += 12;
  if (yPosition > 270) {
    doc.addPage();
    yPosition = 12;
  }

  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Who is on your Team?', margin, yPosition);
  doc.setFont(undefined, 'normal');
  yPosition += 6;
  doc.setFontSize(9);
  doc.text('Your Power(s) of Attorney and Estate Trustees should not act in a vacuum.', margin, yPosition);
  yPosition += 4;
  doc.text('This section lists the core professionals who already know your history.', margin, yPosition);
  yPosition += 10;

  const client1Name = formData.fullName || 'Client 1';
  const client2Name = formData.spouseName || 'Client 2';
  const hasSpouse = formData.hasSpouse === 'yes';

  if (formData.client1HasWill === 'no' && (!hasSpouse || formData.client2HasWill === 'no')) {
    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text('Estate Lawyer / Notary:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 6;
    doc.setFontSize(9);
    doc.setFont(undefined, 'italic');
    doc.text('It is recommended that you have a will done', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 12;
  } else if (formData.client1HasWill === 'yes' || formData.client2HasWill === 'yes') {
    const bothHaveWills = formData.client1HasWill === 'yes' && formData.client2HasWill === 'yes';
    const sameLawyer = formData.willsSameLawyer === 'yes';

    if (bothHaveWills && sameLawyer) {
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Estate Lawyer / Notary:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      const lawyerRows = [
        { label: 'Estate Lawyer/Notary:', col2: 'Information:', col3: 'Other Details (If Applicable)' },
        { label: 'Name:' },
        { label: 'Firm:' },
        { label: 'City, Province:' },
        { label: 'Email Address:' },
        { label: 'Date of last Will update:' },
        { label: 'Will Location:' },
        { label: '' },
      ];

      const lawyerCellHeight = 6;
      const lawyerColWidths = [fieldWidth * 0.30, fieldWidth * 0.35, fieldWidth * 0.35];
      let lawyerTableY = yPosition;

      lawyerRows.forEach((row, rowIndex) => {
        if (lawyerTableY > 275) {
          doc.addPage();
          lawyerTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(8);

        const lawyerCol1X = margin;
        const lawyerCol2X = margin + lawyerColWidths[0];
        const lawyerCol3X = margin + lawyerColWidths[0] + lawyerColWidths[1];

        doc.rect(lawyerCol1X, lawyerTableY, lawyerColWidths[0], lawyerCellHeight);
        doc.rect(lawyerCol2X, lawyerTableY, lawyerColWidths[1], lawyerCellHeight);
        doc.rect(lawyerCol3X, lawyerTableY, lawyerColWidths[2], lawyerCellHeight);

        if (rowIndex === 0) {
          doc.text('Estate Lawyer/Notary:', lawyerCol1X + 0.5, lawyerTableY + 4);
          doc.text('Information:', lawyerCol2X + 0.5, lawyerTableY + 4);
          doc.text('Other Details (If Applicable):', lawyerCol3X + 0.5, lawyerTableY + 4);
        } else {
          doc.setFont(undefined, 'normal');
          doc.text(row.label, lawyerCol1X + 0.5, lawyerTableY + 4);

          const lawyerField1 = new doc.AcroFormTextField();
          lawyerField1.fieldName = `lawyer_shared_${rowIndex}_col2`;
          lawyerField1.Rect = [lawyerCol2X + 0.3, lawyerTableY + 0.3, lawyerColWidths[1] - 0.6, lawyerCellHeight - 0.6];
          lawyerField1.fontSize = 7;
          lawyerField1.textColor = [0, 0, 0];
          lawyerField1.borderStyle = 'none';
          doc.addField(lawyerField1);

          const lawyerField2 = new doc.AcroFormTextField();
          lawyerField2.fieldName = `lawyer_shared_${rowIndex}_col3`;
          lawyerField2.Rect = [lawyerCol3X + 0.3, lawyerTableY + 0.3, lawyerColWidths[2] - 0.6, lawyerCellHeight - 0.6];
          lawyerField2.fontSize = 7;
          lawyerField2.textColor = [0, 0, 0];
          lawyerField2.borderStyle = 'none';
          doc.addField(lawyerField2);
        }

        lawyerTableY += lawyerCellHeight;
      });

      yPosition = lawyerTableY + 10;
    } else if (bothHaveWills && !sameLawyer) {
      [client1Name, client2Name].forEach((clientName, clientIndex) => {
        if (yPosition > 230) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`Estate Lawyer / Notary - ${clientName}:`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const lawyerRows = [
          { label: 'Estate Lawyer/Notary:', col2: 'Information:', col3: 'Other Details (If Applicable)' },
          { label: 'Name:' },
          { label: 'Firm:' },
          { label: 'City, Province:' },
          { label: 'Email Address:' },
          { label: 'Date of last Will update:' },
          { label: 'Will Location:' },
          { label: '' },
        ];

        const lawyerCellHeight = 6;
        const lawyerColWidths = [fieldWidth * 0.30, fieldWidth * 0.35, fieldWidth * 0.35];
        let lawyerTableY = yPosition;

        lawyerRows.forEach((row, rowIndex) => {
          if (lawyerTableY > 275) {
            doc.addPage();
            lawyerTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const lawyerCol1X = margin;
          const lawyerCol2X = margin + lawyerColWidths[0];
          const lawyerCol3X = margin + lawyerColWidths[0] + lawyerColWidths[1];

          doc.rect(lawyerCol1X, lawyerTableY, lawyerColWidths[0], lawyerCellHeight);
          doc.rect(lawyerCol2X, lawyerTableY, lawyerColWidths[1], lawyerCellHeight);
          doc.rect(lawyerCol3X, lawyerTableY, lawyerColWidths[2], lawyerCellHeight);

          if (rowIndex === 0) {
            doc.text('Estate Lawyer/Notary:', lawyerCol1X + 0.5, lawyerTableY + 4);
            doc.text('Information:', lawyerCol2X + 0.5, lawyerTableY + 4);
            doc.text('Other Details (If Applicable):', lawyerCol3X + 0.5, lawyerTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');
            doc.text(row.label, lawyerCol1X + 0.5, lawyerTableY + 4);

            const lawyerField1 = new doc.AcroFormTextField();
            lawyerField1.fieldName = `lawyer_client${clientIndex + 1}_${rowIndex}_col2`;
            lawyerField1.Rect = [lawyerCol2X + 0.3, lawyerTableY + 0.3, lawyerColWidths[1] - 0.6, lawyerCellHeight - 0.6];
            lawyerField1.fontSize = 7;
            lawyerField1.textColor = [0, 0, 0];
            lawyerField1.borderStyle = 'none';
            doc.addField(lawyerField1);

            const lawyerField2 = new doc.AcroFormTextField();
            lawyerField2.fieldName = `lawyer_client${clientIndex + 1}_${rowIndex}_col3`;
            lawyerField2.Rect = [lawyerCol3X + 0.3, lawyerTableY + 0.3, lawyerColWidths[2] - 0.6, lawyerCellHeight - 0.6];
            lawyerField2.fontSize = 7;
            lawyerField2.textColor = [0, 0, 0];
            lawyerField2.borderStyle = 'none';
            doc.addField(lawyerField2);
          }

          lawyerTableY += lawyerCellHeight;
        });

        yPosition = lawyerTableY + 10;
      });
    } else {
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 12;
      }

      const clientWithWill = formData.client1HasWill === 'yes' ? client1Name : client2Name;

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`Estate Lawyer / Notary - ${clientWithWill}:`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      const lawyerRows = [
        { label: 'Estate Lawyer/Notary:', col2: 'Information:', col3: 'Other Details (If Applicable)' },
        { label: 'Name:' },
        { label: 'Firm:' },
        { label: 'City, Province:' },
        { label: 'Email Address:' },
        { label: 'Date of last Will update:' },
        { label: 'Will Location:' },
        { label: '' },
      ];

      const lawyerCellHeight = 6;
      const lawyerColWidths = [fieldWidth * 0.30, fieldWidth * 0.35, fieldWidth * 0.35];
      let lawyerTableY = yPosition;

      lawyerRows.forEach((row, rowIndex) => {
        if (lawyerTableY > 275) {
          doc.addPage();
          lawyerTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(8);

        const lawyerCol1X = margin;
        const lawyerCol2X = margin + lawyerColWidths[0];
        const lawyerCol3X = margin + lawyerColWidths[0] + lawyerColWidths[1];

        doc.rect(lawyerCol1X, lawyerTableY, lawyerColWidths[0], lawyerCellHeight);
        doc.rect(lawyerCol2X, lawyerTableY, lawyerColWidths[1], lawyerCellHeight);
        doc.rect(lawyerCol3X, lawyerTableY, lawyerColWidths[2], lawyerCellHeight);

        if (rowIndex === 0) {
          doc.text('Estate Lawyer/Notary:', lawyerCol1X + 0.5, lawyerTableY + 4);
          doc.text('Information:', lawyerCol2X + 0.5, lawyerTableY + 4);
          doc.text('Other Details (If Applicable):', lawyerCol3X + 0.5, lawyerTableY + 4);
        } else {
          doc.setFont(undefined, 'normal');
          doc.text(row.label, lawyerCol1X + 0.5, lawyerTableY + 4);

          const lawyerField1 = new doc.AcroFormTextField();
          lawyerField1.fieldName = `lawyer_single_${rowIndex}_col2`;
          lawyerField1.Rect = [lawyerCol2X + 0.3, lawyerTableY + 0.3, lawyerColWidths[1] - 0.6, lawyerCellHeight - 0.6];
          lawyerField1.fontSize = 7;
          lawyerField1.textColor = [0, 0, 0];
          lawyerField1.borderStyle = 'none';
          doc.addField(lawyerField1);

          const lawyerField2 = new doc.AcroFormTextField();
          lawyerField2.fieldName = `lawyer_single_${rowIndex}_col3`;
          lawyerField2.Rect = [lawyerCol3X + 0.3, lawyerTableY + 0.3, lawyerColWidths[2] - 0.6, lawyerCellHeight - 0.6];
          lawyerField2.fontSize = 7;
          lawyerField2.textColor = [0, 0, 0];
          lawyerField2.borderStyle = 'none';
          doc.addField(lawyerField2);
        }

        lawyerTableY += lawyerCellHeight;
      });

      yPosition = lawyerTableY + 10;
    }
  }

  if (formData.client1UsesAccountant === 'yes' || formData.client2UsesAccountant === 'yes') {
    const bothUseAccountant = formData.client1UsesAccountant === 'yes' && formData.client2UsesAccountant === 'yes';
    const sameAccountant = formData.accountantSamePerson === 'yes';

    if (bothUseAccountant && sameAccountant) {
      if (yPosition > 210) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text('Accountant/Tax Professional:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 4;
      doc.setFontSize(8);
      doc.text('Location of tax returns for the last 3-5 years and financial statements.', margin, yPosition);
      yPosition += 6;

      const accountantRows = [
        { label: 'Name:', col2: 'Information:', col3: 'Other Details:' },
        { label: 'Name:' },
        { label: 'Firm:' },
        { label: 'Phone Number:' },
        { label: 'Email Address:' },
        { label: 'City, Province:' },
        { label: 'What Year did you begin working with this person?' },
        { label: 'Other Details:' },
        { label: 'Other Details:' },
        { label: 'Other Details:' },
      ];

      const accountantCellHeight = 6;
      const accountantColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
      let accountantTableY = yPosition;

      accountantRows.forEach((row, rowIndex) => {
        if (accountantTableY > 275) {
          doc.addPage();
          accountantTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(8);

        const accountantCol1X = margin;
        const accountantCol2X = margin + accountantColWidths[0];
        const accountantCol3X = margin + accountantColWidths[0] + accountantColWidths[1];

        doc.rect(accountantCol1X, accountantTableY, accountantColWidths[0], accountantCellHeight);
        doc.rect(accountantCol2X, accountantTableY, accountantColWidths[1], accountantCellHeight);
        doc.rect(accountantCol3X, accountantTableY, accountantColWidths[2], accountantCellHeight);

        if (rowIndex === 0) {
          doc.text('Name:', accountantCol1X + 0.5, accountantTableY + 4);
          doc.text('Information:', accountantCol2X + 0.5, accountantTableY + 4);
          doc.text('Other Details:', accountantCol3X + 0.5, accountantTableY + 4);
        } else {
          doc.setFont(undefined, 'normal');
          doc.text(row.label, accountantCol1X + 0.5, accountantTableY + 4);

          const accountantField1 = new doc.AcroFormTextField();
          accountantField1.fieldName = `accountant_shared_${rowIndex}_col2`;
          accountantField1.Rect = [accountantCol2X + 0.3, accountantTableY + 0.3, accountantColWidths[1] - 0.6, accountantCellHeight - 0.6];
          accountantField1.fontSize = 7;
          accountantField1.textColor = [0, 0, 0];
          accountantField1.borderStyle = 'none';
          doc.addField(accountantField1);

          const accountantField2 = new doc.AcroFormTextField();
          accountantField2.fieldName = `accountant_shared_${rowIndex}_col3`;
          accountantField2.Rect = [accountantCol3X + 0.3, accountantTableY + 0.3, accountantColWidths[2] - 0.6, accountantCellHeight - 0.6];
          accountantField2.fontSize = 7;
          accountantField2.textColor = [0, 0, 0];
          accountantField2.borderStyle = 'none';
          doc.addField(accountantField2);
        }

        accountantTableY += accountantCellHeight;
      });

      yPosition = accountantTableY + 10;
    } else if (bothUseAccountant && !sameAccountant) {
      [client1Name, client2Name].forEach((clientName, clientIndex) => {
        if (yPosition > 200) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`Accountant/Tax Professional - ${clientName}:`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 4;
        doc.setFontSize(8);
        doc.text('Location of tax returns for the last 3-5 years and financial statements.', margin, yPosition);
        yPosition += 6;

        const accountantRows = [
          { label: 'Name:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Name:' },
          { label: 'Firm:' },
          { label: 'Phone Number:' },
          { label: 'Email Address:' },
          { label: 'City, Province:' },
          { label: 'What Year did you begin working with this person?' },
          { label: 'Other Details:' },
          { label: 'Other Details:' },
          { label: 'Other Details:' },
        ];

        const accountantCellHeight = 6;
        const accountantColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let accountantTableY = yPosition;

        accountantRows.forEach((row, rowIndex) => {
          if (accountantTableY > 275) {
            doc.addPage();
            accountantTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const accountantCol1X = margin;
          const accountantCol2X = margin + accountantColWidths[0];
          const accountantCol3X = margin + accountantColWidths[0] + accountantColWidths[1];

          doc.rect(accountantCol1X, accountantTableY, accountantColWidths[0], accountantCellHeight);
          doc.rect(accountantCol2X, accountantTableY, accountantColWidths[1], accountantCellHeight);
          doc.rect(accountantCol3X, accountantTableY, accountantColWidths[2], accountantCellHeight);

          if (rowIndex === 0) {
            doc.text('Name:', accountantCol1X + 0.5, accountantTableY + 4);
            doc.text('Information:', accountantCol2X + 0.5, accountantTableY + 4);
            doc.text('Other Details:', accountantCol3X + 0.5, accountantTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');
            doc.text(row.label, accountantCol1X + 0.5, accountantTableY + 4);

            const accountantField1 = new doc.AcroFormTextField();
            accountantField1.fieldName = `accountant_client${clientIndex + 1}_${rowIndex}_col2`;
            accountantField1.Rect = [accountantCol2X + 0.3, accountantTableY + 0.3, accountantColWidths[1] - 0.6, accountantCellHeight - 0.6];
            accountantField1.fontSize = 7;
            accountantField1.textColor = [0, 0, 0];
            accountantField1.borderStyle = 'none';
            doc.addField(accountantField1);

            const accountantField2 = new doc.AcroFormTextField();
            accountantField2.fieldName = `accountant_client${clientIndex + 1}_${rowIndex}_col3`;
            accountantField2.Rect = [accountantCol3X + 0.3, accountantTableY + 0.3, accountantColWidths[2] - 0.6, accountantCellHeight - 0.6];
            accountantField2.fontSize = 7;
            accountantField2.textColor = [0, 0, 0];
            accountantField2.borderStyle = 'none';
            doc.addField(accountantField2);
          }

          accountantTableY += accountantCellHeight;
        });

        yPosition = accountantTableY + 10;
      });
    } else {
      if (yPosition > 210) {
        doc.addPage();
        yPosition = 12;
      }

      const clientWithAccountant = formData.client1UsesAccountant === 'yes' ? client1Name : client2Name;

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`Accountant/Tax Professional - ${clientWithAccountant}:`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 4;
      doc.setFontSize(8);
      doc.text('Location of tax returns for the last 3-5 years and financial statements.', margin, yPosition);
      yPosition += 6;

      const accountantRows = [
        { label: 'Name:', col2: 'Information:', col3: 'Other Details:' },
        { label: 'Name:' },
        { label: 'Firm:' },
        { label: 'Phone Number:' },
        { label: 'Email Address:' },
        { label: 'City, Province:' },
        { label: 'What Year did you begin working with this person?' },
        { label: 'Other Details:' },
        { label: 'Other Details:' },
        { label: 'Other Details:' },
      ];

      const accountantCellHeight = 6;
      const accountantColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
      let accountantTableY = yPosition;

      accountantRows.forEach((row, rowIndex) => {
        if (accountantTableY > 275) {
          doc.addPage();
          accountantTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(8);

        const accountantCol1X = margin;
        const accountantCol2X = margin + accountantColWidths[0];
        const accountantCol3X = margin + accountantColWidths[0] + accountantColWidths[1];

        doc.rect(accountantCol1X, accountantTableY, accountantColWidths[0], accountantCellHeight);
        doc.rect(accountantCol2X, accountantTableY, accountantColWidths[1], accountantCellHeight);
        doc.rect(accountantCol3X, accountantTableY, accountantColWidths[2], accountantCellHeight);

        if (rowIndex === 0) {
          doc.text('Name:', accountantCol1X + 0.5, accountantTableY + 4);
          doc.text('Information:', accountantCol2X + 0.5, accountantTableY + 4);
          doc.text('Other Details:', accountantCol3X + 0.5, accountantTableY + 4);
        } else {
          doc.setFont(undefined, 'normal');
          doc.text(row.label, accountantCol1X + 0.5, accountantTableY + 4);

          const accountantField1 = new doc.AcroFormTextField();
          accountantField1.fieldName = `accountant_single_${rowIndex}_col2`;
          accountantField1.Rect = [accountantCol2X + 0.3, accountantTableY + 0.3, accountantColWidths[1] - 0.6, accountantCellHeight - 0.6];
          accountantField1.fontSize = 7;
          accountantField1.textColor = [0, 0, 0];
          accountantField1.borderStyle = 'none';
          doc.addField(accountantField1);

          const accountantField2 = new doc.AcroFormTextField();
          accountantField2.fieldName = `accountant_single_${rowIndex}_col3`;
          accountantField2.Rect = [accountantCol3X + 0.3, accountantTableY + 0.3, accountantColWidths[2] - 0.6, accountantCellHeight - 0.6];
          accountantField2.fontSize = 7;
          accountantField2.textColor = [0, 0, 0];
          accountantField2.borderStyle = 'none';
          doc.addField(accountantField2);
        }

        accountantTableY += accountantCellHeight;
      });

      yPosition = accountantTableY + 10;
    }
  }

  const client1AdvisorCount = parseInt(formData.client1FinancialAdvisors || '0');
  const client2AdvisorCount = parseInt(formData.client2FinancialAdvisors || '0');

  if (client1AdvisorCount > 0) {
    for (let advisorIndex = 0; advisorIndex < client1AdvisorCount; advisorIndex++) {
      if (yPosition > 190) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`Financial Advisor/Investment Manager - ${client1Name} (${advisorIndex + 1} of ${client1AdvisorCount}):`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 4;
      doc.setFontSize(8);
      doc.text('Contact details for the person managing your portfolios and the location of current statements.', margin, yPosition);
      yPosition += 6;

      const advisorRows = [
        { label: 'Name:', col2: 'Information:', col3: 'Other Details:' },
        { label: 'Firm Name:' },
        { label: 'Key Contact:' },
        { label: 'Phone Number:' },
        { label: 'Email Address:' },
        { label: 'City, Province:' },
        { label: 'What Year did you begin working with this person?' },
        { label: 'Where are past statements/tax documents stored?' },
        { label: 'Other Details:' },
        { label: 'Other Details:' },
      ];

      const advisorCellHeight = 6;
      const advisorColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
      let advisorTableY = yPosition;

      advisorRows.forEach((row, rowIndex) => {
        if (advisorTableY > 275) {
          doc.addPage();
          advisorTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(8);

        const advisorCol1X = margin;
        const advisorCol2X = margin + advisorColWidths[0];
        const advisorCol3X = margin + advisorColWidths[0] + advisorColWidths[1];

        doc.rect(advisorCol1X, advisorTableY, advisorColWidths[0], advisorCellHeight);
        doc.rect(advisorCol2X, advisorTableY, advisorColWidths[1], advisorCellHeight);
        doc.rect(advisorCol3X, advisorTableY, advisorColWidths[2], advisorCellHeight);

        if (rowIndex === 0) {
          doc.text('Name:', advisorCol1X + 0.5, advisorTableY + 4);
          doc.text('Information:', advisorCol2X + 0.5, advisorTableY + 4);
          doc.text('Other Details:', advisorCol3X + 0.5, advisorTableY + 4);
        } else {
          doc.setFont(undefined, 'normal');
          doc.text(row.label, advisorCol1X + 0.5, advisorTableY + 4);

          const advisorField1 = new doc.AcroFormTextField();
          advisorField1.fieldName = `advisor_client1_${advisorIndex + 1}_${rowIndex}_col2`;
          advisorField1.Rect = [advisorCol2X + 0.3, advisorTableY + 0.3, advisorColWidths[1] - 0.6, advisorCellHeight - 0.6];
          advisorField1.fontSize = 7;
          advisorField1.textColor = [0, 0, 0];
          advisorField1.borderStyle = 'none';
          doc.addField(advisorField1);

          const advisorField2 = new doc.AcroFormTextField();
          advisorField2.fieldName = `advisor_client1_${advisorIndex + 1}_${rowIndex}_col3`;
          advisorField2.Rect = [advisorCol3X + 0.3, advisorTableY + 0.3, advisorColWidths[2] - 0.6, advisorCellHeight - 0.6];
          advisorField2.fontSize = 7;
          advisorField2.textColor = [0, 0, 0];
          advisorField2.borderStyle = 'none';
          doc.addField(advisorField2);
        }

        advisorTableY += advisorCellHeight;
      });

      yPosition = advisorTableY + 10;

      if (yPosition > 150) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`Institution ${advisorIndex + 1} Accounts Held`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      const accountRows = [
        { label: 'Account Type:', col2: 'Institution:', col3: 'Last 4 Digits of the Account Number:', col4: 'Beneficiary on File (if applicable):' },
        { label: 'RRSP' },
        { label: 'Spousal RRSP' },
        { label: 'Locked In RRSP/LIRA' },
        { label: 'RRIF' },
        { label: 'Spousal RRIF' },
        { label: 'Life Income Fund (LIF)' },
        { label: 'TFSA' },
        { label: 'Non-Registered Account' },
        { label: 'RESP' },
        { label: 'RDSP' },
        { label: 'FHSA' },
        { label: 'In Trust For:' },
        { label: 'Group RRSP:' },
        { label: 'Deferred Profit-Sharing Plan:' },
        { label: 'Joint with _____:' },
        { label: 'Other:' },
        { label: 'Other:' },
        { label: 'Other:' },
      ];

      const accountCellHeight = 6;
      const accountColWidths = [fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25];
      let accountTableY = yPosition;

      accountRows.forEach((row, rowIndex) => {
        if (accountTableY > 275) {
          doc.addPage();
          accountTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(7);

        const accountCol1X = margin;
        const accountCol2X = margin + accountColWidths[0];
        const accountCol3X = margin + accountColWidths[0] + accountColWidths[1];
        const accountCol4X = margin + accountColWidths[0] + accountColWidths[1] + accountColWidths[2];

        doc.rect(accountCol1X, accountTableY, accountColWidths[0], accountCellHeight);
        doc.rect(accountCol2X, accountTableY, accountColWidths[1], accountCellHeight);
        doc.rect(accountCol3X, accountTableY, accountColWidths[2], accountCellHeight);
        doc.rect(accountCol4X, accountTableY, accountColWidths[3], accountCellHeight);

        if (rowIndex === 0) {
          doc.text('Account Type:', accountCol1X + 0.5, accountTableY + 4);
          doc.text('Institution:', accountCol2X + 0.5, accountTableY + 4);
          doc.text('Last 4 Digits of the', accountCol3X + 0.5, accountTableY + 2.5);
          doc.text('Account Number:', accountCol3X + 0.5, accountTableY + 4.5);
          doc.text('Beneficiary on File (if', accountCol4X + 0.5, accountTableY + 2.5);
          doc.text('applicable):', accountCol4X + 0.5, accountTableY + 4.5);
        } else {
          doc.setFont(undefined, 'normal');
          doc.text(row.label, accountCol1X + 0.5, accountTableY + 4);

          const accountField1 = new doc.AcroFormTextField();
          accountField1.fieldName = `accounts_client1_advisor${advisorIndex + 1}_${rowIndex}_col2`;
          accountField1.Rect = [accountCol2X + 0.3, accountTableY + 0.3, accountColWidths[1] - 0.6, accountCellHeight - 0.6];
          accountField1.fontSize = 7;
          accountField1.textColor = [0, 0, 0];
          accountField1.borderStyle = 'none';
          doc.addField(accountField1);

          const accountField2 = new doc.AcroFormTextField();
          accountField2.fieldName = `accounts_client1_advisor${advisorIndex + 1}_${rowIndex}_col3`;
          accountField2.Rect = [accountCol3X + 0.3, accountTableY + 0.3, accountColWidths[2] - 0.6, accountCellHeight - 0.6];
          accountField2.fontSize = 7;
          accountField2.textColor = [0, 0, 0];
          accountField2.borderStyle = 'none';
          doc.addField(accountField2);

          const accountField3 = new doc.AcroFormTextField();
          accountField3.fieldName = `accounts_client1_advisor${advisorIndex + 1}_${rowIndex}_col4`;
          accountField3.Rect = [accountCol4X + 0.3, accountTableY + 0.3, accountColWidths[3] - 0.6, accountCellHeight - 0.6];
          accountField3.fontSize = 7;
          accountField3.textColor = [0, 0, 0];
          accountField3.borderStyle = 'none';
          doc.addField(accountField3);
        }

        accountTableY += accountCellHeight;
      });

      yPosition = accountTableY + 10;
    }
  }

  if (client2AdvisorCount > 0 && hasSpouse) {
    for (let advisorIndex = 0; advisorIndex < client2AdvisorCount; advisorIndex++) {
      if (yPosition > 190) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`Financial Advisor/Investment Manager - ${client2Name} (${advisorIndex + 1} of ${client2AdvisorCount}):`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 4;
      doc.setFontSize(8);
      doc.text('Contact details for the person managing your portfolios and the location of current statements.', margin, yPosition);
      yPosition += 6;

      const advisorRows = [
        { label: 'Name:', col2: 'Information:', col3: 'Other Details:' },
        { label: 'Firm Name:' },
        { label: 'Key Contact:' },
        { label: 'Phone Number:' },
        { label: 'Email Address:' },
        { label: 'City, Province:' },
        { label: 'What Year did you begin working with this person?' },
        { label: 'Where are past statements/tax documents stored?' },
        { label: 'Other Details:' },
        { label: 'Other Details:' },
      ];

      const advisorCellHeight = 6;
      const advisorColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
      let advisorTableY = yPosition;

      advisorRows.forEach((row, rowIndex) => {
        if (advisorTableY > 275) {
          doc.addPage();
          advisorTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(8);

        const advisorCol1X = margin;
        const advisorCol2X = margin + advisorColWidths[0];
        const advisorCol3X = margin + advisorColWidths[0] + advisorColWidths[1];

        doc.rect(advisorCol1X, advisorTableY, advisorColWidths[0], advisorCellHeight);
        doc.rect(advisorCol2X, advisorTableY, advisorColWidths[1], advisorCellHeight);
        doc.rect(advisorCol3X, advisorTableY, advisorColWidths[2], advisorCellHeight);

        if (rowIndex === 0) {
          doc.text('Name:', advisorCol1X + 0.5, advisorTableY + 4);
          doc.text('Information:', advisorCol2X + 0.5, advisorTableY + 4);
          doc.text('Other Details:', advisorCol3X + 0.5, advisorTableY + 4);
        } else {
          doc.setFont(undefined, 'normal');
          doc.text(row.label, advisorCol1X + 0.5, advisorTableY + 4);

          const advisorField1 = new doc.AcroFormTextField();
          advisorField1.fieldName = `advisor_client2_${advisorIndex + 1}_${rowIndex}_col2`;
          advisorField1.Rect = [advisorCol2X + 0.3, advisorTableY + 0.3, advisorColWidths[1] - 0.6, advisorCellHeight - 0.6];
          advisorField1.fontSize = 7;
          advisorField1.textColor = [0, 0, 0];
          advisorField1.borderStyle = 'none';
          doc.addField(advisorField1);

          const advisorField2 = new doc.AcroFormTextField();
          advisorField2.fieldName = `advisor_client2_${advisorIndex + 1}_${rowIndex}_col3`;
          advisorField2.Rect = [advisorCol3X + 0.3, advisorTableY + 0.3, advisorColWidths[2] - 0.6, advisorCellHeight - 0.6];
          advisorField2.fontSize = 7;
          advisorField2.textColor = [0, 0, 0];
          advisorField2.borderStyle = 'none';
          doc.addField(advisorField2);
        }

        advisorTableY += advisorCellHeight;
      });

      yPosition = advisorTableY + 10;

      if (yPosition > 150) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`Institution ${advisorIndex + 1} Accounts Held`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      const accountRows = [
        { label: 'Account Type:', col2: 'Institution:', col3: 'Last 4 Digits of the Account Number:', col4: 'Beneficiary on File (if applicable):' },
        { label: 'RRSP' },
        { label: 'Spousal RRSP' },
        { label: 'Locked In RRSP/LIRA' },
        { label: 'RRIF' },
        { label: 'Spousal RRIF' },
        { label: 'Life Income Fund (LIF)' },
        { label: 'TFSA' },
        { label: 'Non-Registered Account' },
        { label: 'RESP' },
        { label: 'RDSP' },
        { label: 'FHSA' },
        { label: 'In Trust For:' },
        { label: 'Group RRSP:' },
        { label: 'Deferred Profit-Sharing Plan:' },
        { label: 'Joint with _____:' },
        { label: 'Other:' },
        { label: 'Other:' },
        { label: 'Other:' },
      ];

      const accountCellHeight = 6;
      const accountColWidths = [fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25, fieldWidth * 0.25];
      let accountTableY = yPosition;

      accountRows.forEach((row, rowIndex) => {
        if (accountTableY > 275) {
          doc.addPage();
          accountTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
        doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
        doc.setFontSize(7);

        const accountCol1X = margin;
        const accountCol2X = margin + accountColWidths[0];
        const accountCol3X = margin + accountColWidths[0] + accountColWidths[1];
        const accountCol4X = margin + accountColWidths[0] + accountColWidths[1] + accountColWidths[2];

        doc.rect(accountCol1X, accountTableY, accountColWidths[0], accountCellHeight);
        doc.rect(accountCol2X, accountTableY, accountColWidths[1], accountCellHeight);
        doc.rect(accountCol3X, accountTableY, accountColWidths[2], accountCellHeight);
        doc.rect(accountCol4X, accountTableY, accountColWidths[3], accountCellHeight);

        if (rowIndex === 0) {
          doc.text('Account Type:', accountCol1X + 0.5, accountTableY + 4);
          doc.text('Institution:', accountCol2X + 0.5, accountTableY + 4);
          doc.text('Last 4 Digits of the', accountCol3X + 0.5, accountTableY + 2.5);
          doc.text('Account Number:', accountCol3X + 0.5, accountTableY + 4.5);
          doc.text('Beneficiary on File (if', accountCol4X + 0.5, accountTableY + 2.5);
          doc.text('applicable):', accountCol4X + 0.5, accountTableY + 4.5);
        } else {
          doc.setFont(undefined, 'normal');
          doc.text(row.label, accountCol1X + 0.5, accountTableY + 4);

          const accountField1 = new doc.AcroFormTextField();
          accountField1.fieldName = `accounts_client2_advisor${advisorIndex + 1}_${rowIndex}_col2`;
          accountField1.Rect = [accountCol2X + 0.3, accountTableY + 0.3, accountColWidths[1] - 0.6, accountCellHeight - 0.6];
          accountField1.fontSize = 7;
          accountField1.textColor = [0, 0, 0];
          accountField1.borderStyle = 'none';
          doc.addField(accountField1);

          const accountField2 = new doc.AcroFormTextField();
          accountField2.fieldName = `accounts_client2_advisor${advisorIndex + 1}_${rowIndex}_col3`;
          accountField2.Rect = [accountCol3X + 0.3, accountTableY + 0.3, accountColWidths[2] - 0.6, accountCellHeight - 0.6];
          accountField2.fontSize = 7;
          accountField2.textColor = [0, 0, 0];
          accountField2.borderStyle = 'none';
          doc.addField(accountField2);

          const accountField3 = new doc.AcroFormTextField();
          accountField3.fieldName = `accounts_client2_advisor${advisorIndex + 1}_${rowIndex}_col4`;
          accountField3.Rect = [accountCol4X + 0.3, accountTableY + 0.3, accountColWidths[3] - 0.6, accountCellHeight - 0.6];
          accountField3.fontSize = 7;
          accountField3.textColor = [0, 0, 0];
          accountField3.borderStyle = 'none';
          doc.addField(accountField3);
        }

        accountTableY += accountCellHeight;
      });

      yPosition = accountTableY + 10;
    }
  }

  const bankingStructure = formData.bankingStructure;
  let totalBankCount = 0;

  if (!hasSpouse) {
    totalBankCount = parseInt(formData.client1BankCount || '0');
  } else if (bankingStructure === 'joint') {
    totalBankCount = parseInt(formData.jointBankCount || '0');
  } else if (bankingStructure === 'individual') {
    totalBankCount = parseInt(formData.client1BankCount || '0') + parseInt(formData.client2BankCount || '0');
  } else if (bankingStructure === 'mixed') {
    totalBankCount = parseInt(formData.mixedJointBankCount || '0') + parseInt(formData.mixedClient1BankCount || '0') + parseInt(formData.mixedClient2BankCount || '0');
  }

  if (totalBankCount > 0) {
    yPosition += 12;
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Your Financial Footprint', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 6;
    doc.setFontSize(9);
    doc.text('Banking and financial account information', margin, yPosition);
    yPosition += 10;

    if (bankingStructure === 'joint') {
      const jointCount = parseInt(formData.jointBankCount || '0');
      for (let i = 0; i < jointCount; i++) {
        if (yPosition > 180) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`Joint Banking Account ${i + 1}`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const bankRows = [
          { label: 'Detail:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Institution Name:' },
          { label: 'Branch/Location:' },
          { label: 'Account Type:' },
          { label: 'Last 4 Digits of Account Number:' },
          { label: 'Primary Contact Person:' },
          { label: 'Online Banking Access:' },
          { label: 'Other Details:' },
        ];

        const bankCellHeight = 6;
        const bankColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let bankTableY = yPosition;

        bankRows.forEach((row, rowIndex) => {
          if (bankTableY > 275) {
            doc.addPage();
            bankTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const bankCol1X = margin;
          const bankCol2X = margin + bankColWidths[0];
          const bankCol3X = margin + bankColWidths[0] + bankColWidths[1];

          doc.rect(bankCol1X, bankTableY, bankColWidths[0], bankCellHeight);
          doc.rect(bankCol2X, bankTableY, bankColWidths[1], bankCellHeight);
          doc.rect(bankCol3X, bankTableY, bankColWidths[2], bankCellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', bankCol1X + 0.5, bankTableY + 4);
            doc.text('Information:', bankCol2X + 0.5, bankTableY + 4);
            doc.text('Other Details:', bankCol3X + 0.5, bankTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');
            doc.text(row.label, bankCol1X + 0.5, bankTableY + 4);

            const bankField1 = new doc.AcroFormTextField();
            bankField1.fieldName = `bank_joint_${i + 1}_${rowIndex}_col2`;
            bankField1.Rect = [bankCol2X + 0.3, bankTableY + 0.3, bankColWidths[1] - 0.6, bankCellHeight - 0.6];
            bankField1.fontSize = 7;
            bankField1.textColor = [0, 0, 0];
            bankField1.borderStyle = 'none';
            doc.addField(bankField1);

            const bankField2 = new doc.AcroFormTextField();
            bankField2.fieldName = `bank_joint_${i + 1}_${rowIndex}_col3`;
            bankField2.Rect = [bankCol3X + 0.3, bankTableY + 0.3, bankColWidths[2] - 0.6, bankCellHeight - 0.6];
            bankField2.fontSize = 7;
            bankField2.textColor = [0, 0, 0];
            bankField2.borderStyle = 'none';
            doc.addField(bankField2);
          }

          bankTableY += bankCellHeight;
        });

        yPosition = bankTableY + 10;
      }
    } else if (bankingStructure === 'individual') {
      const client1Count = parseInt(formData.client1BankCount || '0');
      for (let i = 0; i < client1Count; i++) {
        if (yPosition > 180) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`${client1Name} - Banking Account ${i + 1}`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const bankRows = [
          { label: 'Detail:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Institution Name:' },
          { label: 'Branch/Location:' },
          { label: 'Account Type:' },
          { label: 'Last 4 Digits of Account Number:' },
          { label: 'Primary Contact Person:' },
          { label: 'Online Banking Access:' },
          { label: 'Other Details:' },
        ];

        const bankCellHeight = 6;
        const bankColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let bankTableY = yPosition;

        bankRows.forEach((row, rowIndex) => {
          if (bankTableY > 275) {
            doc.addPage();
            bankTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const bankCol1X = margin;
          const bankCol2X = margin + bankColWidths[0];
          const bankCol3X = margin + bankColWidths[0] + bankColWidths[1];

          doc.rect(bankCol1X, bankTableY, bankColWidths[0], bankCellHeight);
          doc.rect(bankCol2X, bankTableY, bankColWidths[1], bankCellHeight);
          doc.rect(bankCol3X, bankTableY, bankColWidths[2], bankCellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', bankCol1X + 0.5, bankTableY + 4);
            doc.text('Information:', bankCol2X + 0.5, bankTableY + 4);
            doc.text('Other Details:', bankCol3X + 0.5, bankTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');
            doc.text(row.label, bankCol1X + 0.5, bankTableY + 4);

            const bankField1 = new doc.AcroFormTextField();
            bankField1.fieldName = `bank_client1_${i + 1}_${rowIndex}_col2`;
            bankField1.Rect = [bankCol2X + 0.3, bankTableY + 0.3, bankColWidths[1] - 0.6, bankCellHeight - 0.6];
            bankField1.fontSize = 7;
            bankField1.textColor = [0, 0, 0];
            bankField1.borderStyle = 'none';
            doc.addField(bankField1);

            const bankField2 = new doc.AcroFormTextField();
            bankField2.fieldName = `bank_client1_${i + 1}_${rowIndex}_col3`;
            bankField2.Rect = [bankCol3X + 0.3, bankTableY + 0.3, bankColWidths[2] - 0.6, bankCellHeight - 0.6];
            bankField2.fontSize = 7;
            bankField2.textColor = [0, 0, 0];
            bankField2.borderStyle = 'none';
            doc.addField(bankField2);
          }

          bankTableY += bankCellHeight;
        });

        yPosition = bankTableY + 10;
      }

      const client2Count = parseInt(formData.client2BankCount || '0');
      for (let i = 0; i < client2Count; i++) {
        if (yPosition > 180) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`${client2Name} - Banking Account ${i + 1}`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const bankRows = [
          { label: 'Detail:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Institution Name:' },
          { label: 'Branch/Location:' },
          { label: 'Account Type:' },
          { label: 'Last 4 Digits of Account Number:' },
          { label: 'Primary Contact Person:' },
          { label: 'Online Banking Access:' },
          { label: 'Other Details:' },
        ];

        const bankCellHeight = 6;
        const bankColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let bankTableY = yPosition;

        bankRows.forEach((row, rowIndex) => {
          if (bankTableY > 275) {
            doc.addPage();
            bankTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const bankCol1X = margin;
          const bankCol2X = margin + bankColWidths[0];
          const bankCol3X = margin + bankColWidths[0] + bankColWidths[1];

          doc.rect(bankCol1X, bankTableY, bankColWidths[0], bankCellHeight);
          doc.rect(bankCol2X, bankTableY, bankColWidths[1], bankCellHeight);
          doc.rect(bankCol3X, bankTableY, bankColWidths[2], bankCellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', bankCol1X + 0.5, bankTableY + 4);
            doc.text('Information:', bankCol2X + 0.5, bankTableY + 4);
            doc.text('Other Details:', bankCol3X + 0.5, bankTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');
            doc.text(row.label, bankCol1X + 0.5, bankTableY + 4);

            const bankField1 = new doc.AcroFormTextField();
            bankField1.fieldName = `bank_client2_${i + 1}_${rowIndex}_col2`;
            bankField1.Rect = [bankCol2X + 0.3, bankTableY + 0.3, bankColWidths[1] - 0.6, bankCellHeight - 0.6];
            bankField1.fontSize = 7;
            bankField1.textColor = [0, 0, 0];
            bankField1.borderStyle = 'none';
            doc.addField(bankField1);

            const bankField2 = new doc.AcroFormTextField();
            bankField2.fieldName = `bank_client2_${i + 1}_${rowIndex}_col3`;
            bankField2.Rect = [bankCol3X + 0.3, bankTableY + 0.3, bankColWidths[2] - 0.6, bankCellHeight - 0.6];
            bankField2.fontSize = 7;
            bankField2.textColor = [0, 0, 0];
            bankField2.borderStyle = 'none';
            doc.addField(bankField2);
          }

          bankTableY += bankCellHeight;
        });

        yPosition = bankTableY + 10;
      }
    } else if (bankingStructure === 'mixed') {
      const jointCount = parseInt(formData.mixedJointBankCount || '0');
      for (let i = 0; i < jointCount; i++) {
        if (yPosition > 180) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`Joint Banking Account ${i + 1}`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const bankRows = [
          { label: 'Detail:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Institution Name:' },
          { label: 'Branch/Location:' },
          { label: 'Account Type:' },
          { label: 'Last 4 Digits of Account Number:' },
          { label: 'Primary Contact Person:' },
          { label: 'Online Banking Access:' },
          { label: 'Other Details:' },
        ];

        const bankCellHeight = 6;
        const bankColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let bankTableY = yPosition;

        bankRows.forEach((row, rowIndex) => {
          if (bankTableY > 275) {
            doc.addPage();
            bankTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const bankCol1X = margin;
          const bankCol2X = margin + bankColWidths[0];
          const bankCol3X = margin + bankColWidths[0] + bankColWidths[1];

          doc.rect(bankCol1X, bankTableY, bankColWidths[0], bankCellHeight);
          doc.rect(bankCol2X, bankTableY, bankColWidths[1], bankCellHeight);
          doc.rect(bankCol3X, bankTableY, bankColWidths[2], bankCellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', bankCol1X + 0.5, bankTableY + 4);
            doc.text('Information:', bankCol2X + 0.5, bankTableY + 4);
            doc.text('Other Details:', bankCol3X + 0.5, bankTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');
            doc.text(row.label, bankCol1X + 0.5, bankTableY + 4);

            const bankField1 = new doc.AcroFormTextField();
            bankField1.fieldName = `bank_mixed_joint_${i + 1}_${rowIndex}_col2`;
            bankField1.Rect = [bankCol2X + 0.3, bankTableY + 0.3, bankColWidths[1] - 0.6, bankCellHeight - 0.6];
            bankField1.fontSize = 7;
            bankField1.textColor = [0, 0, 0];
            bankField1.borderStyle = 'none';
            doc.addField(bankField1);

            const bankField2 = new doc.AcroFormTextField();
            bankField2.fieldName = `bank_mixed_joint_${i + 1}_${rowIndex}_col3`;
            bankField2.Rect = [bankCol3X + 0.3, bankTableY + 0.3, bankColWidths[2] - 0.6, bankCellHeight - 0.6];
            bankField2.fontSize = 7;
            bankField2.textColor = [0, 0, 0];
            bankField2.borderStyle = 'none';
            doc.addField(bankField2);
          }

          bankTableY += bankCellHeight;
        });

        yPosition = bankTableY + 10;
      }

      const client1Count = parseInt(formData.mixedClient1BankCount || '0');
      for (let i = 0; i < client1Count; i++) {
        if (yPosition > 180) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`${client1Name} - Individual Banking Account ${i + 1}`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const bankRows = [
          { label: 'Detail:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Institution Name:' },
          { label: 'Branch/Location:' },
          { label: 'Account Type:' },
          { label: 'Last 4 Digits of Account Number:' },
          { label: 'Primary Contact Person:' },
          { label: 'Online Banking Access:' },
          { label: 'Other Details:' },
        ];

        const bankCellHeight = 6;
        const bankColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let bankTableY = yPosition;

        bankRows.forEach((row, rowIndex) => {
          if (bankTableY > 275) {
            doc.addPage();
            bankTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const bankCol1X = margin;
          const bankCol2X = margin + bankColWidths[0];
          const bankCol3X = margin + bankColWidths[0] + bankColWidths[1];

          doc.rect(bankCol1X, bankTableY, bankColWidths[0], bankCellHeight);
          doc.rect(bankCol2X, bankTableY, bankColWidths[1], bankCellHeight);
          doc.rect(bankCol3X, bankTableY, bankColWidths[2], bankCellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', bankCol1X + 0.5, bankTableY + 4);
            doc.text('Information:', bankCol2X + 0.5, bankTableY + 4);
            doc.text('Other Details:', bankCol3X + 0.5, bankTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');
            doc.text(row.label, bankCol1X + 0.5, bankTableY + 4);

            const bankField1 = new doc.AcroFormTextField();
            bankField1.fieldName = `bank_mixed_client1_${i + 1}_${rowIndex}_col2`;
            bankField1.Rect = [bankCol2X + 0.3, bankTableY + 0.3, bankColWidths[1] - 0.6, bankCellHeight - 0.6];
            bankField1.fontSize = 7;
            bankField1.textColor = [0, 0, 0];
            bankField1.borderStyle = 'none';
            doc.addField(bankField1);

            const bankField2 = new doc.AcroFormTextField();
            bankField2.fieldName = `bank_mixed_client1_${i + 1}_${rowIndex}_col3`;
            bankField2.Rect = [bankCol3X + 0.3, bankTableY + 0.3, bankColWidths[2] - 0.6, bankCellHeight - 0.6];
            bankField2.fontSize = 7;
            bankField2.textColor = [0, 0, 0];
            bankField2.borderStyle = 'none';
            doc.addField(bankField2);
          }

          bankTableY += bankCellHeight;
        });

        yPosition = bankTableY + 10;
      }

      const client2Count = parseInt(formData.mixedClient2BankCount || '0');
      for (let i = 0; i < client2Count; i++) {
        if (yPosition > 180) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`${client2Name} - Individual Banking Account ${i + 1}`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const bankRows = [
          { label: 'Detail:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Institution Name:' },
          { label: 'Branch/Location:' },
          { label: 'Account Type:' },
          { label: 'Last 4 Digits of Account Number:' },
          { label: 'Primary Contact Person:' },
          { label: 'Online Banking Access:' },
          { label: 'Other Details:' },
        ];

        const bankCellHeight = 6;
        const bankColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let bankTableY = yPosition;

        bankRows.forEach((row, rowIndex) => {
          if (bankTableY > 275) {
            doc.addPage();
            bankTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const bankCol1X = margin;
          const bankCol2X = margin + bankColWidths[0];
          const bankCol3X = margin + bankColWidths[0] + bankColWidths[1];

          doc.rect(bankCol1X, bankTableY, bankColWidths[0], bankCellHeight);
          doc.rect(bankCol2X, bankTableY, bankColWidths[1], bankCellHeight);
          doc.rect(bankCol3X, bankTableY, bankColWidths[2], bankCellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', bankCol1X + 0.5, bankTableY + 4);
            doc.text('Information:', bankCol2X + 0.5, bankTableY + 4);
            doc.text('Other Details:', bankCol3X + 0.5, bankTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');
            doc.text(row.label, bankCol1X + 0.5, bankTableY + 4);

            const bankField1 = new doc.AcroFormTextField();
            bankField1.fieldName = `bank_mixed_client2_${i + 1}_${rowIndex}_col3`;
            bankField1.Rect = [bankCol2X + 0.3, bankTableY + 0.3, bankColWidths[1] - 0.6, bankCellHeight - 0.6];
            bankField1.fontSize = 7;
            bankField1.textColor = [0, 0, 0];
            bankField1.borderStyle = 'none';
            doc.addField(bankField1);

            const bankField2 = new doc.AcroFormTextField();
            bankField2.fieldName = `bank_mixed_client2_${i + 1}_${rowIndex}_col3`;
            bankField2.Rect = [bankCol3X + 0.3, bankTableY + 0.3, bankColWidths[2] - 0.6, bankCellHeight - 0.6];
            bankField2.fontSize = 7;
            bankField2.textColor = [0, 0, 0];
            bankField2.borderStyle = 'none';
            doc.addField(bankField2);
          }

          bankTableY += bankCellHeight;
        });

        yPosition = bankTableY + 10;
      }
    } else if (!hasSpouse) {
      const bankCount = parseInt(formData.client1BankCount || '0');
      for (let i = 0; i < bankCount; i++) {
        if (yPosition > 180) {
          doc.addPage();
          yPosition = 12;
        }

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text(`Banking Account ${i + 1}`, margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        const bankRows = [
          { label: 'Detail:', col2: 'Information:', col3: 'Other Details:' },
          { label: 'Institution Name:' },
          { label: 'Branch/Location:' },
          { label: 'Account Type:' },
          { label: 'Last 4 Digits of Account Number:' },
          { label: 'Primary Contact Person:' },
          { label: 'Online Banking Access:' },
          { label: 'Other Details:' },
        ];

        const bankCellHeight = 6;
        const bankColWidths = [fieldWidth * 0.38, fieldWidth * 0.31, fieldWidth * 0.31];
        let bankTableY = yPosition;

        bankRows.forEach((row, rowIndex) => {
          if (bankTableY > 275) {
            doc.addPage();
            bankTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255, rowIndex === 0 ? 200 : 255);
          doc.setFont(undefined, rowIndex === 0 ? 'bold' : 'normal');
          doc.setFontSize(8);

          const bankCol1X = margin;
          const bankCol2X = margin + bankColWidths[0];
          const bankCol3X = margin + bankColWidths[0] + bankColWidths[1];

          doc.rect(bankCol1X, bankTableY, bankColWidths[0], bankCellHeight);
          doc.rect(bankCol2X, bankTableY, bankColWidths[1], bankCellHeight);
          doc.rect(bankCol3X, bankTableY, bankColWidths[2], bankCellHeight);

          if (rowIndex === 0) {
            doc.text('Detail:', bankCol1X + 0.5, bankTableY + 4);
            doc.text('Information:', bankCol2X + 0.5, bankTableY + 4);
            doc.text('Other Details:', bankCol3X + 0.5, bankTableY + 4);
          } else {
            doc.setFont(undefined, 'normal');
            doc.text(row.label, bankCol1X + 0.5, bankTableY + 4);

            const bankField1 = new doc.AcroFormTextField();
            bankField1.fieldName = `bank_single_${i + 1}_${rowIndex}_col2`;
            bankField1.Rect = [bankCol2X + 0.3, bankTableY + 0.3, bankColWidths[1] - 0.6, bankCellHeight - 0.6];
            bankField1.fontSize = 7;
            bankField1.textColor = [0, 0, 0];
            bankField1.borderStyle = 'none';
            doc.addField(bankField1);

            const bankField2 = new doc.AcroFormTextField();
            bankField2.fieldName = `bank_single_${i + 1}_${rowIndex}_col3`;
            bankField2.Rect = [bankCol3X + 0.3, bankTableY + 0.3, bankColWidths[2] - 0.6, bankCellHeight - 0.6];
            bankField2.fontSize = 7;
            bankField2.textColor = [0, 0, 0];
            bankField2.borderStyle = 'none';
            doc.addField(bankField2);
          }

          bankTableY += bankCellHeight;
        });

        yPosition = bankTableY + 10;
      }
    }
  }

  if (formData.ownsRealEstate === 'yes') {
    yPosition += 12;
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Real Estate', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 6;
    doc.setFontSize(9);
    doc.text('Information about owned properties', margin, yPosition);
    yPosition += 10;

    if (formData.isPrimaryResidence === 'yes') {
      const ownerMap: Record<string, string> = {
        'joint_survivorship': 'Jointly with right of survivorship',
        'joint_tenants': 'Jointly as tenants in common',
        'client1': formData.fullName || 'Client 1',
        'client2': formData.spouseName || 'Client 2',
      };
      const ownerLabel = ownerMap[formData.primaryResidenceOwner || ''] || formData.primaryResidenceOwner || '';

      if (yPosition > 220) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.text(`Primary Residence, owned by ${ownerLabel}`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      const primaryResRows = [
        'Primary Residence:',
        'Physical Address:',
        'Deed/Title Location:',
        'Mortgage Holder (if applicable):',
        'Line of Credit (if applicable):',
      ];

      const primaryCellHeight = 7;
      let primaryTableY = yPosition;

      primaryResRows.forEach((rowLabel, rowIndex) => {
        if (primaryTableY > 275) {
          doc.addPage();
          primaryTableY = 12;
        }

        doc.setDrawColor(0, 0, 0);
        doc.setFillColor(255, 255, 255);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(8);

        doc.rect(margin, primaryTableY, fieldWidth, primaryCellHeight);
        doc.text(rowLabel, margin + 0.5, primaryTableY + 4.5);

        if (rowIndex > 0) {
          const primaryField = new doc.AcroFormTextField();
          primaryField.fieldName = `primary_residence_row_${rowIndex}`;
          primaryField.Rect = [margin + fieldWidth * 0.35, primaryTableY + 0.3, fieldWidth * 0.65 - 0.6, primaryCellHeight - 0.6];
          primaryField.fontSize = 7;
          primaryField.textColor = [0, 0, 0];
          primaryField.borderStyle = 'none';
          doc.addField(primaryField);
        }

        primaryTableY += primaryCellHeight;
      });

      yPosition = primaryTableY + 10;
    }

    if (formData.propertiesData && formData.propertiesData.length > 0) {
      formData.propertiesData.forEach((property, propIndex) => {
        if (yPosition > 200) {
          doc.addPage();
          yPosition = 12;
        }

        const ownerMap: Record<string, string> = {
          'joint_survivorship': 'Jointly with right of survivorship',
          'joint_tenants': 'Jointly as tenants in common',
          'client1': formData.fullName || 'Client 1',
          'client2': formData.spouseName || 'Client 2',
          'trust': property.trustName ? `Trust: ${property.trustName}` : 'a Trust',
          'corporation': property.corporationName ? `Corporation: ${property.corporationName}` : 'a Corporation',
          'other': property.otherDetails || 'Other',
        };
        const ownerLabel = ownerMap[property.propertyOwner || ''] || property.propertyOwner || '';

        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.text('Property Name:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        doc.setFontSize(9);
        if (property.propertyName) {
          doc.text(property.propertyName, margin + 30, yPosition);
        }
        yPosition += 6;

        doc.setFont(undefined, 'bold');
        doc.text('Property Type:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        if (property.propertyType) {
          doc.text(property.propertyType, margin + 30, yPosition);
        }
        yPosition += 6;

        doc.setFont(undefined, 'bold');
        doc.text('Ownership Structure:', margin, yPosition);
        doc.setFont(undefined, 'normal');
        yPosition += 6;

        if (property.hasAdditionalOwners === 'yes' && property.additionalOwnersCount) {
          const ownerCount = parseInt(property.additionalOwnersCount) || 0;
          const totalRows = ownerCount + 1;

          const ownershipCellHeight = 7;
          const ownerNameColWidth = fieldWidth * 0.5;
          const ownershipPercentColWidth = fieldWidth * 0.5;
          let ownershipTableY = yPosition;

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(255, 255, 255);
          doc.setFont(undefined, 'bold');
          doc.setFontSize(8);

          doc.rect(margin, ownershipTableY, ownerNameColWidth, ownershipCellHeight);
          doc.text('Owner Name:', margin + 0.5, ownershipTableY + 4.5);

          doc.rect(margin + ownerNameColWidth, ownershipTableY, ownershipPercentColWidth, ownershipCellHeight);
          doc.text('Ownership %:', margin + ownerNameColWidth + 0.5, ownershipTableY + 4.5);

          ownershipTableY += ownershipCellHeight;

          for (let i = 0; i < totalRows; i++) {
            if (ownershipTableY > 275) {
              doc.addPage();
              ownershipTableY = 12;
            }

            doc.setFont(undefined, 'normal');
            doc.rect(margin, ownershipTableY, ownerNameColWidth, ownershipCellHeight);
            doc.rect(margin + ownerNameColWidth, ownershipTableY, ownershipPercentColWidth, ownershipCellHeight);

            const ownerNameField = new doc.AcroFormTextField();
            ownerNameField.fieldName = `property_${propIndex + 1}_owner_name_${i + 1}`;
            ownerNameField.Rect = [margin + 0.3, ownershipTableY + 0.3, ownerNameColWidth - 0.6, ownershipCellHeight - 0.6];
            ownerNameField.fontSize = 7;
            ownerNameField.textColor = [0, 0, 0];
            ownerNameField.borderStyle = 'none';
            doc.addField(ownerNameField);

            const ownerPercentField = new doc.AcroFormTextField();
            ownerPercentField.fieldName = `property_${propIndex + 1}_owner_percent_${i + 1}`;
            ownerPercentField.Rect = [margin + ownerNameColWidth + 0.3, ownershipTableY + 0.3, ownershipPercentColWidth - 0.6, ownershipCellHeight - 0.6];
            ownerPercentField.fontSize = 7;
            ownerPercentField.textColor = [0, 0, 0];
            ownerPercentField.borderStyle = 'none';
            doc.addField(ownerPercentField);

            ownershipTableY += ownershipCellHeight;
          }

          yPosition = ownershipTableY + 10;
        } else {
          doc.setFontSize(8);
          doc.text(`Owned by ${ownerLabel}`, margin, yPosition);
          yPosition += 10;
        }

        if (yPosition > 250) {
          doc.addPage();
          yPosition = 12;
        }

        const propertyRows = [
          'Physical Address',
          'Deed/Title Location:',
          'Mortgage/Lein Holder (if applicable):',
          'Line of Credit (if applicable):',
        ];

        const propertyCellHeight = 7;
        let propertyTableY = yPosition;

        propertyRows.forEach((rowLabel, rowIndex) => {
          if (propertyTableY > 275) {
            doc.addPage();
            propertyTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(255, 255, 255);
          doc.setFont(undefined, 'normal');
          doc.setFontSize(8);

          doc.rect(margin, propertyTableY, fieldWidth, propertyCellHeight);
          doc.text(rowLabel, margin + 0.5, propertyTableY + 4.5);

          const propertyField = new doc.AcroFormTextField();
          propertyField.fieldName = `property_${propIndex + 1}_row_${rowIndex}`;
          propertyField.Rect = [margin + fieldWidth * 0.35, propertyTableY + 0.3, fieldWidth * 0.65 - 0.6, propertyCellHeight - 0.6];
          propertyField.fontSize = 7;
          propertyField.textColor = [0, 0, 0];
          propertyField.borderStyle = 'none';
          doc.addField(propertyField);

          propertyTableY += propertyCellHeight;
        });

        yPosition = propertyTableY + 10;
      });
    }

    yPosition += 12;
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Vehicles and Major Personal Property', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 10;

    const vehicleItems = [
      'Automobiles:',
      'Recreational Vehicles\n(RVs, ATVs,\nMotorcycles):',
      'Major Home\nFurnishings:',
      'Other:',
      'Other:',
      'Other:',
      'Other:'
    ];

    const vehicleCellHeight = 10;
    const col1Width = fieldWidth * 0.25;
    const col2Width = fieldWidth * 0.25;
    const col3Width = fieldWidth * 0.25;
    const col4Width = fieldWidth * 0.25;
    let vehicleTableY = yPosition;

    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);

    doc.rect(margin, vehicleTableY, col1Width, vehicleCellHeight);
    doc.text('Item Description:', margin + 0.5, vehicleTableY + 4.5);

    doc.rect(margin + col1Width, vehicleTableY, col2Width, vehicleCellHeight);
    doc.text('Physical Location:', margin + col1Width + 0.5, vehicleTableY + 4.5);

    doc.rect(margin + col1Width + col2Width, vehicleTableY, col3Width, vehicleCellHeight);
    doc.text('Ownership\n(Sole/Joint):', margin + col1Width + col2Width + 0.5, vehicleTableY + 3);

    doc.rect(margin + col1Width + col2Width + col3Width, vehicleTableY, col4Width, vehicleCellHeight);
    doc.text('Insurance Provider:', margin + col1Width + col2Width + col3Width + 0.5, vehicleTableY + 4.5);

    vehicleTableY += vehicleCellHeight;

    vehicleItems.forEach((item, index) => {
      if (vehicleTableY > 275) {
        doc.addPage();
        vehicleTableY = 12;
      }

      doc.setFont(undefined, 'normal');
      doc.setFontSize(7);

      doc.rect(margin, vehicleTableY, col1Width, vehicleCellHeight);
      const lines = item.split('\n');
      lines.forEach((line, lineIndex) => {
        doc.text(line, margin + 0.5, vehicleTableY + 3.5 + (lineIndex * 3));
      });

      doc.rect(margin + col1Width, vehicleTableY, col2Width, vehicleCellHeight);
      doc.rect(margin + col1Width + col2Width, vehicleTableY, col3Width, vehicleCellHeight);
      doc.rect(margin + col1Width + col2Width + col3Width, vehicleTableY, col4Width, vehicleCellHeight);

      const field1 = new doc.AcroFormTextField();
      field1.fieldName = `vehicle_location_${index}`;
      field1.Rect = [margin + col1Width + 0.3, vehicleTableY + 0.3, col2Width - 0.6, vehicleCellHeight - 0.6];
      field1.fontSize = 7;
      field1.textColor = [0, 0, 0];
      field1.borderStyle = 'none';
      doc.addField(field1);

      const field2 = new doc.AcroFormTextField();
      field2.fieldName = `vehicle_ownership_${index}`;
      field2.Rect = [margin + col1Width + col2Width + 0.3, vehicleTableY + 0.3, col3Width - 0.6, vehicleCellHeight - 0.6];
      field2.fontSize = 7;
      field2.textColor = [0, 0, 0];
      field2.borderStyle = 'none';
      doc.addField(field2);

      const field3 = new doc.AcroFormTextField();
      field3.fieldName = `vehicle_insurance_${index}`;
      field3.Rect = [margin + col1Width + col2Width + col3Width + 0.3, vehicleTableY + 0.3, col4Width - 0.6, vehicleCellHeight - 0.6];
      field3.fontSize = 7;
      field3.textColor = [0, 0, 0];
      field3.borderStyle = 'none';
      doc.addField(field3);

      vehicleTableY += vehicleCellHeight;
    });

    yPosition = vehicleTableY + 15;

    if (yPosition > 200) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('High-Value Effects and Sentimental Heirlooms:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 8;

    doc.setFontSize(8);
    const heirloomText = "Listing these items here creates a 'Memorandum of Personal Effects' which allows for distribution outside the formal Will and can reduce probate complexity and family disputes. Keep in mind things like art and collections are subjective and your heirs might not know the true value of what you have as they are going through your belongings:";
    const splitText = doc.splitTextToSize(heirloomText, fieldWidth);
    splitText.forEach((line: string) => {
      doc.text(line, margin, yPosition);
      yPosition += 4;
    });
    yPosition += 4;

    const heirloomCellHeight = 10;
    const hCol1Width = fieldWidth * 0.25;
    const hCol2Width = fieldWidth * 0.25;
    const hCol3Width = fieldWidth * 0.25;
    const hCol4Width = fieldWidth * 0.25;
    let heirloomTableY = yPosition;

    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);

    doc.rect(margin, heirloomTableY, hCol1Width, heirloomCellHeight);
    doc.text('Item (Art, Jewelry,\nCollectibles)', margin + 0.5, heirloomTableY + 3.5);

    doc.rect(margin + hCol1Width, heirloomTableY, hCol2Width, heirloomCellHeight);
    doc.text('Location (e.g., Safe,\nDisplay)', margin + hCol1Width + 0.5, heirloomTableY + 3.5);

    doc.rect(margin + hCol1Width + hCol2Width, heirloomTableY, hCol3Width, heirloomCellHeight);
    doc.text('Estimated\nValue/Appraisal:', margin + hCol1Width + hCol2Width + 0.5, heirloomTableY + 3.5);

    doc.rect(margin + hCol1Width + hCol2Width + hCol3Width, heirloomTableY, hCol4Width, heirloomCellHeight);
    doc.text('Intended Beneficiary:', margin + hCol1Width + hCol2Width + hCol3Width + 0.5, heirloomTableY + 4.5);

    heirloomTableY += heirloomCellHeight;

    for (let i = 0; i < 3; i++) {
      if (heirloomTableY > 275) {
        doc.addPage();
        heirloomTableY = 12;
      }

      doc.setFont(undefined, 'normal');

      doc.rect(margin, heirloomTableY, hCol1Width, heirloomCellHeight);
      doc.rect(margin + hCol1Width, heirloomTableY, hCol2Width, heirloomCellHeight);
      doc.rect(margin + hCol1Width + hCol2Width, heirloomTableY, hCol3Width, heirloomCellHeight);
      doc.rect(margin + hCol1Width + hCol2Width + hCol3Width, heirloomTableY, hCol4Width, heirloomCellHeight);

      const hField1 = new doc.AcroFormTextField();
      hField1.fieldName = `heirloom_item_${i}`;
      hField1.Rect = [margin + 0.3, heirloomTableY + 0.3, hCol1Width - 0.6, heirloomCellHeight - 0.6];
      hField1.fontSize = 7;
      hField1.textColor = [0, 0, 0];
      hField1.borderStyle = 'none';
      doc.addField(hField1);

      const hField2 = new doc.AcroFormTextField();
      hField2.fieldName = `heirloom_location_${i}`;
      hField2.Rect = [margin + hCol1Width + 0.3, heirloomTableY + 0.3, hCol2Width - 0.6, heirloomCellHeight - 0.6];
      hField2.fontSize = 7;
      hField2.textColor = [0, 0, 0];
      hField2.borderStyle = 'none';
      doc.addField(hField2);

      const hField3 = new doc.AcroFormTextField();
      hField3.fieldName = `heirloom_value_${i}`;
      hField3.Rect = [margin + hCol1Width + hCol2Width + 0.3, heirloomTableY + 0.3, hCol3Width - 0.6, heirloomCellHeight - 0.6];
      hField3.fontSize = 7;
      hField3.textColor = [0, 0, 0];
      hField3.borderStyle = 'none';
      doc.addField(hField3);

      const hField4 = new doc.AcroFormTextField();
      hField4.fieldName = `heirloom_beneficiary_${i}`;
      hField4.Rect = [margin + hCol1Width + hCol2Width + hCol3Width + 0.3, heirloomTableY + 0.3, hCol4Width - 0.6, heirloomCellHeight - 0.6];
      hField4.fontSize = 7;
      hField4.textColor = [0, 0, 0];
      hField4.borderStyle = 'none';
      doc.addField(hField4);

      heirloomTableY += heirloomCellHeight;
    }

    yPosition = heirloomTableY + 15;

    if (yPosition > 200) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Secure Access and Storage:', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 8;

    doc.setFontSize(8);
    const storageText = "Your representatives cannot protect what they cannot reach. This table identifies the physical 'gateways' to your assets:";
    const splitStorageText = doc.splitTextToSize(storageText, fieldWidth);
    splitStorageText.forEach((line: string) => {
      doc.text(line, margin, yPosition);
      yPosition += 4;
    });
    yPosition += 4;

    const storageItems = [
      'Safety Deposit Box',
      'Home Safe',
      'Storage Locker',
      'Post Office Box',
      'Other:'
    ];

    const storageCellHeight = 10;
    const sCol1Width = fieldWidth * 0.25;
    const sCol2Width = fieldWidth * 0.25;
    const sCol3Width = fieldWidth * 0.25;
    const sCol4Width = fieldWidth * 0.25;
    let storageTableY = yPosition;

    doc.setDrawColor(0, 0, 0);
    doc.setFillColor(255, 255, 255);
    doc.setFont(undefined, 'bold');
    doc.setFontSize(8);

    doc.rect(margin, storageTableY, sCol1Width, storageCellHeight);
    doc.text('Storage Type:', margin + 0.5, storageTableY + 4.5);

    doc.rect(margin + sCol1Width, storageTableY, sCol2Width, storageCellHeight);
    doc.text('Physical Location:', margin + sCol1Width + 0.5, storageTableY + 4.5);

    doc.rect(margin + sCol1Width + sCol2Width, storageTableY, sCol3Width, storageCellHeight);
    doc.text('Key/Combination\nLocation:', margin + sCol1Width + sCol2Width + 0.5, storageTableY + 3.5);

    doc.rect(margin + sCol1Width + sCol2Width + sCol3Width, storageTableY, sCol4Width, storageCellHeight);
    doc.text('Box/Locker Number:', margin + sCol1Width + sCol2Width + sCol3Width + 0.5, storageTableY + 4.5);

    storageTableY += storageCellHeight;

    storageItems.forEach((item, index) => {
      if (storageTableY > 275) {
        doc.addPage();
        storageTableY = 12;
      }

      doc.setFont(undefined, 'normal');
      doc.setFontSize(7);

      doc.rect(margin, storageTableY, sCol1Width, storageCellHeight);
      doc.text(item, margin + 0.5, storageTableY + 4.5);

      doc.rect(margin + sCol1Width, storageTableY, sCol2Width, storageCellHeight);
      doc.rect(margin + sCol1Width + sCol2Width, storageTableY, sCol3Width, storageCellHeight);
      doc.rect(margin + sCol1Width + sCol2Width + sCol3Width, storageTableY, sCol4Width, storageCellHeight);

      const sField1 = new doc.AcroFormTextField();
      sField1.fieldName = `storage_location_${index}`;
      sField1.Rect = [margin + sCol1Width + 0.3, storageTableY + 0.3, sCol2Width - 0.6, storageCellHeight - 0.6];
      sField1.fontSize = 7;
      sField1.textColor = [0, 0, 0];
      sField1.borderStyle = 'none';
      doc.addField(sField1);

      const sField2 = new doc.AcroFormTextField();
      sField2.fieldName = `storage_key_location_${index}`;
      sField2.Rect = [margin + sCol1Width + sCol2Width + 0.3, storageTableY + 0.3, sCol3Width - 0.6, storageCellHeight - 0.6];
      sField2.fontSize = 7;
      sField2.textColor = [0, 0, 0];
      sField2.borderStyle = 'none';
      doc.addField(sField2);

      const sField3 = new doc.AcroFormTextField();
      sField3.fieldName = `storage_box_number_${index}`;
      sField3.Rect = [margin + sCol1Width + sCol2Width + sCol3Width + 0.3, storageTableY + 0.3, sCol4Width - 0.6, storageCellHeight - 0.6];
      sField3.fontSize = 7;
      sField3.textColor = [0, 0, 0];
      sField3.borderStyle = 'none';
      doc.addField(sField3);

      storageTableY += storageCellHeight;
    });

    yPosition = storageTableY + 10;
  }

  if (formData.hasDebts === 'yes' && formData.debtsData && formData.debtsData.length > 0) {
    yPosition += 12;
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Outstanding Debts', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 6;
    doc.setFontSize(9);
    doc.text('Information about outstanding debts (not including credit cards)', margin, yPosition);
    yPosition += 10;

    const client1Name = formData.fullName || 'Client 1';
    const client2Name = formData.spouseName || 'Client 2';

    const client1Debts = formData.debtsData.filter(debt => debt.debtOwner === client1Name);
    const client2Debts = formData.debtsData.filter(debt => debt.debtOwner === client2Name);
    const jointDebts = formData.debtsData.filter(debt => debt.debtOwner === 'Jointly');
    const otherDebts = formData.debtsData.filter(debt =>
      debt.debtOwner !== client1Name &&
      debt.debtOwner !== client2Name &&
      debt.debtOwner !== 'Jointly'
    );

    const debtGroups = [
      { debts: client1Debts, heading: `${client1Name}'s Debts` },
      { debts: client2Debts, heading: `${client2Name}'s Debts` },
      { debts: jointDebts, heading: 'Joint Debts' },
      { debts: otherDebts, heading: 'Other Debts' }
    ];

    const debtRows = [
      'Lender Name:',
      'Loan Type:',
      'Interest Rate:',
      'Loan Maturity:',
      'Payment Amount:',
      'Payment Frequency:',
      'Contact Name:',
      'Contact Phone:',
      'Where is the Contract Stored:',
      'Other Details:',
    ];

    debtGroups.forEach((group, groupIndex) => {
      if (group.debts.length === 0) return;

      if (groupIndex > 0) {
        yPosition += 12;
      }

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text(group.heading, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;

      const debtsToProcess = group.debts;
      let debtStartIndex = 0;

      while (debtStartIndex < debtsToProcess.length) {
        const debtsInThisChart = debtsToProcess.slice(debtStartIndex, debtStartIndex + 3);

        if (debtStartIndex > 0) {
          if (yPosition > 150) {
            doc.addPage();
            yPosition = 12;
          }
          doc.setFontSize(11);
          doc.setFont(undefined, 'bold');
          doc.text(`${group.heading} (continued)`, margin, yPosition);
          doc.setFont(undefined, 'normal');
          yPosition += 10;
        }

        const numDebts = debtsInThisChart.length;
        const cellHeight = 7;
        const labelColWidth = fieldWidth * 0.28;
        const valueColWidth = (fieldWidth - labelColWidth) / numDebts;
        let debtTableY = yPosition;

        debtRows.forEach((rowLabel, rowIndex) => {
          if (debtTableY > 275) {
            doc.addPage();
            debtTableY = 12;
          }

          doc.setDrawColor(0, 0, 0);
          doc.setFillColor(255, 255, 255);
          doc.setFont(undefined, 'normal');
          doc.setFontSize(8);

          const labelColX = margin;
          doc.rect(labelColX, debtTableY, labelColWidth, cellHeight);
          doc.text(rowLabel, labelColX + 0.5, debtTableY + 4.5);

          for (let i = 0; i < numDebts; i++) {
            const debt = debtsInThisChart[i];
            const valueColX = margin + labelColWidth + (i * valueColWidth);
            doc.rect(valueColX, debtTableY, valueColWidth, cellHeight);

            if (rowIndex === 1 && debt.debtType) {
              doc.setFontSize(7);
              doc.text(debt.debtType, valueColX + 0.5, debtTableY + 4.5);
              doc.setFontSize(8);
            } else {
              const debtField = new doc.AcroFormTextField();
              const globalDebtIndex = formData.debtsData.indexOf(debt);
              debtField.fieldName = `debt_${globalDebtIndex + 1}_row_${rowIndex}_col`;
              debtField.Rect = [valueColX + 0.3, debtTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
              debtField.fontSize = 7;
              debtField.textColor = [0, 0, 0];
              debtField.borderStyle = 'none';
              doc.addField(debtField);
            }
          }

          debtTableY += cellHeight;
        });

        debtsInThisChart.forEach((debt, i) => {
          if (debt.hasOtherOnLoan === 'yes') {
            if (debtTableY > 270) {
              doc.addPage();
              debtTableY = 12;
            }

            const valueColX = margin + labelColWidth + (i * valueColWidth);

            doc.setFillColor(240, 240, 240);
            doc.rect(margin, debtTableY, labelColWidth, cellHeight);
            doc.setFillColor(255, 255, 255);
            doc.text('Other on Loan:', margin + 0.5, debtTableY + 4.5);

            doc.rect(valueColX, debtTableY, valueColWidth, cellHeight);
            const otherNameField = new doc.AcroFormTextField();
            const globalDebtIndex = formData.debtsData.indexOf(debt);
            otherNameField.fieldName = `debt_${globalDebtIndex + 1}_other_name`;
            otherNameField.Rect = [valueColX + 0.3, debtTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
            otherNameField.fontSize = 7;
            otherNameField.textColor = [0, 0, 0];
            otherNameField.borderStyle = 'none';
            if (debt.otherPersonName) {
              otherNameField.value = debt.otherPersonName;
            }
            doc.addField(otherNameField);
          }
        });

        if (debtsInThisChart.some(debt => debt.hasOtherOnLoan === 'yes')) {
          debtTableY += cellHeight;
        }

        debtsInThisChart.forEach((debt, i) => {
          if (debt.hasOtherOnLoan === 'yes') {
            const valueColX = margin + labelColWidth + (i * valueColWidth);

            if (debtTableY > 270) {
              doc.addPage();
              debtTableY = 12;
            }

            doc.setFillColor(240, 240, 240);
            doc.rect(margin, debtTableY, labelColWidth, cellHeight);
            doc.setFillColor(255, 255, 255);
            doc.text('Other Phone:', margin + 0.5, debtTableY + 4.5);

            doc.rect(valueColX, debtTableY, valueColWidth, cellHeight);
            const otherPhoneField = new doc.AcroFormTextField();
            const globalDebtIndex = formData.debtsData.indexOf(debt);
            otherPhoneField.fieldName = `debt_${globalDebtIndex + 1}_other_phone`;
            otherPhoneField.Rect = [valueColX + 0.3, debtTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
            otherPhoneField.fontSize = 7;
            otherPhoneField.textColor = [0, 0, 0];
            otherPhoneField.borderStyle = 'none';
            if (debt.otherPersonPhone) {
              otherPhoneField.value = debt.otherPersonPhone;
            }
            doc.addField(otherPhoneField);
          }
        });

        if (debtsInThisChart.some(debt => debt.hasOtherOnLoan === 'yes')) {
          debtTableY += cellHeight;
        }

        yPosition = debtTableY + 15;
        debtStartIndex += 3;
      }
    });
  }

  const generateInsuranceChart = (
    policyType: string,
    policyCount: number,
    clientName: string
  ) => {
    if (policyCount <= 0) return;

    if (yPosition > 200) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`${clientName}'s ${policyType}`, margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 10;

    const insuranceRows = [
      'Life Insured:',
      'Insurance Company:',
      'Insurance Policy Number (last 4 digits):',
      'Beneficiary:',
      'Policy Maturity Date:',
      'Premium Amount:',
      'Premium Payment Frequency:',
      'Benefit Amount:',
      'Benefit Frequency:',
      'Benefit Ends:',
      'Waiting Period:',
      'Where is the Policy Document Stored?',
      'Other Details:',
    ];

    const cellHeight = 7;
    const labelColWidth = fieldWidth * 0.28;
    const valueColWidth = (fieldWidth - labelColWidth) / policyCount;
    let insuranceTableY = yPosition;

    insuranceRows.forEach((rowLabel, rowIndex) => {
      if (insuranceTableY > 275) {
        doc.addPage();
        insuranceTableY = 12;
      }

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);

      const labelColX = margin;
      doc.rect(labelColX, insuranceTableY, labelColWidth, cellHeight);
      doc.text(rowLabel, labelColX + 0.5, insuranceTableY + 4.5);

      for (let i = 0; i < policyCount; i++) {
        const valueColX = margin + labelColWidth + (i * valueColWidth);
        doc.rect(valueColX, insuranceTableY, valueColWidth, cellHeight);

        const insuranceField = new doc.AcroFormTextField();
        insuranceField.fieldName = `${policyType.replace(/\s+/g, '_').toLowerCase()}_${clientName.replace(/\s+/g, '_').toLowerCase()}_${i + 1}_row_${rowIndex}`;
        insuranceField.Rect = [valueColX + 0.3, insuranceTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
        insuranceField.fontSize = 7;
        insuranceField.textColor = [0, 0, 0];
        insuranceField.borderStyle = 'none';
        doc.addField(insuranceField);
      }

      insuranceTableY += cellHeight;
    });

    yPosition = insuranceTableY + 15;
  };

  const generateWorkBenefitsChart = (clientName: string, hasWorkBenefits: string) => {
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`${clientName}'s Work Benefits`, margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 10;

    if (hasWorkBenefits === 'no') {
      doc.setFontSize(10);
      doc.text(`${clientName} indicated that they have no life, disability, or critical illness insurance through their work.`, margin, yPosition);
      yPosition += 15;
      return;
    }

    const workBenefitsRows = [
      "Employer's Name:",
      'Insurance Provider:',
      'Life Insurance Death Benefit:',
      'Disability Benefit:',
      'Critical Illness Benefit:',
      'Location of a copy of your benefits package:',
    ];

    const cellHeight = 7;
    const labelColWidth = fieldWidth * 0.45;
    const valueColWidth = fieldWidth - labelColWidth;
    let workBenefitsTableY = yPosition;

    workBenefitsRows.forEach((rowLabel, rowIndex) => {
      if (workBenefitsTableY > 275) {
        doc.addPage();
        workBenefitsTableY = 12;
      }

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);

      const labelColX = margin;
      doc.rect(labelColX, workBenefitsTableY, labelColWidth, cellHeight);
      doc.text(rowLabel, labelColX + 0.5, workBenefitsTableY + 4.5);

      const valueColX = margin + labelColWidth;
      doc.rect(valueColX, workBenefitsTableY, valueColWidth, cellHeight);

      const workBenefitsField = new doc.AcroFormTextField();
      workBenefitsField.fieldName = `work_benefits_${clientName.replace(/\s+/g, '_').toLowerCase()}_row_${rowIndex}`;
      workBenefitsField.Rect = [valueColX + 0.3, workBenefitsTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
      workBenefitsField.fontSize = 7;
      workBenefitsField.textColor = [0, 0, 0];
      workBenefitsField.borderStyle = 'none';
      doc.addField(workBenefitsField);

      workBenefitsTableY += cellHeight;
    });

    yPosition = workBenefitsTableY + 15;
  };

  if (formData.client1HasWorkBenefits) {
    generateWorkBenefitsChart(formData.fullName || 'Client 1', formData.client1HasWorkBenefits);
  }

  if (formData.client2HasWorkBenefits) {
    generateWorkBenefitsChart(formData.spouseName || 'Client 2', formData.client2HasWorkBenefits);
  }

  const hasAnyLifeInsurance =
    (formData.client1HasLifeInsurance === 'yes' && formData.client1LifeInsuranceCount && parseInt(formData.client1LifeInsuranceCount) > 0) ||
    (formData.client2HasLifeInsurance === 'yes' && formData.client2LifeInsuranceCount && parseInt(formData.client2LifeInsuranceCount) > 0);

  if (hasAnyLifeInsurance) {
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Life Insurance', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 15;
  }

  if (formData.client1HasLifeInsurance === 'yes' && formData.client1LifeInsuranceCount) {
    const count = parseInt(formData.client1LifeInsuranceCount);
    if (count > 0) {
      generateInsuranceChart('Life Insurance Policies', count, formData.fullName || 'Client 1');
    }
  }

  if (formData.client2HasLifeInsurance === 'yes' && formData.client2LifeInsuranceCount) {
    const count = parseInt(formData.client2LifeInsuranceCount);
    if (count > 0) {
      generateInsuranceChart('Life Insurance Policies', count, formData.spouseName || 'Client 2');
    }
  }

  const hasAnyDisabilityInsurance =
    (formData.client1HasDisabilityInsurance === 'yes' && formData.client1DisabilityInsuranceCount && parseInt(formData.client1DisabilityInsuranceCount) > 0) ||
    (formData.client2HasDisabilityInsurance === 'yes' && formData.client2DisabilityInsuranceCount && parseInt(formData.client2DisabilityInsuranceCount) > 0);

  if (hasAnyDisabilityInsurance) {
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Disability Insurance', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 15;
  }

  if (formData.client1HasDisabilityInsurance === 'yes' && formData.client1DisabilityInsuranceCount) {
    const count = parseInt(formData.client1DisabilityInsuranceCount);
    if (count > 0) {
      generateInsuranceChart('Disability Insurance Policies', count, formData.fullName || 'Client 1');
    }
  }

  if (formData.client2HasDisabilityInsurance === 'yes' && formData.client2DisabilityInsuranceCount) {
    const count = parseInt(formData.client2DisabilityInsuranceCount);
    if (count > 0) {
      generateInsuranceChart('Disability Insurance Policies', count, formData.spouseName || 'Client 2');
    }
  }

  const hasAnyCriticalIllness =
    (formData.client1HasCriticalIllness === 'yes' && formData.client1CriticalIllnessCount && parseInt(formData.client1CriticalIllnessCount) > 0) ||
    (formData.client2HasCriticalIllness === 'yes' && formData.client2CriticalIllnessCount && parseInt(formData.client2CriticalIllnessCount) > 0);

  if (hasAnyCriticalIllness) {
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Critical Illness Insurance', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 15;
  }

  if (formData.client1HasCriticalIllness === 'yes' && formData.client1CriticalIllnessCount) {
    const count = parseInt(formData.client1CriticalIllnessCount);
    if (count > 0) {
      generateInsuranceChart('Critical Illness Policies', count, formData.fullName || 'Client 1');
    }
  }

  if (formData.client2HasCriticalIllness === 'yes' && formData.client2CriticalIllnessCount) {
    const count = parseInt(formData.client2CriticalIllnessCount);
    if (count > 0) {
      generateInsuranceChart('Critical Illness Policies', count, formData.spouseName || 'Client 2');
    }
  }

  const generatePropertyInsuranceChart = (propertyLabel: string) => {
    if (yPosition > 230) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(propertyLabel, margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 10;

    const propertyRows = [
      'Property Address:',
      'Insurance Provider:',
      'Property Type:',
      'Coverage Amount:',
      'Document Location:',
      'Other Details:',
    ];

    const cellHeight = 7;
    const labelColWidth = fieldWidth * 0.35;
    const valueColWidth = fieldWidth - labelColWidth;
    let propertyTableY = yPosition;

    propertyRows.forEach((rowLabel, rowIndex) => {
      if (propertyTableY > 275) {
        doc.addPage();
        propertyTableY = 12;
      }

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);

      const labelColX = margin;
      doc.rect(labelColX, propertyTableY, labelColWidth, cellHeight);
      doc.text(rowLabel, labelColX + 0.5, propertyTableY + 4.5);

      const valueColX = margin + labelColWidth;
      doc.rect(valueColX, propertyTableY, valueColWidth, cellHeight);

      const propertyField = new doc.AcroFormTextField();
      propertyField.fieldName = `property_${propertyLabel.replace(/\s+/g, '_').toLowerCase()}_row_${rowIndex}`;
      propertyField.Rect = [valueColX + 0.3, propertyTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
      propertyField.fontSize = 7;
      propertyField.textColor = [0, 0, 0];
      propertyField.borderStyle = 'none';
      doc.addField(propertyField);

      propertyTableY += cellHeight;
    });

    yPosition = propertyTableY + 15;
  };

  if (formData.hasHomeInsurance) {
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Property and Casualty Insurance', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 15;

    if (formData.hasHomeInsurance === 'no') {
      doc.setFontSize(10);
      doc.text('Client(s) indicated that they have no property insurance.', margin, yPosition);
      yPosition += 15;
    } else if (formData.hasHomeInsurance === 'yes') {
      generatePropertyInsuranceChart('Primary Home Insurance');

      if (formData.hasAdditionalProperties === 'yes' && formData.additionalPropertiesCount) {
        const additionalCount = parseInt(formData.additionalPropertiesCount);
        for (let i = 1; i <= additionalCount; i++) {
          generatePropertyInsuranceChart(`Additional Property ${i} Insurance`);
        }
      }
    }
  }

  const generateVehicleInsuranceChart = (vehicleLabel: string, clientName: string) => {
    if (yPosition > 230) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text(`${vehicleLabel} - ${clientName}`, margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 10;

    const vehicleRows = [
      'Vehicle Insured:',
      'Vehicle Owner:',
      'Insurance Provider:',
      'Coverage Amount:',
      'Document Location:',
    ];

    const cellHeight = 7;
    const labelColWidth = fieldWidth * 0.35;
    const valueColWidth = fieldWidth - labelColWidth;
    let vehicleTableY = yPosition;

    vehicleRows.forEach((rowLabel, rowIndex) => {
      if (vehicleTableY > 275) {
        doc.addPage();
        vehicleTableY = 12;
      }

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'normal');
      doc.setFontSize(8);

      const labelColX = margin;
      doc.rect(labelColX, vehicleTableY, labelColWidth, cellHeight);
      doc.text(rowLabel, labelColX + 0.5, vehicleTableY + 4.5);

      const valueColX = margin + labelColWidth;
      doc.rect(valueColX, vehicleTableY, valueColWidth, cellHeight);

      const vehicleField = new doc.AcroFormTextField();
      vehicleField.fieldName = `vehicle_${vehicleLabel.replace(/\s+/g, '_').toLowerCase()}_${clientName.replace(/\s+/g, '_').toLowerCase()}_row_${rowIndex}`;
      vehicleField.Rect = [valueColX + 0.3, vehicleTableY + 0.3, valueColWidth - 0.6, cellHeight - 0.6];
      vehicleField.fontSize = 7;
      vehicleField.textColor = [0, 0, 0];
      vehicleField.borderStyle = 'none';
      doc.addField(vehicleField);

      vehicleTableY += cellHeight;
    });

    yPosition = vehicleTableY + 15;
  };

  if (formData.client1HasVehicleInsurance === 'yes' || formData.client2HasVehicleInsurance === 'yes') {
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Vehicle Insurance', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 15;

    let vehicleNumber = 1;

    if (formData.client1HasVehicleInsurance === 'yes') {
      generateVehicleInsuranceChart(`Vehicle ${vehicleNumber}`, formData.fullName || 'Client 1');
      vehicleNumber++;
    }

    if (formData.client2HasVehicleInsurance === 'yes') {
      generateVehicleInsuranceChart(`Vehicle ${vehicleNumber}`, formData.spouseName || 'Client 2');
      vehicleNumber++;
    }

    if (formData.hasAdditionalVehicles === 'yes' && formData.additionalVehiclesCount) {
      const additionalCount = parseInt(formData.additionalVehiclesCount);
      for (let i = 0; i < additionalCount; i++) {
        generateVehicleInsuranceChart(`Vehicle ${vehicleNumber}`, 'Additional Vehicle');
        vehicleNumber++;
      }
    }
  }

  if (formData.client1HasVehicleInsurance === 'no' &&
      (formData.client2HasVehicleInsurance === 'no' || !formData.client2HasVehicleInsurance)) {
    if (yPosition > 240) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Vehicle Insurance', margin, yPosition);
    doc.setFont(undefined, 'normal');
    yPosition += 15;

    doc.setFontSize(10);
    doc.text('Client(s) indicated that they have no vehicle insurance.', margin, yPosition);
    yPosition += 15;
  }

  if (formData.hasCorporation === 'yes' && formData.corporationCount) {
    const corpCount = parseInt(formData.corporationCount);
    for (let corpIndex = 1; corpIndex <= corpCount; corpIndex++) {
      if (yPosition > 240) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Corporate Information', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 12;

      const corpNameCellHeight = 8;
      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFontSize(8);

      doc.rect(margin, yPosition, fieldWidth * 0.35, corpNameCellHeight);
      doc.setFont(undefined, 'bold');
      doc.text(`${getOrdinalLabel(corpIndex)} Corporation's Name:`, margin + 0.5, yPosition + 5);
      doc.setFont(undefined, 'normal');

      doc.rect(margin + fieldWidth * 0.35, yPosition, fieldWidth * 0.65, corpNameCellHeight);
      const corpNameField = new doc.AcroFormTextField();
      corpNameField.fieldName = `corporation_${corpIndex}_name`;
      corpNameField.Rect = [margin + fieldWidth * 0.35 + 0.3, yPosition + 0.3, fieldWidth * 0.65 - 0.6, corpNameCellHeight - 0.6];
      corpNameField.fontSize = 8;
      corpNameField.textColor = [0, 0, 0];
      corpNameField.borderStyle = 'none';
      doc.addField(corpNameField);

      yPosition += corpNameCellHeight + 12;

      if (yPosition > 240) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Business and Professional Contracts:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      doc.setFontSize(8);
      const contractText = "For clients with corporations, your trustee must know your 'Quarterback Team' to manage transitions or wind-ups effectively.";
      const splitContractText = doc.splitTextToSize(contractText, fieldWidth);
      splitContractText.forEach((line: string) => {
        doc.text(line, margin, yPosition);
        yPosition += 4;
      });
      yPosition += 4;

      const contractItems = [
        'Lawyer(s):',
        'Accountant/Tax\nPrep(s):',
        'Trustee(s):',
        'Life/Disability/Critical\nIllness Provider(s)'
      ];

      const contractCellHeight = 10;
      const cCol1Width = fieldWidth * 0.25;
      const cCol2Width = fieldWidth * 0.25;
      const cCol3Width = fieldWidth * 0.25;
      const cCol4Width = fieldWidth * 0.25;
      let contractTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, contractTableY, cCol1Width, contractCellHeight);
      doc.text('Professional:', margin + 0.5, contractTableY + 5);

      doc.rect(margin + cCol1Width, contractTableY, cCol2Width, contractCellHeight);
      doc.text('Name:', margin + cCol1Width + 0.5, contractTableY + 5);

      doc.rect(margin + cCol1Width + cCol2Width, contractTableY, cCol3Width, contractCellHeight);
      doc.text('Firm/Contact Info:', margin + cCol1Width + cCol2Width + 0.5, contractTableY + 5);

      doc.rect(margin + cCol1Width + cCol2Width + cCol3Width, contractTableY, cCol4Width, contractCellHeight);
      doc.text('Role in the Estate:', margin + cCol1Width + cCol2Width + cCol3Width + 0.5, contractTableY + 5);

      contractTableY += contractCellHeight;

      contractItems.forEach((item, index) => {
        if (contractTableY > 275) {
          doc.addPage();
          contractTableY = 12;
        }

        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);

        doc.rect(margin, contractTableY, cCol1Width, contractCellHeight);
        const lines = item.split('\n');
        lines.forEach((line, lineIndex) => {
          doc.text(line, margin + 0.5, contractTableY + 3.5 + (lineIndex * 3));
        });

        doc.rect(margin + cCol1Width, contractTableY, cCol2Width, contractCellHeight);
        doc.rect(margin + cCol1Width + cCol2Width, contractTableY, cCol3Width, contractCellHeight);
        doc.rect(margin + cCol1Width + cCol2Width + cCol3Width, contractTableY, cCol4Width, contractCellHeight);

        const cField1 = new doc.AcroFormTextField();
        cField1.fieldName = `corp_${corpIndex}_contract_name_${index}`;
        cField1.Rect = [margin + cCol1Width + 0.3, contractTableY + 0.3, cCol2Width - 0.6, contractCellHeight - 0.6];
        cField1.fontSize = 7;
        cField1.textColor = [0, 0, 0];
        cField1.borderStyle = 'none';
        doc.addField(cField1);

        const cField2 = new doc.AcroFormTextField();
        cField2.fieldName = `corp_${corpIndex}_contract_firm_${index}`;
        cField2.Rect = [margin + cCol1Width + cCol2Width + 0.3, contractTableY + 0.3, cCol3Width - 0.6, contractCellHeight - 0.6];
        cField2.fontSize = 7;
        cField2.textColor = [0, 0, 0];
        cField2.borderStyle = 'none';
        doc.addField(cField2);

        const cField3 = new doc.AcroFormTextField();
        cField3.fieldName = `corp_${corpIndex}_contract_role_${index}`;
        cField3.Rect = [margin + cCol1Width + cCol2Width + cCol3Width + 0.3, contractTableY + 0.3, cCol4Width - 0.6, contractCellHeight - 0.6];
        cField3.fontSize = 7;
        cField3.textColor = [0, 0, 0];
        cField3.borderStyle = 'none';
        doc.addField(cField3);

        contractTableY += contractCellHeight;
      });

      yPosition = contractTableY + 15;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Corporate Governance and Legal Structure:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      doc.setFontSize(8);
      const govText = 'This table identifies the fundamental legal identity of your enterprise(s):';
      doc.text(govText, margin, yPosition);
      yPosition += 8;

      const govCellHeight = 10;
      const gCol1Width = fieldWidth * 0.25;
      const gCol2Width = fieldWidth * 0.25;
      const gCol3Width = fieldWidth * 0.25;
      const gCol4Width = fieldWidth * 0.25;
      let govTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, govTableY, gCol1Width, govCellHeight);
      doc.text('Entity Legal Name:', margin + 0.5, govTableY + 5);

      doc.rect(margin + gCol1Width, govTableY, gCol2Width, govCellHeight);
      doc.text('Structure (CCPC, PC,\nPartnership, Sole\nProprietorship):', margin + gCol1Width + 0.5, govTableY + 3);

      doc.rect(margin + gCol1Width + gCol2Width, govTableY, gCol3Width, govCellHeight);
      doc.text('Percent Owned:', margin + gCol1Width + gCol2Width + 0.5, govTableY + 5);

      doc.rect(margin + gCol1Width + gCol2Width + gCol3Width, govTableY, gCol4Width, govCellHeight);
      doc.text('Location of Minute\nBooks/Articles of\nIncorporation:', margin + gCol1Width + gCol2Width + gCol3Width + 0.5, govTableY + 2.5);

      govTableY += govCellHeight;

      for (let i = 0; i < 3; i++) {
        if (govTableY > 275) {
          doc.addPage();
          govTableY = 12;
        }

        doc.setFont(undefined, 'normal');

        doc.rect(margin, govTableY, gCol1Width, govCellHeight);
        doc.rect(margin + gCol1Width, govTableY, gCol2Width, govCellHeight);
        doc.rect(margin + gCol1Width + gCol2Width, govTableY, gCol3Width, govCellHeight);
        doc.rect(margin + gCol1Width + gCol2Width + gCol3Width, govTableY, gCol4Width, govCellHeight);

        const gField1 = new doc.AcroFormTextField();
        gField1.fieldName = `corp_${corpIndex}_gov_entity_${i}`;
        gField1.Rect = [margin + 0.3, govTableY + 0.3, gCol1Width - 0.6, govCellHeight - 0.6];
        gField1.fontSize = 7;
        gField1.textColor = [0, 0, 0];
        gField1.borderStyle = 'none';
        doc.addField(gField1);

        const gField2 = new doc.AcroFormTextField();
        gField2.fieldName = `corp_${corpIndex}_gov_structure_${i}`;
        gField2.Rect = [margin + gCol1Width + 0.3, govTableY + 0.3, gCol2Width - 0.6, govCellHeight - 0.6];
        gField2.fontSize = 7;
        gField2.textColor = [0, 0, 0];
        gField2.borderStyle = 'none';
        doc.addField(gField2);

        const gField3 = new doc.AcroFormTextField();
        gField3.fieldName = `corp_${corpIndex}_gov_percent_${i}`;
        gField3.Rect = [margin + gCol1Width + gCol2Width + 0.3, govTableY + 0.3, gCol3Width - 0.6, govCellHeight - 0.6];
        gField3.fontSize = 7;
        gField3.textColor = [0, 0, 0];
        gField3.borderStyle = 'none';
        doc.addField(gField3);

        const gField4 = new doc.AcroFormTextField();
        gField4.fieldName = `corp_${corpIndex}_gov_location_${i}`;
        gField4.Rect = [margin + gCol1Width + gCol2Width + gCol3Width + 0.3, govTableY + 0.3, gCol4Width - 0.6, govCellHeight - 0.6];
        gField4.fontSize = 7;
        gField4.textColor = [0, 0, 0];
        gField4.borderStyle = 'none';
        doc.addField(gField4);

        govTableY += govCellHeight;
      }

      yPosition = govTableY + 15;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Professional Team:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      doc.setFontSize(8);
      const profText = 'These are the professionals that are related to your corporate needs:';
      doc.text(profText, margin, yPosition);
      yPosition += 8;

      const profItems = [
        'Corporate Accountant:',
        'Commercial Banker:',
        'Business Valuator:',
        'Other:',
        'Other:'
      ];

      const profCellHeight = 10;
      const pCol1Width = fieldWidth * 0.25;
      const pCol2Width = fieldWidth * 0.25;
      const pCol3Width = fieldWidth * 0.25;
      const pCol4Width = fieldWidth * 0.25;
      let profTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, profTableY, pCol1Width, profCellHeight);
      doc.text('Professional:', margin + 0.5, profTableY + 5);

      doc.rect(margin + pCol1Width, profTableY, pCol2Width, profCellHeight);
      doc.text('Name:', margin + pCol1Width + 0.5, profTableY + 5);

      doc.rect(margin + pCol1Width + pCol2Width, profTableY, pCol3Width, profCellHeight);
      doc.text('Firm & Contact Info:', margin + pCol1Width + pCol2Width + 0.5, profTableY + 5);

      doc.rect(margin + pCol1Width + pCol2Width + pCol3Width, profTableY, pCol4Width, profCellHeight);
      doc.text('Primary Role:', margin + pCol1Width + pCol2Width + pCol3Width + 0.5, profTableY + 5);

      profTableY += profCellHeight;

      profItems.forEach((item, index) => {
        if (profTableY > 275) {
          doc.addPage();
          profTableY = 12;
        }

        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);

        doc.rect(margin, profTableY, pCol1Width, profCellHeight);
        doc.text(item, margin + 0.5, profTableY + 5);

        doc.rect(margin + pCol1Width, profTableY, pCol2Width, profCellHeight);
        doc.rect(margin + pCol1Width + pCol2Width, profTableY, pCol3Width, profCellHeight);
        doc.rect(margin + pCol1Width + pCol2Width + pCol3Width, profTableY, pCol4Width, profCellHeight);

        const pField1 = new doc.AcroFormTextField();
        pField1.fieldName = `corp_${corpIndex}_prof_name_${index}`;
        pField1.Rect = [margin + pCol1Width + 0.3, profTableY + 0.3, pCol2Width - 0.6, profCellHeight - 0.6];
        pField1.fontSize = 7;
        pField1.textColor = [0, 0, 0];
        pField1.borderStyle = 'none';
        doc.addField(pField1);

        const pField2 = new doc.AcroFormTextField();
        pField2.fieldName = `corp_${corpIndex}_prof_firm_${index}`;
        pField2.Rect = [margin + pCol1Width + pCol2Width + 0.3, profTableY + 0.3, pCol3Width - 0.6, profCellHeight - 0.6];
        pField2.fontSize = 7;
        pField2.textColor = [0, 0, 0];
        pField2.borderStyle = 'none';
        doc.addField(pField2);

        const pField3 = new doc.AcroFormTextField();
        pField3.fieldName = `corp_${corpIndex}_prof_role_${index}`;
        pField3.Rect = [margin + pCol1Width + pCol2Width + pCol3Width + 0.3, profTableY + 0.3, pCol4Width - 0.6, profCellHeight - 0.6];
        pField3.fontSize = 7;
        pField3.textColor = [0, 0, 0];
        pField3.borderStyle = 'none';
        doc.addField(pField3);

        profTableY += profCellHeight;
      });

      yPosition = profTableY + 15;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Financial Obligations and Personal Guarantees:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 10;

      const finCellHeight = 10;
      const fCol1Width = fieldWidth * 0.25;
      const fCol2Width = fieldWidth * 0.25;
      const fCol3Width = fieldWidth * 0.25;
      const fCol4Width = fieldWidth * 0.25;
      let finTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, finTableY, fCol1Width, finCellHeight);
      doc.text('Creditor/Bank:', margin + 0.5, finTableY + 5);

      doc.rect(margin + fCol1Width, finTableY, fCol2Width, finCellHeight);
      doc.text('Loan Type (term, LOC,\nMortgage):', margin + fCol1Width + 0.5, finTableY + 3.5);

      doc.rect(margin + fCol1Width + fCol2Width, finTableY, fCol3Width, finCellHeight);
      doc.text('Account Number:', margin + fCol1Width + fCol2Width + 0.5, finTableY + 5);

      doc.rect(margin + fCol1Width + fCol2Width + fCol3Width, finTableY, fCol4Width, finCellHeight);
      doc.text('Personal Guarantee?\n(Y/N)', margin + fCol1Width + fCol2Width + fCol3Width + 0.5, finTableY + 3.5);

      finTableY += finCellHeight;

      for (let i = 0; i < 4; i++) {
        if (finTableY > 275) {
          doc.addPage();
          finTableY = 12;
        }

        doc.setFont(undefined, 'normal');

        doc.rect(margin, finTableY, fCol1Width, finCellHeight);
        doc.rect(margin + fCol1Width, finTableY, fCol2Width, finCellHeight);
        doc.rect(margin + fCol1Width + fCol2Width, finTableY, fCol3Width, finCellHeight);
        doc.rect(margin + fCol1Width + fCol2Width + fCol3Width, finTableY, fCol4Width, finCellHeight);

        const fField1 = new doc.AcroFormTextField();
        fField1.fieldName = `corp_${corpIndex}_fin_creditor_${i}`;
        fField1.Rect = [margin + 0.3, finTableY + 0.3, fCol1Width - 0.6, finCellHeight - 0.6];
        fField1.fontSize = 7;
        fField1.textColor = [0, 0, 0];
        fField1.borderStyle = 'none';
        doc.addField(fField1);

        const fField2 = new doc.AcroFormTextField();
        fField2.fieldName = `corp_${corpIndex}_fin_loantype_${i}`;
        fField2.Rect = [margin + fCol1Width + 0.3, finTableY + 0.3, fCol2Width - 0.6, finCellHeight - 0.6];
        fField2.fontSize = 7;
        fField2.textColor = [0, 0, 0];
        fField2.borderStyle = 'none';
        doc.addField(fField2);

        const fField3 = new doc.AcroFormTextField();
        fField3.fieldName = `corp_${corpIndex}_fin_account_${i}`;
        fField3.Rect = [margin + fCol1Width + fCol2Width + 0.3, finTableY + 0.3, fCol3Width - 0.6, finCellHeight - 0.6];
        fField3.fontSize = 7;
        fField3.textColor = [0, 0, 0];
        fField3.borderStyle = 'none';
        doc.addField(fField3);

        const fField4 = new doc.AcroFormTextField();
        fField4.fieldName = `corp_${corpIndex}_fin_guarantee_${i}`;
        fField4.Rect = [margin + fCol1Width + fCol2Width + fCol3Width + 0.3, finTableY + 0.3, fCol4Width - 0.6, finCellHeight - 0.6];
        fField4.fontSize = 7;
        fField4.textColor = [0, 0, 0];
        fField4.borderStyle = 'none';
        doc.addField(fField4);

        finTableY += finCellHeight;
      }

      yPosition = finTableY + 15;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Business Continuity and Risk Management:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      doc.setFontSize(8);
      const riskText = 'Insurance is often the primary source of liquidity for funding buy/sell agreements or paying terminal taxes.';
      const splitRiskText = doc.splitTextToSize(riskText, fieldWidth);
      splitRiskText.forEach((line: string) => {
        doc.text(line, margin, yPosition);
        yPosition += 4;
      });
      yPosition += 4;

      const riskItems = [
        'Key Person',
        'Buy-Sell Funding',
        'Overhead\nExpense',
        'Commercial\nGeneral Liability'
      ];

      const riskCellHeight = 10;
      const rCol1Width = fieldWidth * 0.2;
      const rCol2Width = fieldWidth * 0.2;
      const rCol3Width = fieldWidth * 0.2;
      const rCol4Width = fieldWidth * 0.2;
      const rCol5Width = fieldWidth * 0.2;
      let riskTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, riskTableY, rCol1Width, riskCellHeight);
      doc.text('Policy Type:', margin + 0.5, riskTableY + 5);

      doc.rect(margin + rCol1Width, riskTableY, rCol2Width, riskCellHeight);
      doc.text('Insurance Carrier:', margin + rCol1Width + 0.5, riskTableY + 5);

      doc.rect(margin + rCol1Width + rCol2Width, riskTableY, rCol3Width, riskCellHeight);
      doc.text('Key Contact:', margin + rCol1Width + rCol2Width + 0.5, riskTableY + 5);

      doc.rect(margin + rCol1Width + rCol2Width + rCol3Width, riskTableY, rCol4Width, riskCellHeight);
      doc.text('Policy Number:', margin + rCol1Width + rCol2Width + rCol3Width + 0.5, riskTableY + 5);

      doc.rect(margin + rCol1Width + rCol2Width + rCol3Width + rCol4Width, riskTableY, rCol5Width, riskCellHeight);
      doc.text('Beneficiary/Purpose', margin + rCol1Width + rCol2Width + rCol3Width + rCol4Width + 0.5, riskTableY + 5);

      riskTableY += riskCellHeight;

      riskItems.forEach((item, index) => {
        if (riskTableY > 275) {
          doc.addPage();
          riskTableY = 12;
        }

        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);

        doc.rect(margin, riskTableY, rCol1Width, riskCellHeight);
        const lines = item.split('\n');
        lines.forEach((line, lineIndex) => {
          doc.text(line, margin + 0.5, riskTableY + 3.5 + (lineIndex * 3));
        });

        doc.rect(margin + rCol1Width, riskTableY, rCol2Width, riskCellHeight);
        doc.rect(margin + rCol1Width + rCol2Width, riskTableY, rCol3Width, riskCellHeight);
        doc.rect(margin + rCol1Width + rCol2Width + rCol3Width, riskTableY, rCol4Width, riskCellHeight);
        doc.rect(margin + rCol1Width + rCol2Width + rCol3Width + rCol4Width, riskTableY, rCol5Width, riskCellHeight);

        const rField1 = new doc.AcroFormTextField();
        rField1.fieldName = `corp_${corpIndex}_risk_carrier_${index}`;
        rField1.Rect = [margin + rCol1Width + 0.3, riskTableY + 0.3, rCol2Width - 0.6, riskCellHeight - 0.6];
        rField1.fontSize = 7;
        rField1.textColor = [0, 0, 0];
        rField1.borderStyle = 'none';
        doc.addField(rField1);

        const rField2 = new doc.AcroFormTextField();
        rField2.fieldName = `corp_${corpIndex}_risk_contact_${index}`;
        rField2.Rect = [margin + rCol1Width + rCol2Width + 0.3, riskTableY + 0.3, rCol3Width - 0.6, riskCellHeight - 0.6];
        rField2.fontSize = 7;
        rField2.textColor = [0, 0, 0];
        rField2.borderStyle = 'none';
        doc.addField(rField2);

        const rField3 = new doc.AcroFormTextField();
        rField3.fieldName = `corp_${corpIndex}_risk_policy_${index}`;
        rField3.Rect = [margin + rCol1Width + rCol2Width + rCol3Width + 0.3, riskTableY + 0.3, rCol4Width - 0.6, riskCellHeight - 0.6];
        rField3.fontSize = 7;
        rField3.textColor = [0, 0, 0];
        rField3.borderStyle = 'none';
        doc.addField(rField3);

        const rField4 = new doc.AcroFormTextField();
        rField4.fieldName = `corp_${corpIndex}_risk_beneficiary_${index}`;
        rField4.Rect = [margin + rCol1Width + rCol2Width + rCol3Width + rCol4Width + 0.3, riskTableY + 0.3, rCol5Width - 0.6, riskCellHeight - 0.6];
        rField4.fontSize = 7;
        rField4.textColor = [0, 0, 0];
        rField4.borderStyle = 'none';
        doc.addField(rField4);

        riskTableY += riskCellHeight;
      });

      yPosition = riskTableY + 15;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Succession and Buy-Sell Triggers:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      doc.setFontSize(8);
      const successionText = 'Identify the roadmap for who takes control and how they are supposed to pay for it.';
      doc.text(successionText, margin, yPosition);
      yPosition += 8;

      const successionDetails = [
        { label: 'Chosen Successor:', example: '' },
        { label: 'Buy-Sell Trigger Events:', example: 'e.g. Death, Disability, Divorce.' },
        { label: 'Valuation Method:', example: 'e.g. Formula vs. Independent Valuator' },
        { label: 'Other Scenario:', example: '' },
        { label: 'Other Scenario:', example: '' }
      ];

      const succCellHeight = 10;
      const sCol1Width = fieldWidth * 0.23;
      const sCol2Width = fieldWidth * 0.26;
      const sCol3Width = fieldWidth * 0.26;
      const sCol4Width = fieldWidth * 0.25;
      let succTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, succTableY, sCol1Width, succCellHeight);
      doc.text('Succession Detail:', margin + 0.5, succTableY + 5);

      doc.rect(margin + sCol1Width, succTableY, sCol2Width, succCellHeight);
      doc.text('Response/Instruction:', margin + sCol1Width + 0.5, succTableY + 5);

      doc.rect(margin + sCol1Width + sCol2Width, succTableY, sCol3Width, succCellHeight);
      doc.text('Location of Governing\nAgreement:', margin + sCol1Width + sCol2Width + 0.5, succTableY + 3.5);

      doc.rect(margin + sCol1Width + sCol2Width + sCol3Width, succTableY, sCol4Width, succCellHeight);
      doc.text('Other Information:', margin + sCol1Width + sCol2Width + sCol3Width + 0.5, succTableY + 5);

      succTableY += succCellHeight;

      successionDetails.forEach((detail, index) => {
        if (succTableY > 275) {
          doc.addPage();
          succTableY = 12;
        }

        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);

        doc.rect(margin, succTableY, sCol1Width, succCellHeight);
        doc.text(detail.label, margin + 0.5, succTableY + 5);

        doc.rect(margin + sCol1Width, succTableY, sCol2Width, succCellHeight);
        if (detail.example) {
          doc.setTextColor(100, 100, 100);
          const exampleLines = detail.example.split('\n');
          exampleLines.forEach((line, lineIdx) => {
            doc.text(line, margin + sCol1Width + 0.5, succTableY + 3 + (lineIdx * 3));
          });
          doc.setTextColor(0, 0, 0);
        }

        doc.rect(margin + sCol1Width + sCol2Width, succTableY, sCol3Width, succCellHeight);
        if (index === 0) {
          doc.setTextColor(100, 100, 100);
          doc.text('e.g. Shareholder', margin + sCol1Width + sCol2Width + 0.5, succTableY + 4);
          doc.text('Agreement', margin + sCol1Width + sCol2Width + 0.5, succTableY + 7);
          doc.setTextColor(0, 0, 0);
        }

        doc.rect(margin + sCol1Width + sCol2Width + sCol3Width, succTableY, sCol4Width, succCellHeight);

        const sField1 = new doc.AcroFormTextField();
        sField1.fieldName = `corp_${corpIndex}_succession_response_${index}`;
        sField1.Rect = [margin + sCol1Width + 0.3, succTableY + 0.3, sCol2Width - 0.6, succCellHeight - 0.6];
        sField1.fontSize = 7;
        sField1.textColor = [0, 0, 0];
        sField1.borderStyle = 'none';
        doc.addField(sField1);

        const sField2 = new doc.AcroFormTextField();
        sField2.fieldName = `corp_${corpIndex}_succession_location_${index}`;
        sField2.Rect = [margin + sCol1Width + sCol2Width + 0.3, succTableY + 0.3, sCol3Width - 0.6, succCellHeight - 0.6];
        sField2.fontSize = 7;
        sField2.textColor = [0, 0, 0];
        sField2.borderStyle = 'none';
        doc.addField(sField2);

        const sField3 = new doc.AcroFormTextField();
        sField3.fieldName = `corp_${corpIndex}_succession_other_${index}`;
        sField3.Rect = [margin + sCol1Width + sCol2Width + sCol3Width + 0.3, succTableY + 0.3, sCol4Width - 0.6, succCellHeight - 0.6];
        sField3.fontSize = 7;
        sField3.textColor = [0, 0, 0];
        sField3.borderStyle = 'none';
        doc.addField(sField3);

        succTableY += succCellHeight;
      });

      yPosition = succTableY + 15;
    }
  }

  if (formData.hasFamilyTrust === 'yes' && formData.familyTrustCount) {
    const trustCount = parseInt(formData.familyTrustCount as string);
    const trustsData = formData.trustsData as Array<Record<string, string>> | undefined;

    for (let trustIndex = 1; trustIndex <= trustCount; trustIndex++) {
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Family Trust Information', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 12;

      const trustData = trustsData ? trustsData[trustIndex - 1] : {};
      const trustName = trustData?.trustName || '';

      const trustNameCellHeight = 8;
      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFontSize(8);

      doc.rect(margin, yPosition, fieldWidth * 0.35, trustNameCellHeight);
      doc.setFont(undefined, 'bold');
      doc.text(`Trust ${trustIndex} - Legal Name:`, margin + 0.5, yPosition + 5);
      doc.setFont(undefined, 'normal');

      doc.rect(margin + fieldWidth * 0.35, yPosition, fieldWidth * 0.65, trustNameCellHeight);
      if (trustName) {
        doc.setFontSize(8);
        doc.text(trustName, margin + fieldWidth * 0.35 + 0.5, yPosition + 5);
      }

      yPosition += trustNameCellHeight + 4;

      doc.rect(margin, yPosition, fieldWidth * 0.35, trustNameCellHeight);
      doc.setFont(undefined, 'bold');
      doc.text('Trust Deed Location:', margin + 0.5, yPosition + 5);
      doc.setFont(undefined, 'normal');

      doc.rect(margin + fieldWidth * 0.35, yPosition, fieldWidth * 0.65, trustNameCellHeight);
      if (trustData?.deedLocation) {
        doc.setFontSize(8);
        doc.text(trustData.deedLocation, margin + fieldWidth * 0.35 + 0.5, yPosition + 5);
      }

      yPosition += trustNameCellHeight + 4;

      doc.rect(margin, yPosition, fieldWidth * 0.35, trustNameCellHeight);
      doc.setFont(undefined, 'bold');
      doc.text('Year Established:', margin + 0.5, yPosition + 5);
      doc.setFont(undefined, 'normal');

      doc.rect(margin + fieldWidth * 0.35, yPosition, fieldWidth * 0.65, trustNameCellHeight);
      const yearField = new doc.AcroFormTextField();
      yearField.fieldName = `trust_${trustIndex}_year_established`;
      yearField.Rect = [margin + fieldWidth * 0.35 + 0.3, yPosition + 0.3, fieldWidth * 0.65 - 0.6, trustNameCellHeight - 0.6];
      yearField.fontSize = 8;
      yearField.textColor = [0, 0, 0];
      yearField.borderStyle = 'none';
      doc.addField(yearField);

      yPosition += trustNameCellHeight + 12;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Trust and Professional Contracts:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      doc.setFontSize(8);
      const trustProfText = `For clients with Trusts, your Estate Trustee must know your 'Quarterback Team' to manage transitions or wind-ups effectively.`;
      doc.text(trustProfText, margin, yPosition);
      yPosition += 8;

      const profItems = [
        'Lawyer(s):',
        'Accountant/Tax Prep(s):',
        'Other:'
      ];

      const profCellHeight = 10;
      const pCol1Width = fieldWidth * 0.22;
      const pCol2Width = fieldWidth * 0.26;
      const pCol3Width = fieldWidth * 0.26;
      const pCol4Width = fieldWidth * 0.26;
      let profTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, profTableY, pCol1Width, profCellHeight);
      doc.text('Professional:', margin + 0.5, profTableY + 5);

      doc.rect(margin + pCol1Width, profTableY, pCol2Width, profCellHeight);
      doc.text('Name:', margin + pCol1Width + 0.5, profTableY + 5);

      doc.rect(margin + pCol1Width + pCol2Width, profTableY, pCol3Width, profCellHeight);
      doc.text('Firm/Contact Info:', margin + pCol1Width + pCol2Width + 0.5, profTableY + 5);

      doc.rect(margin + pCol1Width + pCol2Width + pCol3Width, profTableY, pCol4Width, profCellHeight);
      doc.text('Role in the Estate:', margin + pCol1Width + pCol2Width + pCol3Width + 0.5, profTableY + 5);

      profTableY += profCellHeight;

      profItems.forEach((item, index) => {
        if (profTableY > 275) {
          doc.addPage();
          profTableY = 12;
        }

        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);

        doc.rect(margin, profTableY, pCol1Width, profCellHeight);
        doc.text(item, margin + 0.5, profTableY + 5);

        doc.rect(margin + pCol1Width, profTableY, pCol2Width, profCellHeight);
        doc.rect(margin + pCol1Width + pCol2Width, profTableY, pCol3Width, profCellHeight);
        doc.rect(margin + pCol1Width + pCol2Width + pCol3Width, profTableY, pCol4Width, profCellHeight);

        const pField1 = new doc.AcroFormTextField();
        pField1.fieldName = `trust_${trustIndex}_prof_name_${index}`;
        pField1.Rect = [margin + pCol1Width + 0.3, profTableY + 0.3, pCol2Width - 0.6, profCellHeight - 0.6];
        pField1.fontSize = 7;
        pField1.textColor = [0, 0, 0];
        pField1.borderStyle = 'none';
        doc.addField(pField1);

        const pField2 = new doc.AcroFormTextField();
        pField2.fieldName = `trust_${trustIndex}_prof_firm_${index}`;
        pField2.Rect = [margin + pCol1Width + pCol2Width + 0.3, profTableY + 0.3, pCol3Width - 0.6, profCellHeight - 0.6];
        pField2.fontSize = 7;
        pField2.textColor = [0, 0, 0];
        pField2.borderStyle = 'none';
        doc.addField(pField2);

        const pField3 = new doc.AcroFormTextField();
        pField3.fieldName = `trust_${trustIndex}_prof_role_${index}`;
        pField3.Rect = [margin + pCol1Width + pCol2Width + pCol3Width + 0.3, profTableY + 0.3, pCol4Width - 0.6, profCellHeight - 0.6];
        pField3.fontSize = 7;
        pField3.textColor = [0, 0, 0];
        pField3.borderStyle = 'none';
        doc.addField(pField3);

        profTableY += profCellHeight;
      });

      yPosition = profTableY + 15;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Trustee Information:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;

      const trusteeRows = 4;
      const trusteeCellHeight = 10;
      const tCol1Width = fieldWidth * 0.35;
      const tCol2Width = fieldWidth * 0.3;
      const tCol3Width = fieldWidth * 0.35;
      let trusteeTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, trusteeTableY, tCol1Width, trusteeCellHeight);
      doc.text('Trustee Name:', margin + 0.5, trusteeTableY + 5);

      doc.rect(margin + tCol1Width, trusteeTableY, tCol2Width, trusteeCellHeight);
      doc.text('Phone Number:', margin + tCol1Width + 0.5, trusteeTableY + 5);

      doc.rect(margin + tCol1Width + tCol2Width, trusteeTableY, tCol3Width, trusteeCellHeight);
      doc.text('Email Address:', margin + tCol1Width + tCol2Width + 0.5, trusteeTableY + 5);

      trusteeTableY += trusteeCellHeight;

      for (let i = 0; i < trusteeRows; i++) {
        if (trusteeTableY > 275) {
          doc.addPage();
          trusteeTableY = 12;
        }

        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);

        doc.rect(margin, trusteeTableY, tCol1Width, trusteeCellHeight);
        doc.rect(margin + tCol1Width, trusteeTableY, tCol2Width, trusteeCellHeight);
        doc.rect(margin + tCol1Width + tCol2Width, trusteeTableY, tCol3Width, trusteeCellHeight);

        const tField1 = new doc.AcroFormTextField();
        tField1.fieldName = `trust_${trustIndex}_trustee_name_${i}`;
        tField1.Rect = [margin + 0.3, trusteeTableY + 0.3, tCol1Width - 0.6, trusteeCellHeight - 0.6];
        tField1.fontSize = 7;
        tField1.textColor = [0, 0, 0];
        tField1.borderStyle = 'none';
        doc.addField(tField1);

        const tField2 = new doc.AcroFormTextField();
        tField2.fieldName = `trust_${trustIndex}_trustee_phone_${i}`;
        tField2.Rect = [margin + tCol1Width + 0.3, trusteeTableY + 0.3, tCol2Width - 0.6, trusteeCellHeight - 0.6];
        tField2.fontSize = 7;
        tField2.textColor = [0, 0, 0];
        tField2.borderStyle = 'none';
        doc.addField(tField2);

        const tField3 = new doc.AcroFormTextField();
        tField3.fieldName = `trust_${trustIndex}_trustee_email_${i}`;
        tField3.Rect = [margin + tCol1Width + tCol2Width + 0.3, trusteeTableY + 0.3, tCol3Width - 0.6, trusteeCellHeight - 0.6];
        tField3.fontSize = 7;
        tField3.textColor = [0, 0, 0];
        tField3.borderStyle = 'none';
        doc.addField(tField3);

        trusteeTableY += trusteeCellHeight;
      }

      yPosition = trusteeTableY + 15;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Beneficiary(ies):', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;

      const beneficiaryRows = 4;
      const beneficiaryCellHeight = 10;
      const bCol1Width = fieldWidth * 0.25;
      const bCol2Width = fieldWidth * 0.25;
      const bCol3Width = fieldWidth * 0.25;
      const bCol4Width = fieldWidth * 0.25;
      let beneficiaryTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(7);

      doc.rect(margin, beneficiaryTableY, bCol1Width, beneficiaryCellHeight);
      doc.text('Beneficiary Name:', margin + 0.5, beneficiaryTableY + 5);

      doc.rect(margin + bCol1Width, beneficiaryTableY, bCol2Width, beneficiaryCellHeight);
      const countryText = 'Country of\nResidence (for tax\npurposes):';
      const countryLines = countryText.split('\n');
      countryLines.forEach((line, idx) => {
        doc.text(line, margin + bCol1Width + 0.5, beneficiaryTableY + 2.5 + (idx * 2.5));
      });

      doc.rect(margin + bCol1Width + bCol2Width, beneficiaryTableY, bCol3Width, beneficiaryCellHeight);
      doc.text('Phone Number:', margin + bCol1Width + bCol2Width + 0.5, beneficiaryTableY + 5);

      doc.rect(margin + bCol1Width + bCol2Width + bCol3Width, beneficiaryTableY, bCol4Width, beneficiaryCellHeight);
      doc.text('Email Address:', margin + bCol1Width + bCol2Width + bCol3Width + 0.5, beneficiaryTableY + 5);

      beneficiaryTableY += beneficiaryCellHeight;

      for (let i = 0; i < beneficiaryRows; i++) {
        if (beneficiaryTableY > 275) {
          doc.addPage();
          beneficiaryTableY = 12;
        }

        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);

        doc.rect(margin, beneficiaryTableY, bCol1Width, beneficiaryCellHeight);
        doc.rect(margin + bCol1Width, beneficiaryTableY, bCol2Width, beneficiaryCellHeight);
        doc.rect(margin + bCol1Width + bCol2Width, beneficiaryTableY, bCol3Width, beneficiaryCellHeight);
        doc.rect(margin + bCol1Width + bCol2Width + bCol3Width, beneficiaryTableY, bCol4Width, beneficiaryCellHeight);

        const bField1 = new doc.AcroFormTextField();
        bField1.fieldName = `trust_${trustIndex}_beneficiary_name_${i}`;
        bField1.Rect = [margin + 0.3, beneficiaryTableY + 0.3, bCol1Width - 0.6, beneficiaryCellHeight - 0.6];
        bField1.fontSize = 7;
        bField1.textColor = [0, 0, 0];
        bField1.borderStyle = 'none';
        doc.addField(bField1);

        const bField2 = new doc.AcroFormTextField();
        bField2.fieldName = `trust_${trustIndex}_beneficiary_country_${i}`;
        bField2.Rect = [margin + bCol1Width + 0.3, beneficiaryTableY + 0.3, bCol2Width - 0.6, beneficiaryCellHeight - 0.6];
        bField2.fontSize = 7;
        bField2.textColor = [0, 0, 0];
        bField2.borderStyle = 'none';
        doc.addField(bField2);

        const bField3 = new doc.AcroFormTextField();
        bField3.fieldName = `trust_${trustIndex}_beneficiary_phone_${i}`;
        bField3.Rect = [margin + bCol1Width + bCol2Width + 0.3, beneficiaryTableY + 0.3, bCol3Width - 0.6, beneficiaryCellHeight - 0.6];
        bField3.fontSize = 7;
        bField3.textColor = [0, 0, 0];
        bField3.borderStyle = 'none';
        doc.addField(bField3);

        const bField4 = new doc.AcroFormTextField();
        bField4.fieldName = `trust_${trustIndex}_beneficiary_email_${i}`;
        bField4.Rect = [margin + bCol1Width + bCol2Width + bCol3Width + 0.3, beneficiaryTableY + 0.3, bCol4Width - 0.6, beneficiaryCellHeight - 0.6];
        bField4.fontSize = 7;
        bField4.textColor = [0, 0, 0];
        bField4.borderStyle = 'none';
        doc.addField(bField4);

        beneficiaryTableY += beneficiaryCellHeight;
      }

      yPosition = beneficiaryTableY + 15;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Trust Contents:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;

      const contentsRows = 4;
      const contentsCellHeight = 10;
      const cCol1Width = fieldWidth * 0.25;
      const cCol2Width = fieldWidth * 0.25;
      const cCol3Width = fieldWidth * 0.25;
      const cCol4Width = fieldWidth * 0.25;
      let contentsTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, contentsTableY, cCol1Width, contentsCellHeight);
      doc.text('Asset Type:', margin + 0.5, contentsTableY + 5);

      doc.rect(margin + cCol1Width, contentsTableY, cCol2Width, contentsCellHeight);
      doc.text('Estimated Value:', margin + cCol1Width + 0.5, contentsTableY + 5);

      doc.rect(margin + cCol1Width + cCol2Width, contentsTableY, cCol3Width, contentsCellHeight);
      doc.text('Book Value/Cost Base:', margin + cCol1Width + cCol2Width + 0.5, contentsTableY + 3.5);

      doc.rect(margin + cCol1Width + cCol2Width + cCol3Width, contentsTableY, cCol4Width, contentsCellHeight);
      doc.text('Other Information:', margin + cCol1Width + cCol2Width + cCol3Width + 0.5, contentsTableY + 5);

      contentsTableY += contentsCellHeight;

      for (let i = 0; i < contentsRows; i++) {
        if (contentsTableY > 275) {
          doc.addPage();
          contentsTableY = 12;
        }

        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);

        doc.rect(margin, contentsTableY, cCol1Width, contentsCellHeight);
        doc.rect(margin + cCol1Width, contentsTableY, cCol2Width, contentsCellHeight);
        doc.rect(margin + cCol1Width + cCol2Width, contentsTableY, cCol3Width, contentsCellHeight);
        doc.rect(margin + cCol1Width + cCol2Width + cCol3Width, contentsTableY, cCol4Width, contentsCellHeight);

        const cField1 = new doc.AcroFormTextField();
        cField1.fieldName = `trust_${trustIndex}_contents_asset_type_${i}`;
        cField1.Rect = [margin + 0.3, contentsTableY + 0.3, cCol1Width - 0.6, contentsCellHeight - 0.6];
        cField1.fontSize = 7;
        cField1.textColor = [0, 0, 0];
        cField1.borderStyle = 'none';
        doc.addField(cField1);

        const cField2 = new doc.AcroFormTextField();
        cField2.fieldName = `trust_${trustIndex}_contents_estimated_value_${i}`;
        cField2.Rect = [margin + cCol1Width + 0.3, contentsTableY + 0.3, cCol2Width - 0.6, contentsCellHeight - 0.6];
        cField2.fontSize = 7;
        cField2.textColor = [0, 0, 0];
        cField2.borderStyle = 'none';
        doc.addField(cField2);

        const cField3 = new doc.AcroFormTextField();
        cField3.fieldName = `trust_${trustIndex}_contents_book_value_${i}`;
        cField3.Rect = [margin + cCol1Width + cCol2Width + 0.3, contentsTableY + 0.3, cCol3Width - 0.6, contentsCellHeight - 0.6];
        cField3.fontSize = 7;
        cField3.textColor = [0, 0, 0];
        cField3.borderStyle = 'none';
        doc.addField(cField3);

        const cField4 = new doc.AcroFormTextField();
        cField4.fieldName = `trust_${trustIndex}_contents_other_info_${i}`;
        cField4.Rect = [margin + cCol1Width + cCol2Width + cCol3Width + 0.3, contentsTableY + 0.3, cCol4Width - 0.6, contentsCellHeight - 0.6];
        cField4.fontSize = 7;
        cField4.textColor = [0, 0, 0];
        cField4.borderStyle = 'none';
        doc.addField(cField4);

        contentsTableY += contentsCellHeight;
      }

      yPosition = contentsTableY + 15;
    }
  }

  if (formData.client1IsTrustBeneficiary === 'yes' && formData.client1BeneficiaryTrustCount) {
    const trustCount = parseInt(formData.client1BeneficiaryTrustCount as string);
    const trustsData = formData.client1BeneficiaryTrustsData as Array<Record<string, string>> | undefined;
    const client1Name = formData.fullName as string || 'Client 1';

    for (let trustIndex = 1; trustIndex <= trustCount; trustIndex++) {
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`${client1Name} - Beneficiary Trust Information`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 12;

      const trustData = trustsData ? trustsData[trustIndex - 1] : {};
      const trustName = trustData?.trustName || '';

      const trustNameCellHeight = 8;
      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFontSize(8);

      doc.rect(margin, yPosition, fieldWidth * 0.35, trustNameCellHeight);
      doc.setFont(undefined, 'bold');
      doc.text(`Trust ${trustIndex} - Legal Name:`, margin + 0.5, yPosition + 5);
      doc.setFont(undefined, 'normal');

      doc.rect(margin + fieldWidth * 0.35, yPosition, fieldWidth * 0.65, trustNameCellHeight);
      if (trustName) {
        doc.setFontSize(8);
        doc.text(trustName, margin + fieldWidth * 0.35 + 0.5, yPosition + 5);
      }

      yPosition += trustNameCellHeight + 4;

      doc.rect(margin, yPosition, fieldWidth * 0.35, trustNameCellHeight);
      doc.setFont(undefined, 'bold');
      doc.text('Trust Deed Location:', margin + 0.5, yPosition + 5);
      doc.setFont(undefined, 'normal');

      doc.rect(margin + fieldWidth * 0.35, yPosition, fieldWidth * 0.65, trustNameCellHeight);
      if (trustData?.deedLocation) {
        doc.setFontSize(8);
        doc.text(trustData.deedLocation, margin + fieldWidth * 0.35 + 0.5, yPosition + 5);
      }

      yPosition += trustNameCellHeight + 4;

      doc.rect(margin, yPosition, fieldWidth * 0.35, trustNameCellHeight);
      doc.setFont(undefined, 'bold');
      doc.text('Year Established:', margin + 0.5, yPosition + 5);
      doc.setFont(undefined, 'normal');

      doc.rect(margin + fieldWidth * 0.35, yPosition, fieldWidth * 0.65, trustNameCellHeight);
      const yearField = new doc.AcroFormTextField();
      yearField.fieldName = `client1_ben_trust_${trustIndex}_year_established`;
      yearField.Rect = [margin + fieldWidth * 0.35 + 0.3, yPosition + 0.3, fieldWidth * 0.65 - 0.6, trustNameCellHeight - 0.6];
      yearField.fontSize = 8;
      yearField.textColor = [0, 0, 0];
      yearField.borderStyle = 'none';
      doc.addField(yearField);

      yPosition += trustNameCellHeight + 4;

      doc.rect(margin, yPosition, fieldWidth * 0.35, trustNameCellHeight);
      doc.setFont(undefined, 'bold');
      doc.text('Trust Duration/Windup:', margin + 0.5, yPosition + 5);
      doc.setFont(undefined, 'normal');

      doc.rect(margin + fieldWidth * 0.35, yPosition, fieldWidth * 0.65, trustNameCellHeight);
      const durationField = new doc.AcroFormTextField();
      durationField.fieldName = `client1_ben_trust_${trustIndex}_duration`;
      durationField.Rect = [margin + fieldWidth * 0.35 + 0.3, yPosition + 0.3, fieldWidth * 0.65 - 0.6, trustNameCellHeight - 0.6];
      durationField.fontSize = 8;
      durationField.textColor = [0, 0, 0];
      durationField.borderStyle = 'none';
      doc.addField(durationField);

      yPosition += trustNameCellHeight + 12;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Key Contacts:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      doc.setFontSize(9);
      doc.text('Trustee(s):', margin, yPosition);
      yPosition += 6;

      const keyContactRows = 3;
      const kcCellHeight = 10;
      const kcCol1Width = fieldWidth * 0.4;
      const kcCol2Width = fieldWidth * 0.3;
      const kcCol3Width = fieldWidth * 0.3;
      let kcTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, kcTableY, kcCol1Width, kcCellHeight);
      doc.text('Name:', margin + 0.5, kcTableY + 5);

      doc.rect(margin + kcCol1Width, kcTableY, kcCol2Width, kcCellHeight);
      doc.text('Phone:', margin + kcCol1Width + 0.5, kcTableY + 5);

      doc.rect(margin + kcCol1Width + kcCol2Width, kcTableY, kcCol3Width, kcCellHeight);
      doc.text('Email:', margin + kcCol1Width + kcCol2Width + 0.5, kcTableY + 5);

      kcTableY += kcCellHeight;

      for (let i = 0; i < keyContactRows; i++) {
        if (kcTableY > 275) {
          doc.addPage();
          kcTableY = 12;
        }

        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);

        doc.rect(margin, kcTableY, kcCol1Width, kcCellHeight);
        doc.rect(margin + kcCol1Width, kcTableY, kcCol2Width, kcCellHeight);
        doc.rect(margin + kcCol1Width + kcCol2Width, kcTableY, kcCol3Width, kcCellHeight);

        const kcField1 = new doc.AcroFormTextField();
        kcField1.fieldName = `client1_ben_trust_${trustIndex}_key_contact_name_${i}`;
        kcField1.Rect = [margin + 0.3, kcTableY + 0.3, kcCol1Width - 0.6, kcCellHeight - 0.6];
        kcField1.fontSize = 7;
        kcField1.textColor = [0, 0, 0];
        kcField1.borderStyle = 'none';
        doc.addField(kcField1);

        const kcField2 = new doc.AcroFormTextField();
        kcField2.fieldName = `client1_ben_trust_${trustIndex}_key_contact_phone_${i}`;
        kcField2.Rect = [margin + kcCol1Width + 0.3, kcTableY + 0.3, kcCol2Width - 0.6, kcCellHeight - 0.6];
        kcField2.fontSize = 7;
        kcField2.textColor = [0, 0, 0];
        kcField2.borderStyle = 'none';
        doc.addField(kcField2);

        const kcField3 = new doc.AcroFormTextField();
        kcField3.fieldName = `client1_ben_trust_${trustIndex}_key_contact_email_${i}`;
        kcField3.Rect = [margin + kcCol1Width + kcCol2Width + 0.3, kcTableY + 0.3, kcCol3Width - 0.6, kcCellHeight - 0.6];
        kcField3.fontSize = 7;
        kcField3.textColor = [0, 0, 0];
        kcField3.borderStyle = 'none';
        doc.addField(kcField3);

        kcTableY += kcCellHeight;
      }

      yPosition = kcTableY + 15;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Beneficiaries:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;

      const benRows = 3;
      const benCellHeight = 10;
      const benCol1Width = fieldWidth * 0.4;
      const benCol2Width = fieldWidth * 0.3;
      const benCol3Width = fieldWidth * 0.3;
      let benTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, benTableY, benCol1Width, benCellHeight);
      doc.text('Name:', margin + 0.5, benTableY + 5);

      doc.rect(margin + benCol1Width, benTableY, benCol2Width, benCellHeight);
      doc.text('Phone:', margin + benCol1Width + 0.5, benTableY + 5);

      doc.rect(margin + benCol1Width + benCol2Width, benTableY, benCol3Width, benCellHeight);
      doc.text('Email:', margin + benCol1Width + benCol2Width + 0.5, benTableY + 5);

      benTableY += benCellHeight;

      for (let i = 0; i < benRows; i++) {
        if (benTableY > 275) {
          doc.addPage();
          benTableY = 12;
        }

        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);

        doc.rect(margin, benTableY, benCol1Width, benCellHeight);
        doc.rect(margin + benCol1Width, benTableY, benCol2Width, benCellHeight);
        doc.rect(margin + benCol1Width + benCol2Width, benTableY, benCol3Width, benCellHeight);

        const benField1 = new doc.AcroFormTextField();
        benField1.fieldName = `client1_ben_trust_${trustIndex}_beneficiary_name_${i}`;
        benField1.Rect = [margin + 0.3, benTableY + 0.3, benCol1Width - 0.6, benCellHeight - 0.6];
        benField1.fontSize = 7;
        benField1.textColor = [0, 0, 0];
        benField1.borderStyle = 'none';
        doc.addField(benField1);

        const benField2 = new doc.AcroFormTextField();
        benField2.fieldName = `client1_ben_trust_${trustIndex}_beneficiary_phone_${i}`;
        benField2.Rect = [margin + benCol1Width + 0.3, benTableY + 0.3, benCol2Width - 0.6, benCellHeight - 0.6];
        benField2.fontSize = 7;
        benField2.textColor = [0, 0, 0];
        benField2.borderStyle = 'none';
        doc.addField(benField2);

        const benField3 = new doc.AcroFormTextField();
        benField3.fieldName = `client1_ben_trust_${trustIndex}_beneficiary_email_${i}`;
        benField3.Rect = [margin + benCol1Width + benCol2Width + 0.3, benTableY + 0.3, benCol3Width - 0.6, benCellHeight - 0.6];
        benField3.fontSize = 7;
        benField3.textColor = [0, 0, 0];
        benField3.borderStyle = 'none';
        doc.addField(benField3);

        benTableY += benCellHeight;
      }

      yPosition = benTableY + 15;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Trust Property:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;

      const propRows = 4;
      const propCellHeight = 10;
      const propCol1Width = fieldWidth * 0.25;
      const propCol2Width = fieldWidth * 0.25;
      const propCol3Width = fieldWidth * 0.25;
      const propCol4Width = fieldWidth * 0.25;
      let propTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, propTableY, propCol1Width, propCellHeight);
      doc.text('Asset Type:', margin + 0.5, propTableY + 5);

      doc.rect(margin + propCol1Width, propTableY, propCol2Width, propCellHeight);
      doc.text('Estimated Value:', margin + propCol1Width + 0.5, propTableY + 5);

      doc.rect(margin + propCol1Width + propCol2Width, propTableY, propCol3Width, propCellHeight);
      doc.text('Book Value/Cost Base:', margin + propCol1Width + propCol2Width + 0.5, propTableY + 3.5);

      doc.rect(margin + propCol1Width + propCol2Width + propCol3Width, propTableY, propCol4Width, propCellHeight);
      doc.text('Other Information:', margin + propCol1Width + propCol2Width + propCol3Width + 0.5, propTableY + 5);

      propTableY += propCellHeight;

      for (let i = 0; i < propRows; i++) {
        if (propTableY > 275) {
          doc.addPage();
          propTableY = 12;
        }

        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);

        doc.rect(margin, propTableY, propCol1Width, propCellHeight);
        doc.rect(margin + propCol1Width, propTableY, propCol2Width, propCellHeight);
        doc.rect(margin + propCol1Width + propCol2Width, propTableY, propCol3Width, propCellHeight);
        doc.rect(margin + propCol1Width + propCol2Width + propCol3Width, propTableY, propCol4Width, propCellHeight);

        const propField1 = new doc.AcroFormTextField();
        propField1.fieldName = `client1_ben_trust_${trustIndex}_property_asset_type_${i}`;
        propField1.Rect = [margin + 0.3, propTableY + 0.3, propCol1Width - 0.6, propCellHeight - 0.6];
        propField1.fontSize = 7;
        propField1.textColor = [0, 0, 0];
        propField1.borderStyle = 'none';
        doc.addField(propField1);

        const propField2 = new doc.AcroFormTextField();
        propField2.fieldName = `client1_ben_trust_${trustIndex}_property_estimated_value_${i}`;
        propField2.Rect = [margin + propCol1Width + 0.3, propTableY + 0.3, propCol2Width - 0.6, propCellHeight - 0.6];
        propField2.fontSize = 7;
        propField2.textColor = [0, 0, 0];
        propField2.borderStyle = 'none';
        doc.addField(propField2);

        const propField3 = new doc.AcroFormTextField();
        propField3.fieldName = `client1_ben_trust_${trustIndex}_property_book_value_${i}`;
        propField3.Rect = [margin + propCol1Width + propCol2Width + 0.3, propTableY + 0.3, propCol3Width - 0.6, propCellHeight - 0.6];
        propField3.fontSize = 7;
        propField3.textColor = [0, 0, 0];
        propField3.borderStyle = 'none';
        doc.addField(propField3);

        const propField4 = new doc.AcroFormTextField();
        propField4.fieldName = `client1_ben_trust_${trustIndex}_property_other_info_${i}`;
        propField4.Rect = [margin + propCol1Width + propCol2Width + propCol3Width + 0.3, propTableY + 0.3, propCol4Width - 0.6, propCellHeight - 0.6];
        propField4.fontSize = 7;
        propField4.textColor = [0, 0, 0];
        propField4.borderStyle = 'none';
        doc.addField(propField4);

        propTableY += propCellHeight;
      }

      yPosition = propTableY + 15;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Distribution Rules:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      const distField = new doc.AcroFormTextField();
      distField.fieldName = `client1_ben_trust_${trustIndex}_distribution_rules`;
      distField.Rect = [margin, yPosition, fieldWidth, 25];
      distField.multiline = true;
      distField.fontSize = 9;
      distField.textColor = [0, 0, 0];
      doc.addField(distField);

      yPosition += 30;
    }
  }

  if (formData.client2IsTrustBeneficiary === 'yes' && formData.client2BeneficiaryTrustCount) {
    const trustCount = parseInt(formData.client2BeneficiaryTrustCount as string);
    const trustsData = formData.client2BeneficiaryTrustsData as Array<Record<string, string>> | undefined;
    const client2Name = formData.spouseName as string || 'Client 2';

    for (let trustIndex = 1; trustIndex <= trustCount; trustIndex++) {
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text(`${client2Name} - Beneficiary Trust Information`, margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 12;

      const trustData = trustsData ? trustsData[trustIndex - 1] : {};
      const trustName = trustData?.trustName || '';

      const trustNameCellHeight = 8;
      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFontSize(8);

      doc.rect(margin, yPosition, fieldWidth * 0.35, trustNameCellHeight);
      doc.setFont(undefined, 'bold');
      doc.text(`Trust ${trustIndex} - Legal Name:`, margin + 0.5, yPosition + 5);
      doc.setFont(undefined, 'normal');

      doc.rect(margin + fieldWidth * 0.35, yPosition, fieldWidth * 0.65, trustNameCellHeight);
      if (trustName) {
        doc.setFontSize(8);
        doc.text(trustName, margin + fieldWidth * 0.35 + 0.5, yPosition + 5);
      }

      yPosition += trustNameCellHeight + 4;

      doc.rect(margin, yPosition, fieldWidth * 0.35, trustNameCellHeight);
      doc.setFont(undefined, 'bold');
      doc.text('Trust Deed Location:', margin + 0.5, yPosition + 5);
      doc.setFont(undefined, 'normal');

      doc.rect(margin + fieldWidth * 0.35, yPosition, fieldWidth * 0.65, trustNameCellHeight);
      if (trustData?.deedLocation) {
        doc.setFontSize(8);
        doc.text(trustData.deedLocation, margin + fieldWidth * 0.35 + 0.5, yPosition + 5);
      }

      yPosition += trustNameCellHeight + 4;

      doc.rect(margin, yPosition, fieldWidth * 0.35, trustNameCellHeight);
      doc.setFont(undefined, 'bold');
      doc.text('Year Established:', margin + 0.5, yPosition + 5);
      doc.setFont(undefined, 'normal');

      doc.rect(margin + fieldWidth * 0.35, yPosition, fieldWidth * 0.65, trustNameCellHeight);
      const yearField = new doc.AcroFormTextField();
      yearField.fieldName = `client2_ben_trust_${trustIndex}_year_established`;
      yearField.Rect = [margin + fieldWidth * 0.35 + 0.3, yPosition + 0.3, fieldWidth * 0.65 - 0.6, trustNameCellHeight - 0.6];
      yearField.fontSize = 8;
      yearField.textColor = [0, 0, 0];
      yearField.borderStyle = 'none';
      doc.addField(yearField);

      yPosition += trustNameCellHeight + 4;

      doc.rect(margin, yPosition, fieldWidth * 0.35, trustNameCellHeight);
      doc.setFont(undefined, 'bold');
      doc.text('Trust Duration/Windup:', margin + 0.5, yPosition + 5);
      doc.setFont(undefined, 'normal');

      doc.rect(margin + fieldWidth * 0.35, yPosition, fieldWidth * 0.65, trustNameCellHeight);
      const durationField = new doc.AcroFormTextField();
      durationField.fieldName = `client2_ben_trust_${trustIndex}_duration`;
      durationField.Rect = [margin + fieldWidth * 0.35 + 0.3, yPosition + 0.3, fieldWidth * 0.65 - 0.6, trustNameCellHeight - 0.6];
      durationField.fontSize = 8;
      durationField.textColor = [0, 0, 0];
      durationField.borderStyle = 'none';
      doc.addField(durationField);

      yPosition += trustNameCellHeight + 12;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Key Contacts:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      doc.setFontSize(9);
      doc.text('Trustee(s):', margin, yPosition);
      yPosition += 6;

      const keyContactRows = 3;
      const kcCellHeight = 10;
      const kcCol1Width = fieldWidth * 0.4;
      const kcCol2Width = fieldWidth * 0.3;
      const kcCol3Width = fieldWidth * 0.3;
      let kcTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, kcTableY, kcCol1Width, kcCellHeight);
      doc.text('Name:', margin + 0.5, kcTableY + 5);

      doc.rect(margin + kcCol1Width, kcTableY, kcCol2Width, kcCellHeight);
      doc.text('Phone:', margin + kcCol1Width + 0.5, kcTableY + 5);

      doc.rect(margin + kcCol1Width + kcCol2Width, kcTableY, kcCol3Width, kcCellHeight);
      doc.text('Email:', margin + kcCol1Width + kcCol2Width + 0.5, kcTableY + 5);

      kcTableY += kcCellHeight;

      for (let i = 0; i < keyContactRows; i++) {
        if (kcTableY > 275) {
          doc.addPage();
          kcTableY = 12;
        }

        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);

        doc.rect(margin, kcTableY, kcCol1Width, kcCellHeight);
        doc.rect(margin + kcCol1Width, kcTableY, kcCol2Width, kcCellHeight);
        doc.rect(margin + kcCol1Width + kcCol2Width, kcTableY, kcCol3Width, kcCellHeight);

        const kcField1 = new doc.AcroFormTextField();
        kcField1.fieldName = `client2_ben_trust_${trustIndex}_key_contact_name_${i}`;
        kcField1.Rect = [margin + 0.3, kcTableY + 0.3, kcCol1Width - 0.6, kcCellHeight - 0.6];
        kcField1.fontSize = 7;
        kcField1.textColor = [0, 0, 0];
        kcField1.borderStyle = 'none';
        doc.addField(kcField1);

        const kcField2 = new doc.AcroFormTextField();
        kcField2.fieldName = `client2_ben_trust_${trustIndex}_key_contact_phone_${i}`;
        kcField2.Rect = [margin + kcCol1Width + 0.3, kcTableY + 0.3, kcCol2Width - 0.6, kcCellHeight - 0.6];
        kcField2.fontSize = 7;
        kcField2.textColor = [0, 0, 0];
        kcField2.borderStyle = 'none';
        doc.addField(kcField2);

        const kcField3 = new doc.AcroFormTextField();
        kcField3.fieldName = `client2_ben_trust_${trustIndex}_key_contact_email_${i}`;
        kcField3.Rect = [margin + kcCol1Width + kcCol2Width + 0.3, kcTableY + 0.3, kcCol3Width - 0.6, kcCellHeight - 0.6];
        kcField3.fontSize = 7;
        kcField3.textColor = [0, 0, 0];
        kcField3.borderStyle = 'none';
        doc.addField(kcField3);

        kcTableY += kcCellHeight;
      }

      yPosition = kcTableY + 15;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Beneficiaries:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;

      const benRows = 3;
      const benCellHeight = 10;
      const benCol1Width = fieldWidth * 0.4;
      const benCol2Width = fieldWidth * 0.3;
      const benCol3Width = fieldWidth * 0.3;
      let benTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, benTableY, benCol1Width, benCellHeight);
      doc.text('Name:', margin + 0.5, benTableY + 5);

      doc.rect(margin + benCol1Width, benTableY, benCol2Width, benCellHeight);
      doc.text('Phone:', margin + benCol1Width + 0.5, benTableY + 5);

      doc.rect(margin + benCol1Width + benCol2Width, benTableY, benCol3Width, benCellHeight);
      doc.text('Email:', margin + benCol1Width + benCol2Width + 0.5, benTableY + 5);

      benTableY += benCellHeight;

      for (let i = 0; i < benRows; i++) {
        if (benTableY > 275) {
          doc.addPage();
          benTableY = 12;
        }

        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);

        doc.rect(margin, benTableY, benCol1Width, benCellHeight);
        doc.rect(margin + benCol1Width, benTableY, benCol2Width, benCellHeight);
        doc.rect(margin + benCol1Width + benCol2Width, benTableY, benCol3Width, benCellHeight);

        const benField1 = new doc.AcroFormTextField();
        benField1.fieldName = `client2_ben_trust_${trustIndex}_beneficiary_name_${i}`;
        benField1.Rect = [margin + 0.3, benTableY + 0.3, benCol1Width - 0.6, benCellHeight - 0.6];
        benField1.fontSize = 7;
        benField1.textColor = [0, 0, 0];
        benField1.borderStyle = 'none';
        doc.addField(benField1);

        const benField2 = new doc.AcroFormTextField();
        benField2.fieldName = `client2_ben_trust_${trustIndex}_beneficiary_phone_${i}`;
        benField2.Rect = [margin + benCol1Width + 0.3, benTableY + 0.3, benCol2Width - 0.6, benCellHeight - 0.6];
        benField2.fontSize = 7;
        benField2.textColor = [0, 0, 0];
        benField2.borderStyle = 'none';
        doc.addField(benField2);

        const benField3 = new doc.AcroFormTextField();
        benField3.fieldName = `client2_ben_trust_${trustIndex}_beneficiary_email_${i}`;
        benField3.Rect = [margin + benCol1Width + benCol2Width + 0.3, benTableY + 0.3, benCol3Width - 0.6, benCellHeight - 0.6];
        benField3.fontSize = 7;
        benField3.textColor = [0, 0, 0];
        benField3.borderStyle = 'none';
        doc.addField(benField3);

        benTableY += benCellHeight;
      }

      yPosition = benTableY + 15;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Trust Property:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 8;

      const propRows = 4;
      const propCellHeight = 10;
      const propCol1Width = fieldWidth * 0.25;
      const propCol2Width = fieldWidth * 0.25;
      const propCol3Width = fieldWidth * 0.25;
      const propCol4Width = fieldWidth * 0.25;
      let propTableY = yPosition;

      doc.setDrawColor(0, 0, 0);
      doc.setFillColor(255, 255, 255);
      doc.setFont(undefined, 'bold');
      doc.setFontSize(8);

      doc.rect(margin, propTableY, propCol1Width, propCellHeight);
      doc.text('Asset Type:', margin + 0.5, propTableY + 5);

      doc.rect(margin + propCol1Width, propTableY, propCol2Width, propCellHeight);
      doc.text('Estimated Value:', margin + propCol1Width + 0.5, propTableY + 5);

      doc.rect(margin + propCol1Width + propCol2Width, propTableY, propCol3Width, propCellHeight);
      doc.text('Book Value/Cost Base:', margin + propCol1Width + propCol2Width + 0.5, propTableY + 3.5);

      doc.rect(margin + propCol1Width + propCol2Width + propCol3Width, propTableY, propCol4Width, propCellHeight);
      doc.text('Other Information:', margin + propCol1Width + propCol2Width + propCol3Width + 0.5, propTableY + 5);

      propTableY += propCellHeight;

      for (let i = 0; i < propRows; i++) {
        if (propTableY > 275) {
          doc.addPage();
          propTableY = 12;
        }

        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);

        doc.rect(margin, propTableY, propCol1Width, propCellHeight);
        doc.rect(margin + propCol1Width, propTableY, propCol2Width, propCellHeight);
        doc.rect(margin + propCol1Width + propCol2Width, propTableY, propCol3Width, propCellHeight);
        doc.rect(margin + propCol1Width + propCol2Width + propCol3Width, propTableY, propCol4Width, propCellHeight);

        const propField1 = new doc.AcroFormTextField();
        propField1.fieldName = `client2_ben_trust_${trustIndex}_property_asset_type_${i}`;
        propField1.Rect = [margin + 0.3, propTableY + 0.3, propCol1Width - 0.6, propCellHeight - 0.6];
        propField1.fontSize = 7;
        propField1.textColor = [0, 0, 0];
        propField1.borderStyle = 'none';
        doc.addField(propField1);

        const propField2 = new doc.AcroFormTextField();
        propField2.fieldName = `client2_ben_trust_${trustIndex}_property_estimated_value_${i}`;
        propField2.Rect = [margin + propCol1Width + 0.3, propTableY + 0.3, propCol2Width - 0.6, propCellHeight - 0.6];
        propField2.fontSize = 7;
        propField2.textColor = [0, 0, 0];
        propField2.borderStyle = 'none';
        doc.addField(propField2);

        const propField3 = new doc.AcroFormTextField();
        propField3.fieldName = `client2_ben_trust_${trustIndex}_property_book_value_${i}`;
        propField3.Rect = [margin + propCol1Width + propCol2Width + 0.3, propTableY + 0.3, propCol3Width - 0.6, propCellHeight - 0.6];
        propField3.fontSize = 7;
        propField3.textColor = [0, 0, 0];
        propField3.borderStyle = 'none';
        doc.addField(propField3);

        const propField4 = new doc.AcroFormTextField();
        propField4.fieldName = `client2_ben_trust_${trustIndex}_property_other_info_${i}`;
        propField4.Rect = [margin + propCol1Width + propCol2Width + propCol3Width + 0.3, propTableY + 0.3, propCol4Width - 0.6, propCellHeight - 0.6];
        propField4.fontSize = 7;
        propField4.textColor = [0, 0, 0];
        propField4.borderStyle = 'none';
        doc.addField(propField4);

        propTableY += propCellHeight;
      }

      yPosition = propTableY + 15;

      if (yPosition > 200) {
        doc.addPage();
        yPosition = 12;
      }

      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('Distribution Rules:', margin, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 6;

      const distField = new doc.AcroFormTextField();
      distField.fieldName = `client2_ben_trust_${trustIndex}_distribution_rules`;
      distField.Rect = [margin, yPosition, fieldWidth, 25];
      distField.multiline = true;
      distField.fontSize = 9;
      distField.textColor = [0, 0, 0];
      doc.addField(distField);

      yPosition += 30;
    }
  }

  yPosition += 12;
  if (yPosition > 270) {
    doc.addPage();
    yPosition = 12;
  }

  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('Additional Estate Planning Information', margin, yPosition);
  doc.setFont(undefined, 'normal');

  const sections = [
    { title: 'Assets & Properties', fieldName: 'assets' },
    { title: 'Financial Accounts', fieldName: 'financial' },
    { title: 'Insurance Policies', fieldName: 'insurance' },
    { title: 'Executor Information', fieldName: 'executor' },
    { title: 'Beneficiaries', fieldName: 'beneficiaries' },
    { title: 'Special Instructions', fieldName: 'special' },
    { title: 'Funeral Preferences', fieldName: 'funeral' },
  ];

  sections.forEach((section) => {
    yPosition += 11;

    if (yPosition > 245) {
      doc.addPage();
      yPosition = 12;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, 'bold');
    doc.text(section.title, margin, yPosition);
    doc.setFont(undefined, 'normal');

    yPosition += 4;
    const textField = new doc.AcroFormTextField();
    textField.fieldName = section.fieldName;
    textField.Rect = [margin, yPosition, fieldWidth - 5, 18];
    textField.multiline = true;
    textField.fontSize = 9;
    textField.textColor = [0, 0, 0];
    doc.addField(textField);

    yPosition += 20;
  });

  const fileName = `estate-planning-${formData.fullName?.replace(/\s+/g, '-').toLowerCase() || 'form'}.pdf`;
  doc.save(fileName);
};
