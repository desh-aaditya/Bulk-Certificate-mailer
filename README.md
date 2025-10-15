
```markdown
# 🎓 Bulk Certificate Sender using Google Apps Script

This project automates the process of creating and sending personalized certificates through Gmail using **Google Sheets**, **Google Slides**, and **Google Drive** — all for **free**.

It’s perfect for clubs, colleges, or organizations that need to send certificates in bulk without using paid tools.

---

## 🚀 Features

- 📋 Reads recipient data (name, email) from Google Sheets  
- 🧾 Generates personalized certificates using a Google Slides template  
- 📧 Sends certificates automatically via Gmail  
- 📂 Saves generated certificates in a Google Drive folder  
- ✅ Updates the status in the sheet once each mail is sent  

---

## 🧰 Tools Used

| Tool | Purpose |
|------|----------|
| **Google Sheets** | Stores recipient names, emails, and status |
| **Google Slides** | Used as certificate template (imported from Canva) |
| **Google Drive** | Stores the generated certificates |
| **Google Apps Script** | Runs the automation logic |
| **Gmail** | Sends personalized certificate emails |

---

## 📁 Project Structure

```

📂 Certificate-Sender-Project
├── Google Sheet → Recipient list
├── Google Slides → Certificate template (from Canva)
├── Google Drive Folder → Stores generated certificates
└── Apps Script → Automation logic


### 5️⃣ Test the Script

1. Add one test recipient — your own email — in the Sheet.
2. Run the script.
3. Check:

   * 📧 Your Gmail inbox → for the certificate email
   * 📂 Google Drive folder → for generated file copies
   * 📋 Google Sheet → for updated `Status = Sent` and `SentDate`

---

## 🧠 How It Works

1. Reads all rows from the Sheet.
2. For each unsent row:

   * Copies the template from Google Slides.
   * Replaces `{{name}}` with the recipient’s actual name.
   * Converts the slide into a PDF.
   * Sends the PDF via Gmail.
   * Updates the sheet’s Status and SentDate.
3. Moves to the next recipient.

---

## ⚙️ Configuration Options

You can customize:

* `EMAIL_SUBJECT` → Email subject line
* `EMAIL_BODY_TEMPLATE` → Message body (supports `{{name}}`)
* `MAX_ROWS_PER_RUN` → How many certificates to process at once
* `PAUSE_MS` → Delay between each send (in milliseconds)

---

## ⚠️ Troubleshooting

| Issue                 | Cause                         | Fix                                           |
| --------------------- | ----------------------------- | --------------------------------------------- |
| **No emails sent**    | Script not authorized         | Run and allow permissions                     |
| **Sheet not found**   | Sheet tab name isn’t “Sheet1” | Rename tab or update script                   |
| **Name not replaced** | Placeholder missing in Slides | Use exactly `{{name}}`                        |
| **Quota exceeded**    | Too many sends per day        | Run smaller batches                           |
| **Emails in spam**    | New Gmail sender              | Add sender to contacts or use verified domain |

---

## 💡 Improvements You Can Add

* Store final PDFs in Drive for record-keeping
* Delete temporary Slides after sending
* Add placeholders like `{{event}}`, `{{date}}`, etc.
* Create an automatic trigger to send daily
* Send HTML-formatted emails

---

## 👨‍💻 Author

**Developed by:**Aaditya Deshapnde
**Made with ❤️ using Google Apps Script + Canva + Google Workspace**

---

## 📄 License

This project is open-source and free for educational and non-commercial use.

