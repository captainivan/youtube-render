import { Config } from '@remotion/cli/config';
import { registerRoot } from 'remotion';

Config.setVideoImageFormat("jpeg");
Config.setCodec("h264");
Config.setOverwriteOutput(true);

