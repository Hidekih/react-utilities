import { window, workspace, Uri } from 'vscode';
import { mkdirSync, writeFile } from "node:fs";

import { getPathToNewFile } from '../utils/getPathToNewFile';

export const reactCreateModule = async (uri: Uri) => {
    try {
        const workspaceUri =
            workspace.workspaceFolders && workspace.workspaceFolders[0].uri;

        const currentUri = uri || workspaceUri;

        if (!workspaceUri) {
            window.showErrorMessage("Workspace doesn't contain any folders.");
            return;
        }

        const query = await window.showInputBox({
            placeHolder: "Ex: User",
            prompt: "Input the module name:",
            title: "Module name",
        });

        const queryValue = query?.toString();
        
        if (!queryValue) {
            window.showErrorMessage("TODO");
            return;
        }

        const normalizedQuery = queryValue[0].toUpperCase() + queryValue.substring(1);

        const pathToNewFile = getPathToNewFile({
            url: currentUri.path,
            queryValue: normalizedQuery
        });

        mkdirSync(pathToNewFile, { recursive: true });

        mkdirSync(`${pathToNewFile}\\components`, { recursive: true });
        mkdirSync(`${pathToNewFile}\\hooks`, { recursive: true });
        mkdirSync(`${pathToNewFile}\\context`, { recursive: true });
        mkdirSync(`${pathToNewFile}\\pages`, { recursive: true });
        mkdirSync(`${pathToNewFile}\\services`, { recursive: true });
        mkdirSync(`${pathToNewFile}\\types`, { recursive: true });
        
    } catch (error: any) {
        window.showErrorMessage(error.message);
    }
};