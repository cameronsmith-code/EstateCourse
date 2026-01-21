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
}

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
      doc.text(`Long-term Medications: ${child.medications === 'yes' ? 'Yes' : child.medications === 'no' ? 'No' : ''}`, margin, yPosition);
      yPosition += 4;
      doc.text(`Allergies: ${child.allergies === 'yes' ? 'Yes' : child.allergies === 'no' ? 'No' : ''}`, margin, yPosition);
      yPosition += 4;
      doc.text(`Medical Issues/Needs: ${child.medicalIssues === 'yes' ? 'Yes' : child.medicalIssues === 'no' ? 'No' : ''}`, margin, yPosition);

      yPosition += 10;

      if (child.medications === 'yes' || child.allergies === 'yes' || child.medicalIssues === 'yes') {
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
