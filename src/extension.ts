import { commands, ExtensionContext } from 'vscode';
import { mkdirSync, writeFile } from "node:fs";

import { reactCreateComponent } from './commands/reactCreateComponent';
import { reactCreateModule } from './commands/reactCreateModule';

export function activate(context: ExtensionContext) {
	let disposableReactCreateComponent = commands.registerCommand('bnp-react.reactCreateComponent', reactCreateComponent);

	let disposableReactCreateModule = commands.registerCommand('bnp-react.reactCreateModule', reactCreateModule);
	
	context.subscriptions.push(
		disposableReactCreateComponent, 
		disposableReactCreateModule
	);
}

export function deactivate() {}
