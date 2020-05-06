import { Rule, SchematicContext, Tree, externalSchematic, chain } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

/** @description schematic for ng add support */
export function ngAdd(): Rule {
  // For now, just return the tree and install the lib using any package manager
  return chain([
    (tree: Tree, context: SchematicContext) => {
      context.addTask(new NodePackageInstallTask());
      return tree;
    },
    // execute ng-add schematic of @angular/material
    externalSchematic('@angular/material', 'ng-add', {})
  ]);
}
