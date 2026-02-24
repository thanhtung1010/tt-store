import { Config } from "@lottiefiles/dotlottie-web";

export type A_ELEMENT_TARGET = '_blank' | '_parent' | '_self' | '_top';
export type ASSETS_TYPE = 'png' | 'svg' | 'i18n';

export interface ISocialNetwork {
    name: string;
    src: string;
    type: ASSETS_TYPE;
    action: 'copy' | 'url';
    content?: string;
    href?: string;
    target?: A_ELEMENT_TARGET;
}

export type ILottieConfig =  Omit<Config, 'canvas'>;
