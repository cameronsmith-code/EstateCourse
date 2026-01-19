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
