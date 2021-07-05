/** @jsx h */

import { h, render } from 'preact';
import cx from 'classnames';
import {
  getContainerNode,
  createDocumentationMessageGenerator,
} from '../../lib/utils';
import { component } from '../../lib/suit';
import { WidgetFactory, Template } from '../../types';
import connectQueryRules, {
  QueryRulesConnectorParams,
  QueryRulesRenderState,
  QueryRulesWidgetDescription,
} from '../../connectors/query-rules/connectQueryRules';
import CustomData, {
  QueryRuleCustomDataComponentCSSClasses,
  QueryRuleCustomDataComponentTemplates,
} from '../../components/QueryRuleCustomData/QueryRuleCustomData';
import { PreparedTemplateProps } from '../../lib/utils/prepareTemplateProps';

export type QueryRuleCustomDataCSSClasses = Partial<{
  root: string | string[];
}>;

export type QueryRuleCustomDataTemplates = Partial<{
  default: Template<{ items: any[] }>;
}>;

type QueryRuleCustomDataWidgetParams = {
  container: string | HTMLElement;
  cssClasses?: QueryRuleCustomDataCSSClasses;
  templates?: QueryRuleCustomDataTemplates;
};

type QueryRuleCustomDataWidget = WidgetFactory<
  QueryRulesWidgetDescription & { $$widgetType: 'ais.queryRuleCustomData' },
  QueryRulesConnectorParams,
  QueryRuleCustomDataWidgetParams
>;

export const defaultTemplates: QueryRuleCustomDataComponentTemplates = {
  default: ({ items }) => JSON.stringify(items, null, 2),
};

const withUsage = createDocumentationMessageGenerator({
  name: 'query-rule-custom-data',
});

const suit = component('QueryRuleCustomData');

const renderer = ({
  containerNode,
  cssClasses,
  templates,
}: {
  containerNode: HTMLElement;
  cssClasses: QueryRuleCustomDataComponentCSSClasses;
  renderState: {
    templateProps?: PreparedTemplateProps<
      QueryRuleCustomDataComponentTemplates
    >;
  };
  templates: QueryRuleCustomDataComponentTemplates;
}) => ({ items }: QueryRulesRenderState) => {
  render(
    <CustomData
      cssClasses={cssClasses as QueryRuleCustomDataComponentCSSClasses}
      templates={templates}
      items={items}
    />,
    containerNode
  );
};

const queryRuleCustomData: QueryRuleCustomDataWidget = widgetParams => {
  const {
    container,
    cssClasses: userCssClasses = {},
    templates: userTemplates = {},
    transformItems = (items =>
      items) as QueryRulesConnectorParams['transformItems'],
  } = widgetParams || {};

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  const cssClasses = {
    root: cx(suit(), userCssClasses.root),
  };

  const containerNode = getContainerNode(container);

  const templates = {
    ...defaultTemplates,
    ...userTemplates,
  };

  const specializedRenderer = renderer({
    containerNode,
    cssClasses,
    renderState: {},
    templates,
  });

  const makeWidget = connectQueryRules(specializedRenderer, () => {
    render(null, containerNode);
  });

  return {
    ...makeWidget({
      transformItems,
    }),
    $$widgetType: 'ais.queryRuleCustomData',
  };
};

export default queryRuleCustomData;
