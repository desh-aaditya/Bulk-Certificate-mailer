const TEMPLATE_SLIDES_ID = '1f1cj53-rT0YAi7R4Fe1jV8MoRhvc4ROfqX6EqcPYM_0';
const OUTPUT_FOLDER_ID = '15w3dbJKqviv4EqPYIQVRhhWlIEuqMrmL';
const EMAIL_SUBJECT = 'Certificate for Logic Building Session';
const EMAIL_BODY_TEMPLATE = 'Dear {{name}},\n\nPlease find your certificate attached.\n\nRegards,\nMLSC PCCoE';
const MAX_ROWS_PER_RUN = 100;
const PAUSE_MS = 800;

function sendCertificatesFromSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Sheet1');
  if (!sheet) throw new Error('Sheet1 not found.');

  const values = sheet.getDataRange().getValues();
  if (!values || values.length <= 1) return;

  const headers = values[0].map(h => (h || '').toString().trim());
  let nameIdx = headers.indexOf('Name');
  let emailIdx = headers.indexOf('Email');
  let statusIdx = headers.indexOf('Status');
  let sentDateIdx = headers.indexOf('SentDate');

  if (statusIdx < 0) {
    statusIdx = headers.length;
    sheet.getRange(1, statusIdx + 1).setValue('Status');
  }
  if (sentDateIdx < 0) {
    sentDateIdx = headers.length + (statusIdx < headers.length ? 1 : 0);
    sheet.getRange(1, sentDateIdx + 1).setValue('SentDate');
  }

  const outFolder = DriveApp.getFolderById(OUTPUT_FOLDER_ID);
  let processed = 0;

  for (let r = 1; r < values.length; r++) {
    if (processed >= MAX_ROWS_PER_RUN) break;

    const rowNum = r + 1;
    const row = values[r];
    const name = (row[nameIdx] || '').toString().trim();
    const email = (row[emailIdx] || '').toString().trim();
    const status = (row[statusIdx] || '').toString().trim();

    if (!name || !email) {
      sheet.getRange(rowNum, statusIdx + 1).setValue('Skipped: Missing data');
      continue;
    }
    if (status.toLowerCase() === 'sent') continue;

    try {
      const copy = DriveApp.getFileById(TEMPLATE_SLIDES_ID)
        .makeCopy(`Certificate - ${name}`, outFolder);
      const presentation = SlidesApp.openById(copy.getId());

      presentation.getSlides().forEach(slide => {
        slide.replaceAllText('{{name}}', name);
      });
      presentation.saveAndClose();

      const pdfBlob = DriveApp.getFileById(copy.getId()).getAs('application/pdf');
      const emailBody = EMAIL_BODY_TEMPLATE.replace('{{name}}', name);
      GmailApp.sendEmail(email, EMAIL_SUBJECT, emailBody, {
        attachments: [pdfBlob],
        name: 'MLSC Certificate System'
      });

      const formattedDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd/MM/yyyy');
      sheet.getRange(rowNum, statusIdx + 1).setValue('Sent');
      sheet.getRange(rowNum, sentDateIdx + 1).setValue(formattedDate);
      sheet.getRange(rowNum, sentDateIdx + 1).setNumberFormat('dd/mm/yyyy');

      processed++;
      Utilities.sleep(PAUSE_MS);

    } catch (err) {
      sheet.getRange(rowNum, statusIdx + 1).setValue('Error: ' + err.toString().slice(0, 200));
    }
  }
}
