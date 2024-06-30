import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';

const icons = AllIcons as {
  [key: string]: IconDefinition;
};
export const antDesignIcons: IconDefinition[] = Object.keys(icons).map((key) => icons[key]);
