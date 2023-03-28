import { commands, ExtensionContext } from "vscode";

import { generateTemplateString } from "./commands/generateTemplateString";
import { reactCreateComponent } from "./commands/reactCreateComponent";
import { reactCreateModule } from "./commands/reactCreateModule";

export function activate(context: ExtensionContext) {
  let disposableReactCreateComponent = commands.registerCommand(
    "react-utilities.reactCreateComponent",
    reactCreateComponent
  );

  let disposableReactCreateModule = commands.registerCommand(
    "react-utilities.reactCreateModule",
    reactCreateModule
  );

  let disposableGenerateTemplateString = commands.registerCommand(
    "react-utilities.generateTemplateString",
    generateTemplateString
  );

  context.subscriptions.push(
    disposableReactCreateComponent,
    disposableReactCreateModule,
    disposableGenerateTemplateString
  );
}

export function deactivate() {}
