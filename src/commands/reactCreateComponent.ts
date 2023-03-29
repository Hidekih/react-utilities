import { mkdirSync, writeFile } from "node:fs";

import { commands, Uri, window, workspace } from 'vscode';

import { Options } from '../enums/options.enum';
import { getPathToNewDir } from '../utils/getPathToNewDir';
import { indexTemplate } from '../templates/indexTemplate';
import { componentTemplate } from '../templates/componentTemplate';
import { stitchesJsStylesTemplate } from '../templates/stitchesJsStylesTemplate';
import { storiesTemplate } from "../templates/storiesTemplate";

const items = [ Options.stitches, Options.stories ];

export const reactCreateComponent = async (uri: Uri) => {
  const workspaceUri =
        workspace.workspaceFolders && workspace.workspaceFolders[0].uri;

  const currentUri = uri || workspaceUri;
  if (!currentUri) {
    window.showErrorMessage("Workspace doesn't contain any folders.");
    return;
  }

  const inputData = await getInputData();

  if (!inputData) {return;}

  const { componentName, selectedOptions } = inputData;

  const capitalizedComponentName = componentName[0].toUpperCase() + componentName.substring(1);
  const pathToNewFile = getPathToNewDir({
    url: currentUri.path,
    dirName: capitalizedComponentName
  });

  try {
    const dirExists = Uri.parse(`${currentUri.toString()}/${componentName}`);
    const stats = await workspace.fs.stat(dirExists);

    if (stats) {
      window.showErrorMessage(
        `A component ${componentName} already exists in this workspace.`,
      );
      return;
    }
  } catch (err: any) {
    if (err.name === 'EntryNotFound (FileSystemError)') {
      writeComponent({
        componentName: capitalizedComponentName,
        pathToNewFile,
        selectedOptions
      });
    } else {
      window.showErrorMessage(err.message);
    }
    return;
  }
};

const getInputData = async () => {
  const inputedData = await window.showInputBox({
    placeHolder: "Ex: Button",
    prompt: "Input the component name:",
    title: "(1 / 2) - Component name",
  });

  const componentName = inputedData?.toString();

  if (!componentName) {
    window.showErrorMessage("Component name cannot be empty!");
    return;
  }

  const selectedOptions = await window.showQuickPick(items, {
    placeHolder: 'Selecione uma opção:',
    canPickMany: true,
    title: "(2 / 2) - More options",
  });

  if (!selectedOptions) {
    window.showErrorMessage("Component name cannot be empty!");
    return;
  }

  return {
    componentName,
    selectedOptions
  };
};

const writeComponent = (params: {
    componentName: string;
    pathToNewFile: string;
    selectedOptions?: Array<string>;
}) => {
  try {
    const { componentName, pathToNewFile, selectedOptions } = params;

    // Create a dir
    mkdirSync(pathToNewFile, { recursive: true });

    const usingStitchesJs = selectedOptions?.some((opt) => opt === Options.stitches);
    const stories = selectedOptions?.some((opt) => opt === Options.stitches);

    // Create index.ts file
    writeFile(pathToNewFile + "\\index.tsx", indexTemplate(componentName), (err) => {
      if (err) {window.showErrorMessage(err.message);}
    });

    // Create Component.tsx
    writeFile(pathToNewFile + `\\${componentName}.tsx`, componentTemplate({ componentName, usingStitchesJs }), (err) => {
      if (err) {window.showErrorMessage(err.message);}
    });

    // Create component.styles.ts (Stitches JS style file)
    if (usingStitchesJs) {
      writeFile(pathToNewFile + `\\${componentName}.styles.ts`, stitchesJsStylesTemplate(componentName), (err) => {
        if (err) {window.showErrorMessage(err.message);}
      });
    }

    // Create component.stories.tsx (for Storybook)
    if (stories) {
      writeFile(pathToNewFile + `\\${componentName}.stories.tsx`, storiesTemplate(componentName), (err) => {
        if (err) {window.showErrorMessage(err.message);}
      });
    }

    commands.executeCommand('revealInExplorer', Uri.file(pathToNewFile));

    window.showInformationMessage(`Component "${componentName} created successful!"`);
  } catch (err: any) {
    window.showErrorMessage(err.message);
  }
};
