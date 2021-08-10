import * as React from 'react';
import styles from './VideoPlayer.module.scss';
import { IVideoPlayerProps } from './IVideoPlayerProps';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Stack, IStackStyles, IStackItemStyles } from 'office-ui-fabric-react/lib/Stack';
import { DefaultPalette } from 'office-ui-fabric-react/lib/Styling';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.themeTertiary,
    color: DefaultPalette.white,
  },
};
const stackItemStyles: IStackItemStyles = {
  root: {
    alignItems: 'center',
    background: DefaultPalette.themePrimary,
    color: DefaultPalette.white,
    display: 'flex',
    justifyContent: 'center',
  },
};


const VideoPlayer: React.FunctionComponent<IVideoPlayerProps> = (props: IVideoPlayerProps) => {

  if (!props.sourceVideo) {
    return (
      <Placeholder iconName='Edit'
        iconText='Configure your web part'
        description='Please configure the web part.'
        buttonLabel='Configure'
        onConfigure={props.onConfigure} />
    );
  } else {
    console.log(props.sourceVideo.fileAbsoluteUrl);
    return (
      <div className={styles.videoPlayer}>
        <Stack styles={stackStyles}>
          <Stack.Item styles={stackItemStyles}>
            <video controls width="680" poster="">
              <source src={props.sourceVideo.fileAbsoluteUrl} />
            </video>
          </Stack.Item>
          <Stack.Item styles={stackItemStyles}>
            <Text variant={'xLarge'}>Caption for the video</Text>
          </Stack.Item>
        </Stack>
      </div>
    );
  }
};

export default VideoPlayer;
