import { mapToNew } from '@constellation4sitecore-content-sdk/mapper';
import React, { JSX } from 'react';
import { AnalyticScriptItem, AnalyticsScriptsProps, ContentScript, UrlScript } from '../models';
import { TEMPLATES_ID } from '../constants/analyticsScripts';

const PageAnalyticsScripts = (props: AnalyticsScriptsProps): JSX.Element => (
  <>
    {props.scripts.map((script: AnalyticScriptItem) => {
      if (script.template.id === TEMPLATES_ID.contentScript) {
        const contentScriptModel = mapToNew<ContentScript>(script);
        return (
          <React.Fragment key={script.id}>
            {contentScriptModel && (
              <>
                {!contentScriptModel.noScript.value && (
                  <script
                    id={`_next-${script.id}-init`}
                    type="text/javascript"
                    data-nscript={props.strategy}
                    dangerouslySetInnerHTML={{
                      __html: contentScriptModel.contentScript.value,
                    }}
                  />
                )}
                {contentScriptModel.noScript.value && (
                  <noscript
                    dangerouslySetInnerHTML={{
                      __html: contentScriptModel.contentScript.value,
                    }}
                  />
                )}
              </>
            )}
          </React.Fragment>
        );
      } else {
        const mappedScriptModel = mapToNew<UrlScript>(script);
        return (
          <React.Fragment key={script.id}>
            {mappedScriptModel && (
              <script
                id={`_next-${script.id}-init`}
                data-nscript={props.strategy}
                src={mappedScriptModel.urlScript.value.href}
                async={mappedScriptModel?.async?.value ? true : undefined}
                defer={mappedScriptModel?.defer?.value ? true : undefined}
              />
            )}
          </React.Fragment>
        );
      }
    })}
  </>
);

export default PageAnalyticsScripts;
