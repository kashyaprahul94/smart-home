import { App as SmartHome } from "./instance";

export namespace App {
	export type Type = SmartHome;
	export const Instance: SmartHome = SmartHome.Instance();
}