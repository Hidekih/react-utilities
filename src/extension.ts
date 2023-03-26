import { commands, ExtensionContext } from 'vscode';

import { reactCreateComponent } from './commands/reactCreateComponent';
import { reactCreateModule } from './commands/reactCreateModule';

export function activate(context: ExtensionContext) {
	let disposableReactCreateComponent = commands.registerCommand('react-utilities.reactCreateComponent', reactCreateComponent);

	let disposableReactCreateModule = commands.registerCommand('react-utilities.reactCreateModule', reactCreateModule);
	
	context.subscriptions.push(
		disposableReactCreateComponent, 
		disposableReactCreateModule
	);
}

export function deactivate() {}
