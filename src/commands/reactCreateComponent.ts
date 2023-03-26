import { window, workspace, Uri } from 'vscode';
import { mkdirSync, writeFile } from "node:fs";

import { Options } from '../enums/options.enum';
import { getPathToNewFile } from '../utils/getPathToNewFile';

// Templates
import { indexTemplate } from '../templates/indexTemplate';
import { componentTemplate } from '../templates/componentTemplate';
import { stitchesJsStylesTemplate } from '../templates/stitchesJsStylesTemplate';

const items = [ Options.stitches, Options.stories ];

export const reactCreateComponent = async (uri: Uri) => {
    try {
        const workspaceUri =
            workspace.workspaceFolders && workspace.workspaceFolders[0].uri;

        const currentUri = uri || workspaceUri;

        if (!workspaceUri) {
            window.showErrorMessage("Workspace doesn't contain any folders.");
            return;
        }

        const query = await window.showInputBox({
            placeHolder: "Ex: Button",
            prompt: "Input the component name:",
            title: "(1 / 2) - Component name",
        });
        
        const selectedOption = await window.showQuickPick(items, { 
            placeHolder: 'Selecione uma opção:',
            canPickMany: true, 
            title: "(2 / 2) - More options"
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

        writeFile(pathToNewFile + "\\index.tsx", indexTemplate(normalizedQuery), (err) => {
            if (err) {window.showErrorMessage(err.message);}
            console.log('Arquivo criado com sucesso!');
        });
        writeFile(pathToNewFile + `\\${normalizedQuery}.tsx`, componentTemplate(normalizedQuery), (err) => {
            if (err) {window.showErrorMessage(err.message);}
            console.log('Arquivo criado com sucesso!');
        });
        selectedOption?.some((opt) => opt === Options.stitches) && writeFile(pathToNewFile + `\\${normalizedQuery}.styles.ts`, stitchesJsStylesTemplate(normalizedQuery), (err) => {
            if (err) {window.showErrorMessage(err.message);}
            console.log('Arquivo criado com sucesso!');
        });
    } catch (error: any) {
        window.showErrorMessage(error.message);
    }
};