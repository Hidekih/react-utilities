import { mkdirSync, writeFile } from "node:fs";

import { commands, Uri, window, workspace } from 'vscode';

import { Options } from '../enums/options.enum';
import { getPathToNewDir } from '../utils/getPathToNewDir';
import { indexTemplate } from '../templates/indexTemplate';
import { componentTemplate } from '../templates/componentTemplate';
import { stitchesJsStylesTemplate } from '../templates/stitchesJsStylesTemplate';
import { storiesTemplate } from "../templates/storiesTemplate";

const items = [ Options.stitches, Options.stories ];

export const generateTemplateString = async (uri: Uri) => {
  const workspaceUri =
        workspace.workspaceFolders && workspace.workspaceFolders[0].uri;

  const currentUri = uri || workspaceUri;
  if (!currentUri) {
    window.showErrorMessage("Workspace doesn't contain any folders.");
    return;
  }

  window.showInformationMessage(`Command generate Template String callled`);
};
