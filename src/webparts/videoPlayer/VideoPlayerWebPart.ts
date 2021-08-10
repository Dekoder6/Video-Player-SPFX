import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'VideoPlayerWebPartStrings';
import VideoPlayer from './components/VideoPlayer';
import { IVideoPlayerProps } from './components/IVideoPlayerProps';
import { PropertyFieldFilePicker, IPropertyFieldFilePickerProps, IFilePickerResult } from '@pnp/spfx-property-controls/lib/PropertyFieldFilePicker';

export interface IVideoPlayerWebPartProps {
  description: string;
  srcVideo: IFilePickerResult;
}

export default class VideoPlayerWebPart extends BaseClientSideWebPart<IVideoPlayerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IVideoPlayerProps> = React.createElement(
      VideoPlayer,
      {
        description: this.properties.description,
        sourceVideo: this.properties.srcVideo,
        onConfigure: () => {
          this.context.propertyPane.open();
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyFieldFilePicker('filePicker', {
                  context: this.context,
                  filePickerResult: this.properties.srcVideo,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onSave: (e: IFilePickerResult) => { console.log(e); this.properties.srcVideo = e; },
                  onChanged: (e: IFilePickerResult) => { console.log(e); this.properties.srcVideo = e; },
                  key: "filePickerId",
                  buttonLabel: "File Picker",
                  label: "File Picker"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
