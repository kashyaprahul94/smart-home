import { App as SmartHomeVoice } from "./instance";

export namespace App {
	export type Type = SmartHomeVoice;
	export const Instance: SmartHomeVoice = SmartHomeVoice.Instance();
}