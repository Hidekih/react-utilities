import { window } from 'vscode';

export const generateTemplateString = async () => {
 const editor = window.activeTextEditor;
  if (!editor) {
    window.showErrorMessage("Selected text cannot be empty!");
    return;
  }

  const selection = editor.selection;
  const selectedText = editor.document.getText(selection);
  const selectedLines = selectedText.split('\n');

  const templateLines = selectedLines.map((line, index) => {
    const parsedLine = line.replace(/  /g, "\\t").replace(/\r/g, "");

    if (index != selectedLines.length - 1) {
      return "`" + parsedLine + "` +\r";
    }

    return "`" + parsedLine + "`\r";
  });

  const templateString = templateLines.join("");

  editor.edit(editBuilder => {
    editBuilder.replace(selection, templateString);
  });

  window.showInformationMessage("Generate Template String successful!");
};
