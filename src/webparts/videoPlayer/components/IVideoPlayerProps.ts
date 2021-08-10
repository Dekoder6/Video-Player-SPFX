import { IFilePickerResult } from '@pnp/spfx-property-controls/lib/PropertyFieldFilePicker';

export interface IVideoPlayerProps {
  description: string;
  sourceVideo: IFilePickerResult;
  onConfigure: () => void;
}
