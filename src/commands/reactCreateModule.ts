import { commands, Uri, window, workspace } from 'vscode';
import { mkdirSync, writeFile } from "node:fs";

import { getPathToNewDir } from '../utils/getPathToNewDir';
import { pageComponentTemplate } from '../templates/pageComponentTemplate';

export const reactCreateModule = async (uri: Uri) => {
    const workspaceUri =
        workspace.workspaceFolders && workspace.workspaceFolders[0].uri;

    const currentUri = uri || workspaceUri;
    if (!currentUri) {
        window.showErrorMessage("Workspace doesn't contain any folders.");
        return;
    }

    const inputData = await getInputData();
    if (!inputData) {
        window.showErrorMessage("Unexpected error!");
        return;
    } 

    const { moduleName } = inputData;

    const pathToNewFile = getPathToNewDir({
        url: currentUri.path,
        dirName: moduleName
    });
    
    try {
        const dirExists = Uri.parse(`${currentUri.toString()}/${moduleName}`);
        const stats = await workspace.fs.stat(dirExists);

        if (stats) {
            window.showErrorMessage(
                `A module ${moduleName} already exists in this workspace.`,
            );
            return;
        }
    } catch (err: any) {
        if (err.name === 'EntryNotFound (FileSystemError)') {
            writeComponent({
                moduleName, 
                pathToNewFile,
            });
        } else {
            window.showErrorMessage(err.message);
        }
        return;
    }
};

const getInputData = async () => {
    const inputedData = await window.showInputBox({
        placeHolder: "Ex: User",
        prompt: "Input the module name:",
        title: "Module name",
    });

    const moduleName = inputedData?.toString();
    
    if (!moduleName) {
        window.showErrorMessage("Module name cannot be empty!");
        return;
    }

    return {
        moduleName
    };
};

const writeComponent = (params: {
    moduleName: string;
    pathToNewFile: string;
}) => {
    try {
        const { moduleName, pathToNewFile } = params;

        // Create a directorie
        mkdirSync(pathToNewFile, { recursive: true });

        // Create module directories
        mkdirSync(`${pathToNewFile}\\components`, { recursive: true });
        mkdirSync(`${pathToNewFile}\\hooks`, { recursive: true });
        mkdirSync(`${pathToNewFile}\\context`, { recursive: true });
        mkdirSync(`${pathToNewFile}\\pages`, { recursive: true });
        mkdirSync(`${pathToNewFile}\\services`, { recursive: true });
        mkdirSync(`${pathToNewFile}\\types`, { recursive: true });

        const capitalizedComponentName = moduleName[0].toUpperCase() + moduleName.substring(1);
        
        // Create a index.tsx in pages
        writeFile(pathToNewFile + `\\pages\\index.tsx`, pageComponentTemplate(capitalizedComponentName), (err) => {
            if (err) {window.showErrorMessage(err.message);}
        });

        commands.executeCommand('revealInExplorer', Uri.file(pathToNewFile));

        window.showInformationMessage(`Module "${capitalizedComponentName} created successful!"`);
    } catch (err: any) {
        window.showErrorMessage(err.message);
    }
};