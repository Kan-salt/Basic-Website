using System;
using System.IO;
using System.Web.UI;

public partial class Contact : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // Accept both classic WebForms postbacks and modern fetch/Ajax POSTs
        if (IsPostBack || string.Equals(Request.HttpMethod, "POST", StringComparison.OrdinalIgnoreCase))
        {
            string name = Request.Form["commentName"] ?? string.Empty;
            string message = Request.Form["commentMessage"] ?? string.Empty;

            string debugMessage = "POST received. Name=" + name + ", Message=" + message;
            File.AppendAllText(Server.MapPath("~/html/JS_scipt/commet_fun/debug.log"), debugMessage + Environment.NewLine);

            if (!string.IsNullOrWhiteSpace(name) && !string.IsNullOrWhiteSpace(message))
            {
                string pageDirectory = Path.GetDirectoryName(Request.PhysicalPath) ?? Server.MapPath("~");
                string filePath = Path.Combine(pageDirectory, "data.csv");
                string logPath = Path.Combine(pageDirectory, "JS_scipt", "commet_fun", "debug.log");

                string fileDirectory = Path.GetDirectoryName(filePath);
                if (!string.IsNullOrEmpty(fileDirectory) && !Directory.Exists(fileDirectory))
                {
                    Directory.CreateDirectory(fileDirectory);
                }

                string logDirectory = Path.GetDirectoryName(logPath);
                if (!string.IsNullOrEmpty(logDirectory) && !Directory.Exists(logDirectory))
                {
                    Directory.CreateDirectory(logDirectory);
                }

                if (!File.Exists(filePath))
                {
                    File.WriteAllText(filePath, "User,Date,Time,Comment" + Environment.NewLine);
                }

                string safeName = EscapeCsv(name).Replace("\r", " ").Replace("\n", " ");
                string safeMessage = EscapeCsv(message).Replace("\r", " ").Replace("\n", " ");
                string csvLine = string.Format("\"{0}\",\"{1}\",\"{2}\",\"{3}\"",
                    safeName,
                    DateTime.Now.ToString("yyyy-MM-dd"),
                    DateTime.Now.ToString("HH:mm"),
                    safeMessage);

                File.AppendAllText(filePath, csvLine + Environment.NewLine);
                File.AppendAllText(logPath, "CSV updated: " + csvLine + Environment.NewLine);
                Response.Redirect("Contact.aspx");
            }
            else
            {
                File.AppendAllText(Server.MapPath("~/html/JS_scipt/commet_fun/debug.log"), "Missing name or message." + Environment.NewLine);
            }
        }
    }

    private string EscapeCsv(string value)
    {
        return value == null ? string.Empty : value.Replace("\"", "\"\"");
    }
}
