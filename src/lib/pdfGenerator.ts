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
